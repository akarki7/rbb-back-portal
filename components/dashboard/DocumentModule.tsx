'use client';

import { useState } from 'react';
import { CheckCircle, XCircle, Clock, FileText, Package, AlertCircle, ChevronRight, User, Calendar } from 'lucide-react';

interface Document {
  id: string;
  name: string;
  type: string;
  submittedBy: string;
  department: string;
  date: string;
  amount?: string;
  status: 'pending' | 'approved' | 'rejected';
}

interface AuditEntry {
  id: string;
  action: 'approved' | 'rejected';
  document: string;
  actedBy: string;
  timestamp: string;
  department: string;
}

const initialDocuments: Document[] = [
  { id: 'DOC-2025-0234', name: 'IT Infrastructure Upgrade Proposal', type: 'Procurement', submittedBy: 'Ram Shrestha', department: 'IT', date: '2025-02-28', amount: 'NPR 45,00,000', status: 'pending' },
  { id: 'DOC-2025-0233', name: 'Staff Training Budget Approval', type: 'HR', submittedBy: 'Sita Thapa', department: 'Human Resources', date: '2025-02-27', amount: 'NPR 8,50,000', status: 'pending' },
  { id: 'DOC-2025-0232', name: 'ATM Software Maintenance Contract', type: 'Vendor Contract', submittedBy: 'Hari Gurung', department: 'Operations', date: '2025-02-27', amount: 'NPR 12,00,000', status: 'pending' },
  { id: 'DOC-2025-0231', name: 'Branch Renovation — Biratnagar', type: 'Capital Expenditure', submittedBy: 'Priya Koirala', department: 'Admin', date: '2025-02-26', amount: 'NPR 35,00,000', status: 'pending' },
  { id: 'DOC-2025-0230', name: 'Customer Loan Application — Binod KC', type: 'Loan Application', submittedBy: 'Binod K.C.', department: 'Credit', date: '2025-02-26', amount: 'NPR 15,00,000', status: 'pending' },
  { id: 'DOC-2025-0229', name: 'Annual Printing Supplies RFQ', type: 'Procurement', submittedBy: 'Laxmi Bajracharya', department: 'Admin', date: '2025-02-25', amount: 'NPR 3,20,000', status: 'pending' },
];

const vendorPipeline = [
  { id: 'VND-001', vendor: 'NIC Nepal Pvt. Ltd.', service: 'Core Banking Upgrade', amount: 'NPR 1.2 Cr', stage: 3, stages: ['RFQ Issued', 'Bids Received', 'Under Evaluation', 'Approved', 'PO Issued'] },
  { id: 'VND-002', vendor: 'Yomari Inc.', service: 'Mobile App Revamp', amount: 'NPR 45 Lakh', stage: 1, stages: ['RFQ Issued', 'Bids Received', 'Under Evaluation', 'Approved', 'PO Issued'] },
  { id: 'VND-003', vendor: 'Agni Tech Solutions', service: 'ATM Maintenance 2025', amount: 'NPR 12 Lakh', stage: 4, stages: ['RFQ Issued', 'Bids Received', 'Under Evaluation', 'Approved', 'PO Issued'] },
  { id: 'VND-004', vendor: 'Smart Office Nepal', service: 'Office Stationery Supply', amount: 'NPR 3.2 Lakh', stage: 0, stages: ['RFQ Issued', 'Bids Received', 'Under Evaluation', 'Approved', 'PO Issued'] },
];

const initialAuditTrail: AuditEntry[] = [
  { id: 'AUD-001', action: 'approved', document: 'Q1 Marketing Budget', actedBy: 'Admin User', timestamp: '2025-02-28 09:12:34', department: 'Marketing' },
  { id: 'AUD-002', action: 'rejected', document: 'Lobby Furniture Purchase', actedBy: 'Admin User', timestamp: '2025-02-27 15:44:21', department: 'Admin' },
  { id: 'AUD-003', action: 'approved', document: 'New ATM Deployment — Pokhara', actedBy: 'Admin User', timestamp: '2025-02-27 11:03:55', department: 'Operations' },
  { id: 'AUD-004', action: 'approved', document: 'Staff Insurance Renewal', actedBy: 'Admin User', timestamp: '2025-02-26 17:22:10', department: 'HR' },
];

const stageColors = [
  'bg-slate-100 text-slate-600',
  'bg-blue-100 text-blue-700',
  'bg-amber-100 text-amber-700',
  'bg-violet-100 text-violet-700',
  'bg-emerald-100 text-emerald-700',
];

export default function DocumentModule() {
  const [documents, setDocuments] = useState<Document[]>(initialDocuments);
  const [auditTrail, setAuditTrail] = useState<AuditEntry[]>(initialAuditTrail);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleAction = (docId: string, action: 'approved' | 'rejected') => {
    const doc = documents.find((d) => d.id === docId);
    if (!doc) return;

    setDocuments((prev) =>
      prev.map((d) => (d.id === docId ? { ...d, status: action } : d))
    );

    const now = new Date();
    const timestamp = `${now.toISOString().split('T')[0]} ${now.toTimeString().split(' ')[0]}`;

    setAuditTrail((prev) => [
      {
        id: `AUD-${String(prev.length + 5).padStart(3, '0')}`,
        action,
        document: doc.name,
        actedBy: 'Admin User',
        timestamp,
        department: doc.department,
      },
      ...prev,
    ]);

    showToast(
      `Document "${doc.name.substring(0, 30)}..." has been ${action}.`,
      action === 'approved' ? 'success' : 'error'
    );
  };

  const pendingDocs = documents.filter((d) => d.status === 'pending');
  const processedDocs = documents.filter((d) => d.status !== 'pending');

  return (
    <div className="space-y-6 relative">
      {/* Toast */}
      {toast && (
        <div className={`fixed top-6 right-6 z-50 flex items-center gap-2 px-4 py-3 rounded-xl shadow-lg text-sm font-medium animate-fade-in ${
          toast.type === 'success' ? 'bg-emerald-600 text-white' : 'bg-red-600 text-white'
        }`}>
          {toast.type === 'success' ? <CheckCircle size={16} /> : <XCircle size={16} />}
          {toast.message}
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: 'Pending Approval', value: pendingDocs.length, color: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-100', icon: Clock },
          { label: 'Approved Today', value: auditTrail.filter(a => a.action === 'approved' && a.timestamp.startsWith('2025-02-28')).length, color: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-100', icon: CheckCircle },
          { label: 'Active Vendors', value: 4, color: 'text-violet-600', bg: 'bg-violet-50', border: 'border-violet-100', icon: Package },
          { label: 'Audit Entries', value: auditTrail.length, color: 'text-[#011B5E]', bg: 'bg-blue-50', border: 'border-blue-100', icon: FileText },
        ].map((s) => (
          <div key={s.label} className={`bg-white rounded-xl p-4 border ${s.border} card-hover`}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500 font-medium">{s.label}</p>
                <p className={`text-3xl font-bold mt-1 ${s.color}`}>{s.value}</p>
              </div>
              <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${s.bg} ${s.color}`}>
                <s.icon size={18} />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-5 gap-6">
        {/* Approval Queue */}
        <div className="col-span-3 bg-white rounded-xl border border-gray-200">
          <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-gray-900">Document Approval Queue</h3>
              <p className="text-xs text-gray-500 mt-0.5">
                {pendingDocs.length} document{pendingDocs.length !== 1 ? 's' : ''} awaiting your decision
              </p>
            </div>
            {pendingDocs.length > 0 && (
              <span className="flex items-center gap-1 text-xs bg-amber-100 text-amber-700 px-2.5 py-1 rounded-full font-medium">
                <AlertCircle size={12} />
                Action Required
              </span>
            )}
          </div>

          <div className="divide-y divide-gray-50">
            {pendingDocs.length === 0 ? (
              <div className="p-12 text-center">
                <CheckCircle className="mx-auto text-emerald-500 mb-3" size={40} />
                <p className="font-medium text-gray-700">All documents processed!</p>
                <p className="text-sm text-gray-400 mt-1">No pending approvals at this time.</p>
              </div>
            ) : (
              pendingDocs.map((doc) => (
                <div key={doc.id} className="px-5 py-4 hover:bg-gray-50/50 transition-colors">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">{doc.type}</span>
                        {doc.amount && (
                          <span className="text-xs font-semibold text-[#011B5E]">{doc.amount}</span>
                        )}
                      </div>
                      <p className="text-sm font-medium text-gray-800">{doc.name}</p>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="flex items-center gap-1 text-xs text-gray-500">
                          <User size={10} /> {doc.submittedBy}
                        </span>
                        <span className="flex items-center gap-1 text-xs text-gray-400">
                          <Calendar size={10} /> {doc.date}
                        </span>
                        <span className="text-xs text-gray-400">{doc.department}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <button
                        onClick={() => handleAction(doc.id, 'rejected')}
                        className="flex items-center gap-1.5 text-xs bg-red-50 text-red-600 border border-red-200 hover:bg-red-100 px-3 py-1.5 rounded-lg transition-colors font-medium"
                      >
                        <XCircle size={13} />
                        Reject
                      </button>
                      <button
                        onClick={() => handleAction(doc.id, 'approved')}
                        className="flex items-center gap-1.5 text-xs bg-emerald-600 text-white hover:bg-emerald-700 px-3 py-1.5 rounded-lg transition-colors font-medium"
                      >
                        <CheckCircle size={13} />
                        Approve
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Processed docs summary */}
          {processedDocs.length > 0 && (
            <div className="px-5 py-3 border-t border-gray-100 bg-gray-50 rounded-b-xl">
              <p className="text-xs text-gray-500 font-medium">
                {processedDocs.length} document{processedDocs.length !== 1 ? 's' : ''} processed in this session ·{' '}
                <span className="text-emerald-600">{processedDocs.filter(d => d.status === 'approved').length} approved</span>{' · '}
                <span className="text-red-600">{processedDocs.filter(d => d.status === 'rejected').length} rejected</span>
              </p>
            </div>
          )}
        </div>

        {/* Right Column */}
        <div className="col-span-2 space-y-5">
          {/* Vendor Pipeline */}
          <div className="bg-white rounded-xl border border-gray-200">
            <div className="px-5 py-4 border-b border-gray-100">
              <h3 className="font-semibold text-gray-900 text-sm">Vendor Procurement Pipeline</h3>
              <p className="text-xs text-gray-500 mt-0.5">Active procurement processes</p>
            </div>
            <div className="divide-y divide-gray-50">
              {vendorPipeline.map((v) => (
                <div key={v.id} className="px-5 py-3.5">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="text-xs font-semibold text-gray-800">{v.vendor}</p>
                      <p className="text-[10px] text-gray-500">{v.service} · {v.amount}</p>
                    </div>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${stageColors[v.stage]}`}>
                      {v.stages[v.stage]}
                    </span>
                  </div>
                  <div className="flex gap-0.5">
                    {v.stages.map((_, si) => (
                      <div
                        key={si}
                        className={`flex-1 h-1 rounded-full transition-all ${
                          si <= v.stage ? 'bg-[#011B5E]' : 'bg-gray-100'
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-[10px] text-gray-400 mt-1">Step {v.stage + 1} of {v.stages.length}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Audit Trail */}
          <div className="bg-white rounded-xl border border-gray-200">
            <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
              <h3 className="font-semibold text-gray-900 text-sm">Audit Trail</h3>
              <span className="text-xs text-gray-400">{auditTrail.length} entries</span>
            </div>
            <div className="max-h-64 overflow-y-auto divide-y divide-gray-50">
              {auditTrail.map((entry) => (
                <div key={entry.id} className="px-5 py-3 flex items-start gap-3">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                    entry.action === 'approved' ? 'bg-emerald-100' : 'bg-red-100'
                  }`}>
                    {entry.action === 'approved' ? (
                      <CheckCircle size={12} className="text-emerald-600" />
                    ) : (
                      <XCircle size={12} className="text-red-600" />
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-medium text-gray-800 truncate">{entry.document}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className={`text-[10px] font-semibold capitalize ${
                        entry.action === 'approved' ? 'text-emerald-600' : 'text-red-600'
                      }`}>
                        {entry.action}
                      </span>
                      <span className="text-[10px] text-gray-400">by {entry.actedBy}</span>
                    </div>
                    <p className="text-[10px] text-gray-400 mt-0.5">{entry.timestamp}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

'use client';

import { useState } from 'react';
import { FileText, Clock, TrendingUp, RefreshCw, CheckCircle, Loader, Calendar, ChevronRight } from 'lucide-react';

const reportData = [
  { id: 'RPT-2025-0156', name: 'Daily Transaction Summary', type: 'CBS Report', generated: '2025-02-28 08:00', status: 'Completed', size: '2.3 MB' },
  { id: 'RPT-2025-0155', name: 'Branch-wise Deposit Report', type: 'MIS Report', generated: '2025-02-28 07:45', status: 'Completed', size: '1.8 MB' },
  { id: 'RPT-2025-0154', name: 'Loan Overdue Analysis', type: 'Risk Report', generated: '2025-02-28 07:30', status: 'Completed', size: '4.1 MB' },
  { id: 'RPT-2025-0153', name: 'NRB Regulatory Submission', type: 'Compliance', generated: '2025-02-28 06:00', status: 'Completed', size: '890 KB' },
  { id: 'RPT-2025-0152', name: 'ATM Cash Position Report', type: 'Operations', generated: '2025-02-27 22:00', status: 'Completed', size: '540 KB' },
  { id: 'RPT-2025-0151', name: 'Foreign Exchange Summary', type: 'Treasury', generated: '2025-02-27 18:00', status: 'Completed', size: '1.2 MB' },
  { id: 'RPT-2025-0150', name: 'Monthly P&L Statement', type: 'Finance', generated: '2025-02-28 09:00', status: 'In Progress', size: '—' },
  { id: 'RPT-2025-0149', name: 'Staff Attendance Report', type: 'HR', generated: '2025-02-28 10:00', status: 'Scheduled', size: '—' },
];

const cbsSources = [
  { name: 'Core Banking System (CBS)', last: '2 min ago', status: 'Synced', records: '1,24,567' },
  { name: 'MIS Data Warehouse', last: '5 min ago', status: 'Synced', records: '89,432' },
  { name: 'NRB Reporting Gateway', last: '1 hr ago', status: 'Synced', records: '23,891' },
  { name: 'ATM Switch Interface', last: '30 sec ago', status: 'Synced', records: '5,234' },
  { name: 'Internet Banking System', last: '1 min ago', status: 'Synced', records: '67,890' },
  { name: 'Mobile Banking (Hamro RBB)', last: '3 min ago', status: 'Synced', records: '45,123' },
];

const taskQueue = [
  { task: 'End-of-day reconciliation', department: 'Accounts', eta: '5 min', progress: 82 },
  { task: 'Customer KYC batch update', department: 'Compliance', eta: '12 min', progress: 45 },
  { task: 'Interest calculation run', department: 'CBS', eta: '8 min', progress: 67 },
];

export default function RPAModule() {
  const [refreshing, setRefreshing] = useState(false);

  const triggerRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1800);
  };

  return (
    <div className="space-y-6">
      {/* Stat Cards */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: 'Staff Hours Saved', value: '1,248', sub: 'This month', icon: Clock, color: 'bg-blue-50 text-blue-600', border: 'border-blue-100' },
          { label: 'Reports Generated', value: '156', sub: 'This month', icon: FileText, color: 'bg-emerald-50 text-emerald-600', border: 'border-emerald-100' },
          { label: 'Entries Automated', value: '23,890', sub: 'This month', icon: TrendingUp, color: 'bg-violet-50 text-violet-600', border: 'border-violet-100' },
          { label: 'Process Efficiency', value: '94.7%', sub: 'vs manual baseline', icon: CheckCircle, color: 'bg-amber-50 text-amber-600', border: 'border-amber-100' },
        ].map((stat) => (
          <div key={stat.label} className={`bg-white rounded-xl p-4 border ${stat.border} card-hover`}>
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs text-gray-500 font-medium">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                <p className="text-xs text-gray-400 mt-0.5">{stat.sub}</p>
              </div>
              <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${stat.color}`}>
                <stat.icon size={18} />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-5 gap-6">
        {/* Reports Table */}
        <div className="col-span-3 bg-white rounded-xl border border-gray-200">
          <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-gray-900">Automated Report Generation</h3>
              <p className="text-xs text-gray-500 mt-0.5">System-generated reports from CBS/MIS pipelines</p>
            </div>
            <button
              onClick={triggerRefresh}
              className="flex items-center gap-1.5 text-xs text-[#011B5E] hover:bg-blue-50 px-3 py-1.5 rounded-lg transition-colors border border-[#011B5E]/20"
            >
              <RefreshCw size={13} className={refreshing ? 'animate-spin' : ''} />
              Refresh
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50">
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Report</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Type</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Generated</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {reportData.map((r) => (
                  <tr key={r.id} className="hover:bg-gray-50/60 transition-colors">
                    <td className="px-4 py-3">
                      <p className="font-medium text-gray-800 text-xs">{r.name}</p>
                      <p className="text-[10px] text-gray-400 mt-0.5">{r.id}</p>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">{r.type}</span>
                    </td>
                    <td className="px-4 py-3 text-xs text-gray-500">{r.generated}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full font-medium ${
                        r.status === 'Completed' ? 'bg-emerald-50 text-emerald-700' :
                        r.status === 'In Progress' ? 'bg-blue-50 text-blue-700' :
                        'bg-amber-50 text-amber-700'
                      }`}>
                        {r.status === 'In Progress' && <Loader size={10} className="animate-spin" />}
                        {r.status === 'Scheduled' && <Calendar size={10} />}
                        {r.status === 'Completed' && <CheckCircle size={10} />}
                        {r.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Column */}
        <div className="col-span-2 space-y-5">
          {/* CBS/MIS Data Sources */}
          <div className="bg-white rounded-xl border border-gray-200">
            <div className="px-5 py-4 border-b border-gray-100">
              <h3 className="font-semibold text-gray-900 text-sm">CBS/MIS Integration</h3>
              <p className="text-xs text-gray-500 mt-0.5">Live data sync status</p>
            </div>
            <div className="divide-y divide-gray-50">
              {cbsSources.map((src) => (
                <div key={src.name} className="px-5 py-3 flex items-center justify-between">
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-medium text-gray-800 truncate">{src.name}</p>
                    <p className="text-[10px] text-gray-400 mt-0.5">{src.records} records · {src.last}</p>
                  </div>
                  <span className="ml-2 flex items-center gap-1 text-[10px] bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full whitespace-nowrap">
                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                    {src.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Automation Queue */}
          <div className="bg-white rounded-xl border border-gray-200">
            <div className="px-5 py-4 border-b border-gray-100">
              <h3 className="font-semibold text-gray-900 text-sm">Active Automation Tasks</h3>
            </div>
            <div className="p-4 space-y-3">
              {taskQueue.map((task) => (
                <div key={task.task} className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-medium text-gray-800">{task.task}</p>
                      <p className="text-[10px] text-gray-400">{task.department} · ETA {task.eta}</p>
                    </div>
                    <span className="text-xs font-semibold text-[#011B5E]">{task.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-1.5">
                    <div
                      className="bg-[#011B5E] h-1.5 rounded-full transition-all duration-1000"
                      style={{ width: `${task.progress}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Staff Hours Saved Trend */}
          <div className="bg-gradient-to-br from-[#011B5E] to-[#0a2d8f] rounded-xl p-5 text-white">
            <p className="text-xs text-blue-200 font-medium">Monthly Staff Hours Saved</p>
            <div className="flex items-end gap-1 mt-3">
              {[820, 950, 1020, 1100, 1248].map((v, i) => (
                <div key={i} className="flex flex-col items-center gap-1 flex-1">
                  <div
                    className="w-full bg-white/20 rounded-sm"
                    style={{ height: `${(v / 1248) * 60}px` }}
                  />
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-1">
              {['Oct', 'Nov', 'Dec', 'Jan', 'Feb'].map((m) => (
                <span key={m} className="text-[10px] text-blue-300">{m}</span>
              ))}
            </div>
            <div className="mt-3 pt-3 border-t border-white/20 flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold">1,248</p>
                <p className="text-xs text-blue-200">hours saved this month</p>
              </div>
              <div className="flex items-center gap-1 text-emerald-300 text-xs font-medium">
                <TrendingUp size={14} />
                +13.5% vs last month
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  LayoutDashboard,
  Bot,
  FileText,
  Monitor,
  Bell,
  LogOut,
  ChevronRight,
  User,
  Settings,
  TrendingUp,
  Clock,
  AlertTriangle,
  CheckCircle,
} from 'lucide-react';
import RPAModule from '@/components/dashboard/RPAModule';
import DocumentModule from '@/components/dashboard/DocumentModule';
import MonitoringModule from '@/components/dashboard/MonitoringModule';
import RBBLogo from '@/components/RBBLogo';

type ActiveModule = 'overview' | 'rpa' | 'documents' | 'monitoring';

const navItems: { id: ActiveModule; label: string; icon: typeof LayoutDashboard; desc: string }[] = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard, desc: 'Dashboard summary' },
  { id: 'rpa', label: 'RPA Automation', icon: Bot, desc: 'Process automation' },
  { id: 'documents', label: 'Documents', icon: FileText, desc: 'Approvals & procurement' },
  { id: 'monitoring', label: 'Channel Monitor', icon: Monitor, desc: 'ATM & digital channels' },
];

const moduleTitles: Record<ActiveModule, { title: string; subtitle: string }> = {
  overview: { title: 'Dashboard Overview', subtitle: 'Welcome back — here\'s what needs your attention today' },
  rpa: { title: 'RPA Back-Office Automation', subtitle: 'Automated report generation, CBS/MIS integration & staff-hour savings' },
  documents: { title: 'Document & Procurement Management', subtitle: 'Digital document workflow, e-approvals, vendor pipeline & audit trail' },
  monitoring: { title: 'Real-Time Digital Channel Monitoring', subtitle: 'ATM health, mobile banking uptime, error tracking & proactive alerts' },
};

function OverviewModule() {
  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { title: 'Pending Approvals', value: '6', sub: 'Documents awaiting review', icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-100', trend: '' },
          { title: 'ATMs Offline', value: '2', sub: 'Biratnagar & Janakpur', icon: AlertTriangle, color: 'text-red-600', bg: 'bg-red-50', border: 'border-red-100', trend: '' },
          { title: 'Staff Hours Saved', value: '1,248', sub: 'This month via automation', icon: TrendingUp, color: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-100', trend: '+13.5%' },
          { title: 'Reports Generated', value: '47', sub: 'Automated today', icon: CheckCircle, color: 'text-[#011B5E]', bg: 'bg-blue-50', border: 'border-blue-100', trend: '' },
        ].map((c) => (
          <div key={c.title} className={`bg-white rounded-xl p-5 border ${c.border} card-hover`}>
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-medium text-gray-500">{c.title}</p>
                <p className={`text-3xl font-bold mt-1 ${c.color}`}>{c.value}</p>
                <p className="text-xs text-gray-400 mt-0.5">{c.sub}</p>
                {c.trend && (
                  <span className="inline-flex items-center gap-1 text-xs text-emerald-600 font-medium mt-1">
                    <TrendingUp size={10} /> {c.trend}
                  </span>
                )}
              </div>
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${c.bg} ${c.color}`}>
                <c.icon size={20} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Module Quick Access */}
      <div>
        <h3 className="text-sm font-semibold text-gray-700 mb-3">Back Office Modules</h3>
        <div className="grid grid-cols-3 gap-4">
          {[
            {
              id: 'rpa' as ActiveModule,
              icon: Bot,
              title: 'RPA Back-Office Automation',
              bullets: ['156 reports auto-generated', '23,890 manual entries eliminated', 'CBS/MIS sync: All 6 sources live'],
              color: 'from-[#011B5E] to-[#0a2d8f]',
            },
            {
              id: 'documents' as ActiveModule,
              icon: FileText,
              title: 'Document & Procurement',
              bullets: ['6 documents pending approval', '4 active vendor pipelines', 'Full audit trail maintained'],
              color: 'from-violet-700 to-violet-600',
            },
            {
              id: 'monitoring' as ActiveModule,
              icon: Monitor,
              title: 'Digital Channel Monitoring',
              bullets: ['10/12 ATMs online', 'Mobile Banking: 99.4% uptime', '2 high-severity alerts active'],
              color: 'from-slate-700 to-slate-600',
            },
          ].map((mod) => (
            <div key={mod.id} className={`bg-gradient-to-br ${mod.color} rounded-xl p-5 text-white`}>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 bg-white/15 rounded-lg flex items-center justify-center">
                  <mod.icon size={16} />
                </div>
                <p className="font-semibold text-sm">{mod.title}</p>
              </div>
              <ul className="space-y-1.5 mb-4">
                {mod.bullets.map((b) => (
                  <li key={b} className="text-xs text-white/80 flex items-start gap-1.5">
                    <span className="text-white/50 mt-0.5">•</span>
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl border border-gray-200">
        <div className="px-5 py-4 border-b border-gray-100">
          <h3 className="font-semibold text-gray-900">Recent Activity</h3>
          <p className="text-xs text-gray-500 mt-0.5">Latest system events and actions</p>
        </div>
        <div className="divide-y divide-gray-50">
          {[
            { time: '09:12', type: 'Approved', detail: 'Q1 Marketing Budget — NPR 12,50,000', color: 'text-emerald-600', dot: 'bg-emerald-500' },
            { time: '08:45', type: 'Report', detail: 'Daily Transaction Summary auto-generated', color: 'text-blue-600', dot: 'bg-blue-500' },
            { time: '08:30', type: 'Alert', detail: 'ATM-BRT-001 (Biratnagar) went offline', color: 'text-red-600', dot: 'bg-red-500' },
            { time: '07:45', type: 'Sync', detail: 'MIS Data Warehouse: 89,432 records synced', color: 'text-gray-600', dot: 'bg-gray-400' },
            { time: '07:00', type: 'Report', detail: 'Branch-wise Deposit Report generated for all 77 districts', color: 'text-blue-600', dot: 'bg-blue-500' },
          ].map((item, i) => (
            <div key={i} className="px-5 py-3 flex items-center gap-4">
              <span className="text-xs text-gray-400 font-mono w-10 flex-shrink-0">{item.time}</span>
              <span className={`w-2 h-2 rounded-full flex-shrink-0 ${item.dot}`} />
              <span className={`text-xs font-semibold flex-shrink-0 w-16 ${item.color}`}>{item.type}</span>
              <span className="text-xs text-gray-600">{item.detail}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const [activeModule, setActiveModule] = useState<ActiveModule>('overview');
  const [notifOpen, setNotifOpen] = useState(false);

  const { title, subtitle } = moduleTitles[activeModule];

  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden font-sans">
      {/* Sidebar */}
      <aside className="w-60 bg-[#011B5E] flex flex-col flex-shrink-0 z-30">
        {/* Logo */}
        <div className="px-4 py-4 border-b border-white/10">
          <RBBLogo inverted maxWidth="192px" />
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-0.5">
          <p className="text-[9px] font-semibold text-blue-400 uppercase tracking-widest px-2 mb-2">Navigation</p>
          {navItems.map((item) => {
            const isActive = activeModule === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveModule(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all text-left ${
                  isActive
                    ? 'bg-white text-[#011B5E]'
                    : 'text-blue-200 hover:bg-white/10 hover:text-white'
                }`}
              >
                <item.icon size={17} className={isActive ? 'text-[#011B5E]' : ''} />
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-semibold truncate">{item.label}</p>
                  <p className={`text-[9px] truncate ${isActive ? 'text-[#011B5E]/60' : 'text-blue-400'}`}>
                    {item.desc}
                  </p>
                </div>
                {isActive && <ChevronRight size={12} className="flex-shrink-0 text-[#011B5E]/50" />}
              </button>
            );
          })}
        </nav>

        {/* User Footer */}
        <div className="px-3 pb-4 border-t border-white/10 pt-4">
          <div className="flex items-center gap-3 px-2 mb-3">
            <div className="w-8 h-8 bg-[#FFB81C] rounded-full flex items-center justify-center flex-shrink-0">
              <User size={15} className="text-[#011B5E]" />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-semibold text-white truncate">Admin User</p>
              <p className="text-[9px] text-blue-300 truncate">admin@rbb.com.np</p>
            </div>
          </div>
          <div className="flex gap-1.5">
            <button className="flex-1 flex items-center justify-center gap-1.5 text-[10px] text-blue-300 hover:text-white hover:bg-white/10 px-2 py-1.5 rounded-lg transition-colors">
              <Settings size={12} />
              Settings
            </button>
            <Link href="/" className="flex-1 flex items-center justify-center gap-1.5 text-[10px] text-blue-300 hover:text-white hover:bg-white/10 px-2 py-1.5 rounded-lg transition-colors">
              <LogOut size={12} />
              Logout
            </Link>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="bg-white border-b border-gray-100 px-6 h-14 flex items-center justify-between flex-shrink-0 z-20">
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <Link href="/" className="hover:text-[#011B5E] transition-colors">Home</Link>
            <ChevronRight size={12} />
            <span className="hover:text-[#011B5E] cursor-pointer transition-colors">Dashboard</span>
            {activeModule !== 'overview' && (
              <>
                <ChevronRight size={12} />
                <span className="text-[#011B5E] font-medium">
                  {navItems.find(n => n.id === activeModule)?.label}
                </span>
              </>
            )}
          </div>

          <div className="flex items-center gap-4">
            <span className="text-xs text-gray-400 hidden lg:block">{today}</span>

            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => setNotifOpen(!notifOpen)}
                className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Bell size={18} className="text-gray-600" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
              </button>

              {notifOpen && (
                <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-xl shadow-xl border border-gray-200 z-50 animate-fade-in">
                  <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
                    <p className="text-sm font-semibold text-gray-900">Notifications</p>
                    <span className="text-xs text-red-600 font-medium">3 unread</span>
                  </div>
                  <div className="divide-y divide-gray-50 max-h-64 overflow-y-auto">
                    {[
                      { icon: '🔴', text: 'ATM-JNK-001 (Janakpur) offline', time: '25m ago' },
                      { icon: '🟡', text: 'ATM-KTM-002 (Thamel) low cash warning', time: '8m ago' },
                      { icon: '📄', text: '6 documents pending your approval', time: '1h ago' },
                      { icon: '✅', text: 'Q1 Marketing Budget approved', time: '2h ago' },
                    ].map((n, i) => (
                      <div key={i} className="flex items-start gap-3 px-4 py-3 hover:bg-gray-50 cursor-pointer">
                        <span className="text-sm mt-0.5">{n.icon}</span>
                        <div>
                          <p className="text-xs text-gray-800">{n.text}</p>
                          <p className="text-[10px] text-gray-400 mt-0.5">{n.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="px-4 py-2 border-t border-gray-100">
                    <button
                      onClick={() => setNotifOpen(false)}
                      className="text-xs text-[#011B5E] font-medium"
                    >
                      Mark all as read
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* User avatar */}
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-[#011B5E] rounded-full flex items-center justify-center">
                <User size={15} className="text-white" />
              </div>
              <div className="hidden sm:block">
                <p className="text-xs font-semibold text-gray-800 leading-tight">Admin User</p>
                <p className="text-[10px] text-gray-400 leading-tight">Super Admin</p>
              </div>
            </div>
          </div>
        </header>

        {/* Page Header */}
        <div className="bg-white border-b border-gray-100 px-6 py-4 flex-shrink-0">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-lg font-bold text-gray-900">{title}</h1>
              <p className="text-xs text-gray-500 mt-0.5">{subtitle}</p>
            </div>
            <div className="flex gap-2">
              {activeModule === 'rpa' && (
                <button className="text-xs bg-[#011B5E] text-white px-4 py-2 rounded-lg hover:bg-[#0a2d8f] transition-colors font-medium">
                  Generate Report
                </button>
              )}
              {activeModule === 'monitoring' && (
                <button className="text-xs bg-[#011B5E] text-white px-4 py-2 rounded-lg hover:bg-[#0a2d8f] transition-colors font-medium">
                  Export Status Report
                </button>
              )}
              {activeModule === 'documents' && (
                <button className="text-xs border border-[#011B5E] text-[#011B5E] px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors font-medium">
                  Upload Document
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Module Content */}
        <main className="flex-1 overflow-y-auto p-6 dashboard-scroll">
          {activeModule === 'overview' && <OverviewModule />}
          {activeModule === 'rpa' && <RPAModule />}
          {activeModule === 'documents' && <DocumentModule />}
          {activeModule === 'monitoring' && <MonitoringModule />}
        </main>
      </div>

      {/* Overlay for notification */}
      {notifOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setNotifOpen(false)}
        />
      )}
    </div>
  );
}

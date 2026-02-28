'use client';

import { useState, useEffect } from 'react';
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts';
import { Wifi, WifiOff, AlertTriangle, Activity, Smartphone, Globe, Bell, RefreshCw } from 'lucide-react';

const atmData = [
  { id: 'ATM-KTM-001', location: 'Kathmandu Central', address: 'New Road, Kathmandu', status: 'Online', uptime: '99.8%', cash: 'Full', txToday: 342 },
  { id: 'ATM-KTM-002', location: 'Thamel Branch', address: 'Thamel, Kathmandu', status: 'Warning', uptime: '95.2%', cash: 'Low', txToday: 189 },
  { id: 'ATM-KTM-003', location: 'Kalimati', address: 'Kalimati, Kathmandu', status: 'Online', uptime: '99.5%', cash: 'Full', txToday: 278 },
  { id: 'ATM-KTM-004', location: 'Chabahil', address: 'Chabahil, Kathmandu', status: 'Online', uptime: '99.9%', cash: 'Full', txToday: 156 },
  { id: 'ATM-PKR-001', location: 'Pokhara Lakeside', address: 'Lakeside, Pokhara', status: 'Online', uptime: '99.7%', cash: 'Full', txToday: 423 },
  { id: 'ATM-PKR-002', location: 'Pokhara Main', address: 'Chipledhunga, Pokhara', status: 'Online', uptime: '98.9%', cash: 'Full', txToday: 267 },
  { id: 'ATM-BRT-001', location: 'Biratnagar', address: 'Main Road, Biratnagar', status: 'Offline', uptime: '87.3%', cash: 'Unknown', txToday: 0 },
  { id: 'ATM-BRG-001', location: 'Birgunj', address: 'Ghantaghar, Birgunj', status: 'Online', uptime: '99.1%', cash: 'Full', txToday: 198 },
  { id: 'ATM-BTW-001', location: 'Butwal', address: 'Traffic Chowk, Butwal', status: 'Online', uptime: '98.7%', cash: 'Full', txToday: 231 },
  { id: 'ATM-LPR-001', location: 'Lalitpur', address: 'Mangal Bazar, Lalitpur', status: 'Warning', uptime: '92.4%', cash: 'Low', txToday: 134 },
  { id: 'ATM-DHR-001', location: 'Dharan', address: 'B.P. Chowk, Dharan', status: 'Online', uptime: '99.6%', cash: 'Full', txToday: 289 },
  { id: 'ATM-JNK-001', location: 'Janakpur', address: 'Ramlila Road, Janakpur', status: 'Offline', uptime: '78.5%', cash: 'Unknown', txToday: 0 },
];

const uptimeData = [
  { time: '12am', mobile: 99.8, internet: 99.9 },
  { time: '4am', mobile: 99.5, internet: 99.7 },
  { time: '8am', mobile: 98.9, internet: 99.5 },
  { time: '10am', mobile: 97.3, internet: 99.1 },
  { time: '12pm', mobile: 98.7, internet: 99.4 },
  { time: '2pm', mobile: 99.2, internet: 99.8 },
  { time: '4pm', mobile: 99.6, internet: 99.9 },
  { time: '6pm', mobile: 99.1, internet: 99.6 },
  { time: 'Now', mobile: 99.4, internet: 99.8 },
];

const errorData = [
  { hour: '6am', failed: 3, timeout: 8, error: 1 },
  { hour: '8am', failed: 8, timeout: 24, error: 5 },
  { hour: '10am', failed: 12, timeout: 45, error: 7 },
  { hour: '12pm', failed: 15, timeout: 62, error: 9 },
  { hour: '2pm', failed: 11, timeout: 38, error: 6 },
  { hour: '4pm', failed: 9, timeout: 29, error: 4 },
  { hour: '6pm', failed: 6, timeout: 18, error: 2 },
];

const initialAlerts = [
  { id: 1, severity: 'high', message: 'ATM-JNK-001 (Janakpur) is offline — network connectivity failure detected', time: '25 min ago', category: 'ATM' },
  { id: 2, severity: 'high', message: 'ATM-BRT-001 (Biratnagar) is offline — cash module fault', time: '12 min ago', category: 'ATM' },
  { id: 3, severity: 'medium', message: 'ATM-KTM-002 (Thamel) low cash level — refill required within 4 hours', time: '8 min ago', category: 'ATM' },
  { id: 4, severity: 'medium', message: 'Mobile Banking: 12% spike in failed OTP deliveries via NTC network', time: '15 min ago', category: 'Mobile' },
  { id: 5, severity: 'low', message: 'Scheduled maintenance window: Internet Banking (Sun, Mar 2 — 2am–4am)', time: '1 hr ago', category: 'Internet' },
  { id: 6, severity: 'low', message: 'SSL certificate auto-renewed for ibk.rbb.com.np — valid until 2026-02-28', time: '3 hrs ago', category: 'Security' },
];

const statusConfig = {
  Online: { icon: Wifi, color: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-200', dot: 'bg-emerald-500' },
  Offline: { icon: WifiOff, color: 'text-red-600', bg: 'bg-red-50', border: 'border-red-200', dot: 'bg-red-500' },
  Warning: { icon: AlertTriangle, color: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-200', dot: 'bg-amber-500' },
};

const severityConfig = {
  high: { color: 'bg-red-50 border-red-200', badge: 'bg-red-100 text-red-700', icon: '🔴' },
  medium: { color: 'bg-amber-50 border-amber-200', badge: 'bg-amber-100 text-amber-700', icon: '🟡' },
  low: { color: 'bg-blue-50 border-blue-200', badge: 'bg-blue-100 text-blue-700', icon: '🔵' },
};

export default function MonitoringModule() {
  const [alerts, setAlerts] = useState(initialAlerts);
  const [lastRefresh, setLastRefresh] = useState(new Date());
  const [isRefreshing, setIsRefreshing] = useState(false);

  const onlineCount = atmData.filter(a => a.status === 'Online').length;
  const offlineCount = atmData.filter(a => a.status === 'Offline').length;
  const warningCount = atmData.filter(a => a.status === 'Warning').length;

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setLastRefresh(new Date());
      setIsRefreshing(false);
    }, 1200);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setLastRefresh(new Date());
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  const dismissAlert = (id: number) => {
    setAlerts(prev => prev.filter(a => a.id !== id));
  };

  return (
    <div className="space-y-6">
      {/* Status Summary */}
      <div className="grid grid-cols-5 gap-4">
        <div className="bg-white rounded-xl p-4 border border-emerald-100 card-hover">
          <p className="text-xs text-gray-500 font-medium">ATMs Online</p>
          <p className="text-3xl font-bold text-emerald-600 mt-1">{onlineCount}</p>
          <p className="text-xs text-gray-400 mt-0.5">of {atmData.length} total</p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-red-100 card-hover">
          <p className="text-xs text-gray-500 font-medium">ATMs Offline</p>
          <p className="text-3xl font-bold text-red-600 mt-1">{offlineCount}</p>
          <p className="text-xs text-gray-400 mt-0.5">requires attention</p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-amber-100 card-hover">
          <p className="text-xs text-gray-500 font-medium">Warning State</p>
          <p className="text-3xl font-bold text-amber-600 mt-1">{warningCount}</p>
          <p className="text-xs text-gray-400 mt-0.5">monitoring closely</p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-blue-100 card-hover">
          <p className="text-xs text-gray-500 font-medium">Mobile Banking</p>
          <p className="text-3xl font-bold text-[#011B5E] mt-1">99.4%</p>
          <p className="text-xs text-gray-400 mt-0.5">uptime today</p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-violet-100 card-hover">
          <p className="text-xs text-gray-500 font-medium">Internet Banking</p>
          <p className="text-3xl font-bold text-violet-600 mt-1">99.8%</p>
          <p className="text-xs text-gray-400 mt-0.5">uptime today</p>
        </div>
      </div>

      <div className="grid grid-cols-5 gap-6">
        {/* ATM Grid */}
        <div className="col-span-3 space-y-5">
          {/* ATM Status Grid */}
          <div className="bg-white rounded-xl border border-gray-200">
            <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-gray-900">ATM Health Dashboard</h3>
                <p className="text-xs text-gray-500 mt-0.5">
                  Last refreshed: {lastRefresh.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                </p>
              </div>
              <button
                onClick={handleRefresh}
                className="flex items-center gap-1.5 text-xs text-[#011B5E] hover:bg-blue-50 px-3 py-1.5 rounded-lg transition-colors border border-[#011B5E]/20"
              >
                <RefreshCw size={13} className={isRefreshing ? 'animate-spin' : ''} />
                Refresh
              </button>
            </div>
            <div className="p-4 grid grid-cols-3 gap-3">
              {atmData.map((atm) => {
                const cfg = statusConfig[atm.status as keyof typeof statusConfig];
                return (
                  <div
                    key={atm.id}
                    className={`rounded-lg p-3 border ${cfg.border} ${cfg.bg} transition-all`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-semibold text-gray-800 truncate">{atm.location}</p>
                        <p className="text-[10px] text-gray-500 truncate">{atm.address}</p>
                      </div>
                      <span className={`w-2 h-2 rounded-full flex-shrink-0 ml-2 mt-1 ${cfg.dot} ${atm.status !== 'Offline' ? 'animate-pulse' : ''}`} />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className={`text-[10px] font-semibold flex items-center gap-1 ${cfg.color}`}>
                        <cfg.icon size={10} />
                        {atm.status}
                      </span>
                      <span className="text-[10px] text-gray-500">{atm.uptime}</span>
                    </div>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-[10px] text-gray-400">Cash: {atm.cash}</span>
                      {atm.txToday > 0 && (
                        <span className="text-[10px] text-gray-500">{atm.txToday} tx today</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-2 gap-5">
            {/* Uptime Chart */}
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <div className="mb-4">
                <h3 className="font-semibold text-gray-900 text-sm">Digital Channel Uptime</h3>
                <p className="text-xs text-gray-500 mt-0.5">Today's uptime % by hour</p>
              </div>
              <ResponsiveContainer width="100%" height={160}>
                <AreaChart data={uptimeData}>
                  <defs>
                    <linearGradient id="mobile" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#011B5E" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#011B5E" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="internet" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#7c3aed" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#7c3aed" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="time" tick={{ fontSize: 10 }} stroke="#cbd5e1" />
                  <YAxis domain={[96, 100]} tick={{ fontSize: 10 }} stroke="#cbd5e1" />
                  <Tooltip
                    contentStyle={{ fontSize: 11, borderRadius: 8, border: '1px solid #e2e8f0' }}
                    formatter={(value: number) => [`${value}%`]}
                  />
                  <Area type="monotone" dataKey="mobile" stroke="#011B5E" strokeWidth={2} fill="url(#mobile)" name="Mobile Banking" />
                  <Area type="monotone" dataKey="internet" stroke="#7c3aed" strokeWidth={2} fill="url(#internet)" name="Internet Banking" />
                </AreaChart>
              </ResponsiveContainer>
              <div className="flex gap-4 mt-2">
                <span className="flex items-center gap-1.5 text-[10px] text-gray-500">
                  <span className="w-2 h-2 bg-[#011B5E] rounded-full" /> Mobile Banking
                </span>
                <span className="flex items-center gap-1.5 text-[10px] text-gray-500">
                  <span className="w-2 h-2 bg-violet-600 rounded-full" /> Internet Banking
                </span>
              </div>
            </div>

            {/* Error Rate Chart */}
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <div className="mb-4">
                <h3 className="font-semibold text-gray-900 text-sm">Transaction Error Rate</h3>
                <p className="text-xs text-gray-500 mt-0.5">Errors by type per hour</p>
              </div>
              <ResponsiveContainer width="100%" height={160}>
                <BarChart data={errorData} barSize={8}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="hour" tick={{ fontSize: 10 }} stroke="#cbd5e1" />
                  <YAxis tick={{ fontSize: 10 }} stroke="#cbd5e1" />
                  <Tooltip
                    contentStyle={{ fontSize: 11, borderRadius: 8, border: '1px solid #e2e8f0' }}
                  />
                  <Bar dataKey="failed" fill="#ef4444" name="Failed" radius={[2,2,0,0]} />
                  <Bar dataKey="timeout" fill="#f59e0b" name="Timeout" radius={[2,2,0,0]} />
                  <Bar dataKey="error" fill="#011B5E" name="Error" radius={[2,2,0,0]} />
                </BarChart>
              </ResponsiveContainer>
              <div className="flex gap-4 mt-2">
                <span className="flex items-center gap-1.5 text-[10px] text-gray-500">
                  <span className="w-2 h-2 bg-red-500 rounded-full" /> Failed
                </span>
                <span className="flex items-center gap-1.5 text-[10px] text-gray-500">
                  <span className="w-2 h-2 bg-amber-500 rounded-full" /> Timeout
                </span>
                <span className="flex items-center gap-1.5 text-[10px] text-gray-500">
                  <span className="w-2 h-2 bg-[#011B5E] rounded-full" /> Error
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Alert Feed */}
        <div className="col-span-2 space-y-5">
          {/* Channel Metrics */}
          <div className="bg-white rounded-xl border border-gray-200">
            <div className="px-5 py-4 border-b border-gray-100">
              <h3 className="font-semibold text-gray-900 text-sm">Channel Performance</h3>
              <p className="text-xs text-gray-500 mt-0.5">Real-time metrics</p>
            </div>
            <div className="p-4 space-y-4">
              {[
                { label: 'Mobile Banking', icon: Smartphone, users: '12,453 active', success: '99.2%', color: 'text-[#011B5E]' },
                { label: 'Internet Banking', icon: Globe, users: '3,218 active', success: '99.8%', color: 'text-violet-600' },
                { label: 'ATM Network', icon: Activity, users: `${onlineCount}/${atmData.length} online`, success: `${((onlineCount / atmData.length) * 100).toFixed(0)}%`, color: 'text-emerald-600' },
              ].map((ch) => (
                <div key={ch.label} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center flex-shrink-0">
                    <ch.icon size={16} className={ch.color} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-xs font-medium text-gray-800">{ch.label}</p>
                      <span className={`text-xs font-bold ${ch.color}`}>{ch.success}</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-1.5">
                      <div
                        className="bg-[#011B5E] h-1.5 rounded-full"
                        style={{ width: ch.success }}
                      />
                    </div>
                    <p className="text-[10px] text-gray-400 mt-0.5">{ch.users}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Alert Feed */}
          <div className="bg-white rounded-xl border border-gray-200 flex flex-col" style={{ maxHeight: '400px' }}>
            <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between flex-shrink-0">
              <div className="flex items-center gap-2">
                <Bell size={16} className="text-amber-500" />
                <h3 className="font-semibold text-gray-900 text-sm">Proactive Alert Feed</h3>
                {alerts.filter(a => a.severity === 'high').length > 0 && (
                  <span className="w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                    {alerts.filter(a => a.severity === 'high').length}
                  </span>
                )}
              </div>
              <span className="text-xs text-gray-400">{alerts.length} active</span>
            </div>
            <div className="overflow-y-auto flex-1 divide-y divide-gray-50">
              {alerts.length === 0 ? (
                <div className="p-8 text-center">
                  <Activity className="mx-auto text-emerald-500 mb-2" size={32} />
                  <p className="text-sm text-gray-600 font-medium">All systems normal</p>
                  <p className="text-xs text-gray-400 mt-1">No active alerts</p>
                </div>
              ) : (
                alerts.map((alert) => {
                  const cfg = severityConfig[alert.severity as keyof typeof severityConfig];
                  return (
                    <div key={alert.id} className={`px-4 py-3 border-l-4 ${cfg.color} hover:bg-opacity-80 transition-colors`}
                         style={{ borderLeftColor: alert.severity === 'high' ? '#ef4444' : alert.severity === 'medium' ? '#f59e0b' : '#3b82f6' }}>
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className={`text-[10px] px-1.5 py-0.5 rounded font-semibold uppercase ${cfg.badge}`}>
                              {alert.severity}
                            </span>
                            <span className="text-[10px] text-gray-400">{alert.category}</span>
                          </div>
                          <p className="text-xs text-gray-800 leading-relaxed">{alert.message}</p>
                          <p className="text-[10px] text-gray-400 mt-1">{alert.time}</p>
                        </div>
                        <button
                          onClick={() => dismissAlert(alert.id)}
                          className="text-gray-300 hover:text-gray-500 text-xs flex-shrink-0 mt-0.5"
                        >
                          ✕
                        </button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

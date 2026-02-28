'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Eye, EyeOff, Lock, Mail, ShieldCheck } from 'lucide-react';
import RBBLogo from '@/components/RBBLogo';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Accept any credentials — redirect to dashboard
    setTimeout(() => {
      router.push('/dashboard');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#011B5E] via-[#032580] to-[#0a2d8f] flex items-center justify-center p-4">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-white/5 rounded-full translate-x-1/3 translate-y-1/3" />
        <div className="absolute top-1/2 right-1/4 w-32 h-32 bg-[#FFB81C]/10 rounded-full" />
      </div>

      <div className="relative w-full max-w-md">
        {/* Back to site link */}
        <Link
          href="/"
          className="flex items-center gap-2 text-blue-200 text-sm hover:text-white transition-colors mb-8"
        >
          <ArrowLeft size={16} />
          Back to Public Site
        </Link>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Top strip */}
          <div className="bg-[#011B5E] px-8 py-6 text-white text-center">
            <div className="flex justify-center mb-4">
              <RBBLogo inverted maxWidth="220px" />
            </div>
            <h1 className="text-lg font-bold mt-2">Back Office Portal</h1>
            <p className="text-blue-200 text-sm mt-1">Staff Access Only</p>
          </div>

          {/* Form */}
          <div className="px-8 py-8">
            <div className="flex items-center gap-2 text-xs text-emerald-600 bg-emerald-50 border border-emerald-100 rounded-lg px-3 py-2 mb-6">
              <ShieldCheck size={14} />
              Secure, encrypted connection · Authorized personnel only
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Staff Email Address
                </label>
                <div className="relative">
                  <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your.name@rbb.com.np"
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#011B5E]/30 focus:border-[#011B5E] transition-all bg-gray-50 hover:bg-white"
                    autoComplete="email"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full pl-10 pr-11 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#011B5E]/30 focus:border-[#011B5E] transition-all bg-gray-50 hover:bg-white"
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded border-gray-300 text-[#011B5E] focus:ring-[#011B5E]/30"
                  />
                  <span className="text-gray-600">Remember me</span>
                </label>
                <a href="#" className="text-[#011B5E] font-medium hover:underline">
                  Forgot password?
                </a>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#011B5E] text-white font-semibold py-3 rounded-xl hover:bg-[#0a2d8f] transition-all disabled:opacity-80 flex items-center justify-center gap-2 text-sm"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Authenticating…
                  </>
                ) : (
                  'Login to Back Office'
                )}
              </button>
            </form>

            <div className="mt-6 pt-6 border-t border-gray-100 text-center">
              <p className="text-xs text-gray-500">
                Having trouble logging in? Contact{' '}
                <span className="text-[#011B5E] font-medium">IT Support: ext. 1001</span>
              </p>
              <p className="text-[10px] text-gray-400 mt-3">
                This portal is for authorized RBB staff only. Unauthorized access is prohibited and may be subject to legal action.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom note */}
        <p className="text-center text-xs text-blue-200/70 mt-6">
          © 2025 Rastriya Banijya Bank · Regulated by Nepal Rastra Bank
        </p>
      </div>
    </div>
  );
}

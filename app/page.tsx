'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Menu, X, ChevronRight, Phone, Mail, MapPin, ArrowRight,
  Landmark, CreditCard, Globe, Smartphone, TrendingUp, Shield,
  Star, Users, Building2, Award, ChevronDown
} from 'lucide-react';
import ChatWidget from '@/components/ChatWidget';
import RBBLogo from '@/components/RBBLogo';

const navLinks = ['Home', 'About', 'Services', 'Branches & ATMs', 'Contact'];

const services = [
  {
    icon: Landmark,
    title: 'Savings & Current Accounts',
    desc: 'Flexible savings and current account options with competitive interest rates and zero minimum balance.',
    color: 'bg-blue-50 text-blue-700',
  },
  {
    icon: TrendingUp,
    title: 'Loans & Credit Facilities',
    desc: 'Home loans, personal loans, business loans, and agricultural credit at preferential rates.',
    color: 'bg-emerald-50 text-emerald-700',
  },
  {
    icon: Globe,
    title: 'International Remittance',
    desc: 'Send and receive money globally through our extensive remittance network across 100+ countries.',
    color: 'bg-violet-50 text-violet-700',
  },
  {
    icon: Smartphone,
    title: 'Hamro RBB Mobile Banking',
    desc: 'Full-featured mobile banking app for transfers, bill payments, and account management.',
    color: 'bg-amber-50 text-amber-700',
  },
  {
    icon: CreditCard,
    title: 'Debit & Credit Cards',
    desc: 'Visa-powered debit and credit cards accepted worldwide with secure contactless payments.',
    color: 'bg-rose-50 text-rose-700',
  },
  {
    icon: Shield,
    title: 'Trade Finance & Treasury',
    desc: 'Letters of credit, bank guarantees, forex services, and comprehensive trade finance solutions.',
    color: 'bg-teal-50 text-teal-700',
  },
];

const stats = [
  { value: '2,500+', label: 'Branches & ATMs', icon: Building2 },
  { value: '5M+', label: 'Valued Customers', icon: Users },
  { value: '58+', label: 'Years of Service', icon: Award },
  { value: 'NPR 450B+', label: 'Total Assets', icon: TrendingUp },
];

const news = [
  {
    date: 'Feb 28, 2025',
    tag: 'Product Launch',
    title: 'RBB Launches Upgraded Mobile Banking App with Enhanced Security Features',
    excerpt: 'Rastriya Banijya Bank unveils the new Hamro RBB 3.0 app with biometric authentication, instant fund transfer, and AI-powered spend insights.',
  },
  {
    date: 'Feb 20, 2025',
    tag: 'Expansion',
    title: 'RBB Expands Branch Network to 10 New Remote Districts Under Financial Inclusion Drive',
    excerpt: "As part of Nepal Rastra Bank's financial inclusion mandate, RBB has established new branches in Humla, Dolpa, Mugu, Bajura, and 6 other remote districts.",
  },
  {
    date: 'Feb 10, 2025',
    tag: 'Award',
    title: 'RBB Receives "Best Government Bank — Nepal 2025" Award from Asian Banking Federation',
    excerpt: 'For the third consecutive year, Rastriya Banijya Bank has been recognised for excellence in customer service, digital transformation, and financial inclusion.',
  },
];

export default function LandingPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Navbar */}
      <nav
        className={`fixed top-0 inset-x-0 z-40 transition-all duration-300 ${
          scrolled ? 'bg-white shadow-sm border-b border-gray-100' : 'bg-white/95 backdrop-blur-sm border-b border-gray-100'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          {/* Logo */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <img src="/rbb-logo.png" alt="RBB Logo" className="h-10 object-contain" />
            <div className="hidden sm:block">
              <p className="text-sm font-bold text-[#011B5E] leading-tight">Rastriya Banijya Bank</p>
              <p className="text-[10px] text-gray-500 leading-tight">Nepal's Trusted Bank</p>
            </div>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link}
                href="#"
                className="text-sm text-gray-600 hover:text-[#011B5E] font-medium px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors"
              >
                {link}
              </a>
            ))}
          </div>

          {/* CTA */}
          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="hidden sm:flex items-center gap-2 bg-[#011B5E] text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-[#0a2d8f] transition-colors"
            >
              Staff Login
              <ArrowRight size={14} />
            </Link>
            <button
              className="md:hidden p-2 rounded-lg hover:bg-gray-100"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 px-4 py-3 space-y-1">
            {navLinks.map((link) => (
              <a
                key={link}
                href="#"
                className="block text-sm text-gray-700 font-medium px-3 py-2.5 rounded-lg hover:bg-gray-50 transition-colors"
              >
                {link}
              </a>
            ))}
            <Link
              href="/login"
              className="flex items-center justify-center gap-2 bg-[#011B5E] text-white text-sm font-medium px-4 py-2.5 rounded-lg mt-2"
            >
              Staff Login → Admin Portal
            </Link>
          </div>
        )}
      </nav>

      {/* Hero */}
      <section className="relative min-h-screen flex items-center overflow-hidden pt-16">
        <div className="absolute inset-0 bg-gradient-to-br from-[#011B5E] via-[#032580] to-[#0a2d8f]" />
        {/* Decorative circles */}
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-white/5 rounded-full -mr-48" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-white/5 rounded-full mb-[-80px]" />
        <div className="absolute top-1/3 left-2/3 w-40 h-40 bg-[#FFB81C]/10 rounded-full" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-24 grid md:grid-cols-2 gap-12 items-center">
          <div className="text-white">
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm text-blue-100 mb-6">
              <Star size={13} className="text-[#FFB81C]" />
              Nepal's Most Trusted Government Bank Since 1966
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold leading-tight mb-5">
              Banking for
              <span className="text-[#FFB81C]"> Every Nepali,</span>
              <br />Everywhere in Nepal
            </h1>
            <p className="text-blue-100 text-lg leading-relaxed mb-8 max-w-lg">
              Rastriya Banijya Bank has been serving Nepal's financial needs for over 58 years —
              from bustling cities to remote mountain communities. Your growth is our commitment.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href="#"
                className="flex items-center gap-2 bg-[#FFB81C] text-[#011B5E] font-semibold px-6 py-3 rounded-xl hover:bg-yellow-400 transition-colors"
              >
                Open an Account
                <ChevronRight size={18} />
              </a>
              <a
                href="#services"
                className="flex items-center gap-2 bg-white/10 border border-white/30 text-white font-medium px-6 py-3 rounded-xl hover:bg-white/20 transition-colors"
              >
                Explore Services
              </a>
            </div>
            <div className="mt-8 pt-8 border-t border-white/10 grid grid-cols-3 gap-6">
              {[
                { label: 'Branches', value: '1,300+' },
                { label: 'ATMs', value: '1,200+' },
                { label: 'Staff', value: '9,000+' },
              ].map((s) => (
                <div key={s.label}>
                  <p className="text-2xl font-bold text-white">{s.value}</p>
                  <p className="text-xs text-blue-200 mt-0.5">{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Hero card */}
          <div className="hidden md:flex justify-end">
            <div className="w-full max-w-sm">
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 text-white space-y-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-blue-100">Quick Access</p>
                  <span className="text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded-full">Secure</span>
                </div>
                {[
                  { icon: '💳', label: 'Check Balance', sub: 'Savings & Current' },
                  { icon: '↔️', label: 'Fund Transfer', sub: 'NEFT / RTGS / IME' },
                  { icon: '📄', label: 'Loan Application', sub: 'Home / Personal / Business' },
                  { icon: '📱', label: 'Mobile Recharge', sub: 'NTC / Ncell / Smart Cell' },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-3 bg-white/5 hover:bg-white/10 rounded-xl px-4 py-3 cursor-pointer transition-colors">
                    <span className="text-lg">{item.icon}</span>
                    <div>
                      <p className="text-sm font-medium">{item.label}</p>
                      <p className="text-[10px] text-blue-200">{item.sub}</p>
                    </div>
                    <ChevronRight size={14} className="ml-auto text-blue-300" />
                  </div>
                ))}
                <div className="pt-2 border-t border-white/10">
                  <p className="text-xs text-blue-200 text-center">
                    Or talk to{' '}
                    <span className="text-[#FFB81C] font-semibold cursor-pointer">RBB Sathi AI ↗</span>
                    {' '}for instant help
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-white/50 animate-bounce">
          <ChevronDown size={20} />
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <span className="text-xs font-semibold text-[#011B5E] uppercase tracking-widest bg-blue-50 px-3 py-1.5 rounded-full">Our Services</span>
            <h2 className="text-3xl font-bold text-gray-900 mt-4">Complete Banking Solutions</h2>
            <p className="text-gray-500 mt-3 max-w-xl mx-auto">
              From personal savings to corporate finance, RBB offers a comprehensive suite of banking products tailored to your needs.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((svc) => (
              <div
                key={svc.title}
                className="bg-white rounded-2xl p-6 border border-gray-100 hover:border-[#011B5E]/20 hover:shadow-lg transition-all duration-200 group cursor-pointer"
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${svc.color}`}>
                  <svc.icon size={22} />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{svc.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{svc.desc}</p>
                <div className="mt-4 flex items-center gap-1 text-sm text-[#011B5E] font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  Learn more <ChevronRight size={14} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid md:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-xs font-semibold text-[#011B5E] uppercase tracking-widest bg-blue-50 px-3 py-1.5 rounded-full">About RBB</span>
            <h2 className="text-3xl font-bold text-gray-900 mt-4 mb-5">
              Nepal's Premier Government-Owned Commercial Bank
            </h2>
            <p className="text-gray-600 leading-relaxed mb-5">
              Established on January 23, 1966 under the Rastriya Banijya Bank Act, RBB is wholly
              government-owned and serves as a key pillar of Nepal's financial system. With the
              widest branch network in the country, we are committed to financial inclusion for all.
            </p>
            <p className="text-gray-600 leading-relaxed mb-8">
              Regulated by Nepal Rastra Bank, RBB offers a full range of commercial banking
              services across personal, corporate, and government sectors. Our digital transformation
              journey is bringing modern banking to every corner of Nepal.
            </p>
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: '🏛️', label: 'Established', value: '1966' },
                { icon: '🏦', label: 'Ownership', value: '100% GoN' },
                { icon: '🌐', label: 'Districts Served', value: 'All 77' },
                { icon: '⭐', label: 'NRB Rating', value: 'A+' },
              ].map((f) => (
                <div key={f.label} className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl border border-gray-100">
                  <span className="text-2xl">{f.icon}</span>
                  <div>
                    <p className="text-xs text-gray-500">{f.label}</p>
                    <p className="font-semibold text-gray-900">{f.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="bg-gradient-to-br from-[#011B5E] to-[#0a2d8f] rounded-2xl p-8 text-white">
              <p className="text-sm font-semibold text-blue-200 mb-6 uppercase tracking-widest">Key Highlights</p>
              <div className="space-y-4">
                {[
                  { pct: 98, label: 'Customer Satisfaction Rate' },
                  { pct: 87, label: 'Digital Transaction Share' },
                  { pct: 94, label: 'NRB Regulatory Compliance' },
                  { pct: 76, label: 'Financial Inclusion Coverage' },
                ].map((item) => (
                  <div key={item.label}>
                    <div className="flex justify-between text-sm mb-1.5">
                      <span className="text-blue-100">{item.label}</span>
                      <span className="font-semibold">{item.pct}%</span>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-2">
                      <div
                        className="bg-[#FFB81C] h-2 rounded-full transition-all duration-1000"
                        style={{ width: `${item.pct}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-8 pt-6 border-t border-white/10">
                <Link
                  href="/login"
                  className="flex items-center justify-center gap-2 w-full bg-white text-[#011B5E] font-semibold py-3 rounded-xl hover:bg-blue-50 transition-colors text-sm"
                >
                  Staff Login → Admin Portal
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Banner */}
      <section className="py-16 bg-[#011B5E]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((s) => (
              <div key={s.label} className="text-center text-white">
                <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <s.icon size={22} className="text-[#FFB81C]" />
                </div>
                <p className="text-3xl font-bold mb-1">{s.value}</p>
                <p className="text-sm text-blue-200">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* News */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-end justify-between mb-12">
            <div>
              <span className="text-xs font-semibold text-[#011B5E] uppercase tracking-widest bg-blue-50 px-3 py-1.5 rounded-full">Latest News</span>
              <h2 className="text-3xl font-bold text-gray-900 mt-4">Recent Updates from RBB</h2>
            </div>
            <a href="#" className="hidden sm:flex items-center gap-1 text-sm text-[#011B5E] font-medium hover:gap-2 transition-all">
              View all news <ChevronRight size={16} />
            </a>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {news.map((item, i) => (
              <div key={i} className="bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-md transition-shadow group cursor-pointer">
                <div className="h-2 bg-gradient-to-r from-[#011B5E] to-[#0a2d8f]" />
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs bg-blue-50 text-blue-700 border border-blue-100 px-2 py-0.5 rounded-full font-medium">{item.tag}</span>
                    <span className="text-xs text-gray-400">{item.date}</span>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2 leading-snug group-hover:text-[#011B5E] transition-colors">{item.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{item.excerpt}</p>
                  <div className="mt-4 flex items-center gap-1 text-xs text-[#011B5E] font-medium">
                    Read more <ChevronRight size={12} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Strip */}
      <section className="py-16 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid sm:grid-cols-3 gap-8">
            {[
              { icon: Phone, label: 'Helpline', value: '1660-01-00001', sub: 'Toll-free · 24/7' },
              { icon: Mail, label: 'Email', value: 'info@rbb.com.np', sub: 'General enquiries' },
              { icon: MapPin, label: 'Head Office', value: 'New Road, Kathmandu', sub: 'Nepal' },
            ].map((c) => (
              <div key={c.label} className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center flex-shrink-0">
                  <c.icon size={20} className="text-[#011B5E]" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-medium">{c.label}</p>
                  <p className="font-semibold text-gray-900">{c.value}</p>
                  <p className="text-xs text-gray-400">{c.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#011B5E] text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-10">
            <div className="lg:col-span-1">
              <RBBLogo inverted className="mb-4" />
              <p className="text-sm text-blue-200 leading-relaxed">
                Rastriya Banijya Bank — Nepal's premier government-owned commercial bank, serving the nation since 1966.
              </p>
              <div className="flex gap-3 mt-4">
                {['f', 't', 'in', 'yt'].map((s) => (
                  <div key={s} className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center text-xs cursor-pointer hover:bg-white/20 transition-colors font-medium">
                    {s}
                  </div>
                ))}
              </div>
            </div>
            {[
              {
                title: 'Personal Banking',
                links: ['Savings Account', 'Home Loan', 'Vehicle Loan', 'Debit Card', 'Mobile Banking'],
              },
              {
                title: 'Corporate Banking',
                links: ['Business Loan', 'Trade Finance', 'Treasury', 'Bancassurance', 'Letter of Credit'],
              },
              {
                title: 'Quick Links',
                links: ['About RBB', 'Branch Locator', 'ATM Locator', 'Interest Rates', 'Staff Login'],
              },
            ].map((col) => (
              <div key={col.title}>
                <h4 className="text-sm font-semibold mb-4">{col.title}</h4>
                <ul className="space-y-2">
                  {col.links.map((link) => (
                    <li key={link}>
                      <a href="#" className="text-sm text-blue-200 hover:text-white transition-colors">{link}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-blue-300">
              © 2025 Rastriya Banijya Bank Ltd. All rights reserved. Regulated by Nepal Rastra Bank.
            </p>
            <div className="flex gap-4">
              {['Privacy Policy', 'Terms of Use', 'Sitemap'].map((l) => (
                <a key={l} href="#" className="text-xs text-blue-300 hover:text-white transition-colors">{l}</a>
              ))}
            </div>
          </div>
        </div>
      </footer>

      {/* RBB Sathi Chatbot */}
      <ChatWidget />
    </div>
  );
}

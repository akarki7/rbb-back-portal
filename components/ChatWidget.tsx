'use client';

import { useState, useRef, useEffect, KeyboardEvent } from 'react';
import { MessageCircle, X, Send, Bot, ChevronDown } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const QUICK_PROMPTS = [
  'Check my account balance',
  'Show recent transactions',
  'Loan repayment status',
  'Lodge a complaint',
];

// Returns an instant fake reply for common banking queries.
// If the message doesn't match, returns null (falls back to API).
function getFakeReply(msg: string): string | null {
  const m = msg.toLowerCase().trim();

  // Greetings
  if (/^(hi|hello|hey|namaste|namaskar|good\s*(morning|afternoon|evening))/.test(m)) {
    return 'Namaste! 🙏 Welcome to RBB Sathi. How can I assist you today?\n\nYou can ask me about your **account balance**, **recent transactions**, **loan status**, or **lodge a complaint**.';
  }

  // Balance
  if (m.includes('balance') || m.includes('account') || m.includes('check my account')) {
    const today = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
    return `Here is your account summary as of **${today}**:\n\n**Savings Account** (No. 00101-010-0123456)\nAvailable Balance: **NPR 45,230.75**\nStatus: Active ✅\n\n**Current Account** (No. 00101-020-0789012)\nAvailable Balance: **NPR 1,23,500.00**\nStatus: Active ✅\n\nFor full account details, please visit your nearest RBB branch or use **Internet Banking** at ibk.rbb.com.np.`;
  }

  // Transactions
  if (m.includes('transaction') || m.includes('history') || m.includes('recent') || m.includes('statement')) {
    return `Your **last 5 transactions** (Savings Account):\n\n1. **20 Feb 2025** · Salary Credit · +NPR 85,000.00\n2. **18 Feb 2025** · ATM Withdrawal, Thamel · -NPR 10,000.00\n3. **15 Feb 2025** · NEA Electricity Bill · -NPR 2,300.00\n4. **12 Feb 2025** · IME Remittance Sent · -NPR 15,000.00\n5. **10 Feb 2025** · FD Maturity Credit · +NPR 52,500.00\n\nFor a full statement, visit **Internet Banking** or request at your branch.`;
  }

  // Loan
  if (m.includes('loan') || m.includes('emi') || m.includes('repayment') || m.includes('credit')) {
    return `Your **active loan accounts**:\n\n🏠 **Home Loan** (HL-2021-0847)\n• Original Amount: NPR 25,00,000\n• Outstanding: NPR 10,00,000\n• Repaid: **60%** ████████░░\n• EMI: NPR 21,500/month\n• Next Due: **15 March 2025**\n\n💳 **Personal Loan** (PL-2023-1234)\n• Original Amount: NPR 3,00,000\n• Outstanding: NPR 2,25,000\n• Repaid: **25%** ███░░░░░░░\n• EMI: NPR 8,500/month\n• Next Due: **5 March 2025**\n\nTo pre-pay or restructure, please visit your branch.`;
  }

  // Complaint
  if (m.includes('complaint') || m.includes('lodge') || m.includes('report') || m.includes('issue') || m.includes('problem') || m.includes('wrong') || m.includes('error')) {
    const ticketNum = Math.floor(10000 + Math.random() * 90000);
    const now = new Date();
    const dateStr = now.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
    return `Your complaint has been **registered successfully**! ✅\n\n**Ticket No:** RBB-COMP-2025-${ticketNum}\n**Date:** ${dateStr}\n**Priority:** Standard\n**Status:** Open 🟡\n\nOur team will review your complaint within **3 business days**. You will receive an SMS update on your registered mobile number.\n\nFor urgent matters, please call **1660-01-00001** (Toll-free, 24/7).`;
  }

  // Thank you
  if (/thank|thanks|shukriya|dhanyabad/.test(m)) {
    return 'You are most welcome! 😊 Is there anything else I can help you with today?\n\nRemember, RBB is always here for you — **1660-01-00001** (24/7 helpline).';
  }

  // ATM
  if (m.includes('atm') || m.includes('cash')) {
    return 'Your **nearest RBB ATMs**:\n\n📍 New Road, Kathmandu — 0.3 km · **Online** ✅\n📍 Thamel — 0.8 km · **Online** ✅\n📍 Chabahil — 1.2 km · **Online** ✅\n\nAll RBB ATMs are available 24/7. Daily withdrawal limit: **NPR 50,000**.\n\nFor more ATM locations, use the **RBB Branch Locator** on our website.';
  }

  // Interest rate
  if (m.includes('interest') || m.includes('rate') || m.includes('fd') || m.includes('fixed deposit')) {
    return 'Current **RBB Interest Rates** (effective Feb 2025):\n\n**Savings Account:** 5.5% p.a.\n**Fixed Deposit:**\n• 3 months: 7.25% p.a.\n• 6 months: 8.50% p.a.\n• 1 year: 9.75% p.a.\n• 2 years: 10.25% p.a.\n\n**Home Loan:** Starting from 9.99% p.a.\n**Personal Loan:** Starting from 14.5% p.a.\n\nRates are subject to change. Contact your branch for the latest rates.';
  }

  return null; // No local match — will call the API
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content:
        'Namaste! 🙏 I am **RBB Sathi**, your AI banking assistant. How can I help you today?\n\nYou can ask me about:\n• Account balance\n• Transaction history\n• Loan status\n• Lodge a complaint',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  const sendMessage = async (content?: string) => {
    const text = content ?? inputValue;
    if (!text.trim() || isLoading) return;

    const userMessage: Message = {
      role: 'user',
      content: text.trim(),
      timestamp: new Date(),
    };

    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInputValue('');
    setIsLoading(true);

    // Check for local fake reply first (instant, no API needed)
    const localReply = getFakeReply(text.trim());
    if (localReply) {
      // Simulate a short typing delay so it feels natural
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          { role: 'assistant', content: localReply, timestamp: new Date() },
        ]);
        setIsLoading(false);
      }, 700);
      return;
    }

    // Fallback: call the Claude API for unrecognised queries
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: updatedMessages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content:
            data.message ||
            'Sorry, I could not process your request. Please try again.',
          timestamp: new Date(),
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content:
            'I apologize for the inconvenience. Please try again or call our helpline at **1660-01-00001**.',
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const formatTime = (d: Date) =>
    d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  const renderContent = (text: string) => {
    // Simple markdown-like rendering for bold and bullet points
    return text.split('\n').map((line, i) => {
      const parts = line.split(/\*\*(.*?)\*\*/g);
      return (
        <span key={i}>
          {parts.map((part, j) =>
            j % 2 === 1 ? (
              <strong key={j}>{part}</strong>
            ) : (
              <span key={j}>{part}</span>
            )
          )}
          {i < text.split('\n').length - 1 && <br />}
        </span>
      );
    });
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Chat Panel */}
      {isOpen && (
        <div className="mb-3 w-[380px] bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden flex flex-col animate-fade-in"
             style={{ height: '520px' }}>
          {/* Header */}
          <div className="bg-[#011B5E] text-white px-4 py-3 flex items-center justify-between flex-shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-white/15 rounded-full flex items-center justify-center border border-white/20">
                <Bot size={18} />
              </div>
              <div>
                <p className="font-semibold text-sm">RBB Sathi</p>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
                  <p className="text-xs text-blue-200">AI Assistant · Online</p>
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="hover:bg-white/20 rounded-lg p-1.5 transition-colors"
            >
              <ChevronDown size={18} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} message-animate`}
              >
                {msg.role === 'assistant' && (
                  <div className="w-7 h-7 bg-[#011B5E] rounded-full flex items-center justify-center mr-2 flex-shrink-0 mt-1">
                    <Bot size={14} className="text-white" />
                  </div>
                )}
                <div
                  className={`max-w-[78%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-[#011B5E] text-white rounded-br-sm'
                      : 'bg-white text-gray-800 shadow-sm border border-gray-100 rounded-bl-sm'
                  }`}
                >
                  <div>{renderContent(msg.content)}</div>
                  <p
                    className={`text-[10px] mt-1.5 ${
                      msg.role === 'user' ? 'text-blue-200 text-right' : 'text-gray-400'
                    }`}
                  >
                    {formatTime(msg.timestamp)}
                  </p>
                </div>
              </div>
            ))}

            {/* Typing indicator */}
            {isLoading && (
              <div className="flex justify-start message-animate">
                <div className="w-7 h-7 bg-[#011B5E] rounded-full flex items-center justify-center mr-2 flex-shrink-0 mt-1">
                  <Bot size={14} className="text-white" />
                </div>
                <div className="bg-white rounded-2xl rounded-bl-sm px-4 py-3 shadow-sm border border-gray-100">
                  <div className="flex gap-1 items-center h-4">
                    <span className="typing-dot w-2 h-2 bg-[#011B5E]/40 rounded-full" />
                    <span className="typing-dot w-2 h-2 bg-[#011B5E]/40 rounded-full" />
                    <span className="typing-dot w-2 h-2 bg-[#011B5E]/40 rounded-full" />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick prompts */}
          {messages.length <= 1 && !isLoading && (
            <div className="px-3 pb-2 flex flex-wrap gap-1.5 bg-slate-50 flex-shrink-0">
              {QUICK_PROMPTS.map((p) => (
                <button
                  key={p}
                  onClick={() => sendMessage(p)}
                  className="text-xs bg-white border border-[#011B5E]/20 text-[#011B5E] rounded-full px-3 py-1 hover:bg-[#011B5E] hover:text-white transition-colors"
                >
                  {p}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div className="p-3 bg-white border-t border-gray-100 flex-shrink-0">
            <div className="flex gap-2 items-center">
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about your account..."
                className="flex-1 border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#011B5E]/30 focus:border-[#011B5E] transition-all"
                disabled={isLoading}
              />
              <button
                onClick={() => sendMessage()}
                disabled={isLoading || !inputValue.trim()}
                className="w-10 h-10 bg-[#011B5E] text-white rounded-xl flex items-center justify-center disabled:opacity-40 hover:bg-[#0a2d8f] transition-colors flex-shrink-0"
              >
                <Send size={16} />
              </button>
            </div>
            <p className="text-[10px] text-gray-400 mt-1.5 text-center">
              Powered by Claude AI · RBB Sathi
            </p>
          </div>
        </div>
      )}

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-[#011B5E] text-white rounded-full shadow-xl flex items-center justify-center hover:bg-[#0a2d8f] transition-all hover:scale-105 active:scale-95"
        aria-label="Open RBB Sathi chat"
      >
        {isOpen ? <X size={22} /> : <MessageCircle size={22} />}
      </button>
      {!isOpen && (
        <span className="mt-1.5 text-xs font-medium text-[#011B5E] bg-white px-2 py-0.5 rounded-full shadow border border-gray-100">
          RBB Sathi
        </span>
      )}
    </div>
  );
}

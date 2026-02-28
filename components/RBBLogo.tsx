'use client';

import { useState } from 'react';

interface RBBLogoProps {
  /** true = dark background (sidebar/login) — renders reliable text badge */
  inverted?: boolean;
  height?: string;
  className?: string;
}

/**
 * Tries to load the official RBB logo image.
 * On dark backgrounds (inverted=true) we skip the filter approach entirely
 * and render a crisp text badge that always looks correct.
 * On light backgrounds we try the image with a text fallback on error.
 */
export default function RBBLogo({ inverted = false, height = 'h-10', className = '' }: RBBLogoProps) {
  const [failed, setFailed] = useState(false);

  // On dark backgrounds — CSS brightness-0+invert breaks if the source PNG
  // has a white background. Always use the styled text badge here.
  if (inverted) {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        <div className="bg-white text-[#011B5E] font-black text-xs px-2.5 py-1 rounded-md tracking-widest leading-none">
          RBB
        </div>
        <div>
          <p className="text-white font-semibold text-xs leading-tight">Rastriya Banijya Bank</p>
          <p className="text-blue-300 text-[9px] leading-tight">Nepal's Trusted Bank</p>
        </div>
      </div>
    );
  }

  // On light backgrounds — try the real image, fall back to dark-on-light badge.
  if (failed) {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        <div className="bg-[#011B5E] text-white font-black text-xs px-2.5 py-1 rounded-md tracking-widest leading-none">
          RBB
        </div>
        <div>
          <p className="text-[#011B5E] font-bold text-sm leading-tight">Rastriya Banijya Bank</p>
          <p className="text-gray-400 text-[10px] leading-tight">Nepal's Trusted Bank</p>
        </div>
      </div>
    );
  }

  return (
    <img
      src="https://www.rbb.com.np/uploads/config/1731390437-339067.png"
      alt="Rastriya Banijya Bank"
      className={`${height} object-contain ${className}`}
      onError={() => setFailed(true)}
      referrerPolicy="no-referrer"
    />
  );
}

'use client';

import { useState } from 'react';

interface RBBLogoProps {
  /**
   * inverted=true → dark background (sidebar, login header).
   * Wraps the logo in a white rounded container so it stays readable.
   * inverted=false → light background, logo rendered directly.
   */
  inverted?: boolean;
  /** Tailwind height class when on a light background, e.g. "h-10" */
  height?: string;
  /** Max-width on dark bg container, e.g. "160px" */
  maxWidth?: string;
  className?: string;
}

export default function RBBLogo({
  inverted = false,
  height = 'h-10',
  maxWidth = '160px',
  className = '',
}: RBBLogoProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    // Plain text fallback
    return (
      <div
        className={`font-black text-xs px-3 py-1.5 rounded-lg tracking-widest ${
          inverted ? 'bg-white text-[#011B5E]' : 'bg-[#011B5E] text-white'
        } ${className}`}
      >
        RBB
      </div>
    );
  }

  if (inverted) {
    // On dark backgrounds: show the full-colour logo inside a white pill
    return (
      <div
        className={`bg-white rounded-lg px-2 py-1.5 flex items-center justify-center ${className}`}
        style={{ maxWidth }}
      >
        <img
          src="/rbb-logo.png"
          alt="Rastriya Banijya Bank"
          className="w-full object-contain"
          style={{ maxHeight: '44px' }}
          onError={() => setFailed(true)}
        />
      </div>
    );
  }

  // Light background: render directly
  return (
    <img
      src="/rbb-logo.png"
      alt="Rastriya Banijya Bank"
      className={`${height} object-contain ${className}`}
      onError={() => setFailed(true)}
    />
  );
}

import React from "react";

interface IstLogoProps {
  className?: string;
  showIso?: boolean;
}

export function IstLogo({ className = "", showIso = true }: IstLogoProps) {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <div className="flex items-center gap-3">
        {/* SVG representation of the IST Circular Symbol */}
        <svg
          width="44"
          height="44"
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="shrink-0"
        >
          {/* Circular outer ring */}
          <circle
            cx="50"
            cy="50"
            r="46"
            stroke="url(#istGrad)"
            strokeWidth="3"
            fill="#0F172A"
          />
          {/* Blue gradient fill */}
          <circle cx="50" cy="50" r="41" fill="url(#istBlueBg)" />
          
          {/* Stylized Globe/Grid Lines (thin cyan lines) */}
          <path
            d="M50 9A41 41 0 0 1 91 50M9 50A41 41 0 0 1 50 91"
            stroke="#5BA829"
            strokeWidth="1"
            strokeOpacity="0.3"
            strokeDasharray="2 2"
          />
          <path
            d="M50 9c15 10 15 67 0 82"
            stroke="#5BA829"
            strokeWidth="1"
            strokeOpacity="0.2"
          />
          
          {/* Globe/Swoosh element (greenish gradient path) */}
          <path
            d="M25 55 C 35 30, 65 30, 75 55 C 65 80, 35 80, 25 55 Z"
            fill="url(#istSwooshGrad)"
            opacity="0.35"
          />
          
          {/* Main White Checkmark/V-shape */}
          <path
            d="M32 50 L45 62 L70 34"
            stroke="#FFFFFF"
            strokeWidth="7"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#shadow)"
          />
          
          {/* Yellow/Gold Accent Star or Diamond */}
          <path
            d="M48 22 L51 27 L56 28 L52 32 L53 37 L48 34 L43 37 L44 32 L40 28 L45 27 Z"
            fill="#F59E0B"
          />
          
          <defs>
            <linearGradient id="istGrad" x1="0" y1="0" x2="100" y2="100">
              <stop offset="0%" stopColor="#5BA829" />
              <stop offset="100%" stopColor="#8CE036" />
            </linearGradient>
            <linearGradient id="istBlueBg" x1="10" y1="10" x2="90" y2="90">
              <stop offset="0%" stopColor="#1E3A8A" />
              <stop offset="50%" stopColor="#1E40AF" />
              <stop offset="100%" stopColor="#0F172A" />
            </linearGradient>
            <linearGradient id="istSwooshGrad" x1="25" y1="55" x2="75" y2="55">
              <stop offset="0%" stopColor="#8CE036" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#5BA829" stopOpacity="0.2" />
            </linearGradient>
            <filter id="shadow" x="20" y="25" width="60" height="50" filterUnits="userSpaceOnUse">
              <feDropShadow dx="1" dy="2" stdDeviation="2" floodColor="#000000" floodOpacity="0.5" />
            </filter>
          </defs>
        </svg>

        {/* Text Part of the Logo: IST */}
        <div className="flex flex-col justify-center select-none">
          <div className="flex items-baseline gap-1">
            <span className="font-display font-extrabold text-3xl tracking-tight text-white">
              IST
            </span>
          </div>
          {/* Horizontal line */}
          <div className="h-[2px] w-24 bg-gradient-to-r from-[#5BA829] to-transparent mt-0.5" />
          {/* Small subtitle */}
          <span className="text-[7.5px] font-semibold tracking-[0.2em] text-[#8CE036] uppercase mt-1">
            iSpatial Techno Solutions
          </span>
        </div>
      </div>

      {showIso && (
        <div className="mt-1 font-serif text-sm font-semibold tracking-wide text-white/90">
          ISO 14001:2015
        </div>
      )}
    </div>
  );
}

import React from 'react';
import { VehicleType } from '../types/rental';

interface VehicleGraphicProps {
  type: VehicleType;
  brand: string;
  model: string;
  color?: string;
  className?: string;
}

export const VehicleGraphic: React.FC<VehicleGraphicProps> = ({
  type,
  brand,
  model,
  className = 'h-36'
}) => {
  // Theme gradients based on vehicle type
  const getGradient = () => {
    switch (type) {
      case 'Car':
        return 'from-blue-900 via-slate-900 to-indigo-950';
      case 'Bike':
        return 'from-amber-950 via-stone-900 to-orange-950';
      case 'Van':
        return 'from-emerald-950 via-slate-900 to-teal-950';
      case 'SUV':
        return 'from-cyan-950 via-slate-900 to-slate-950';
      default:
        return 'from-slate-900 to-indigo-950';
    }
  };

  const getAccentColor = () => {
    switch (type) {
      case 'Car': return '#60a5fa';
      case 'Bike': return '#f59e0b';
      case 'Van': return '#34d399';
      case 'SUV': return '#38bdf8';
    }
  };

  return (
    <div
      className={`relative w-full rounded-xl overflow-hidden bg-gradient-to-br ${getGradient()} flex items-center justify-center p-4 border border-slate-800/80 shadow-inner group ${className}`}
    >
      {/* Background architectural grid pattern */}
      <div 
        className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]"
      />

      {/* Automotive technical silhouette SVG */}
      <div className="relative z-10 w-full max-w-[240px] flex flex-col items-center justify-center text-center">
        {type === 'Car' && (
          <svg
            className="w-40 h-20 text-slate-200 transition-transform duration-300 group-hover:scale-105"
            viewBox="0 0 240 100"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {/* Sedan car silhouette outline */}
            <path d="M20 70 L40 70 M70 70 L170 70 M200 70 L220 70" stroke={getAccentColor()} strokeWidth="3" />
            <path d="M20 70 C20 58 32 55 45 55 L75 55 L105 28 C112 24 125 24 175 24 L195 55 L215 55 C225 55 230 62 230 70" />
            <circle cx="55" cy="70" r="15" stroke="currentColor" fill="#1e293b" strokeWidth="3" />
            <circle cx="55" cy="70" r="6" fill={getAccentColor()} />
            <circle cx="185" cy="70" r="15" stroke="currentColor" fill="#1e293b" strokeWidth="3" />
            <circle cx="185" cy="70" r="6" fill={getAccentColor()} />
            {/* Windows */}
            <path d="M85 52 L110 32 L150 32 L150 52 Z" fill="rgba(255,255,255,0.08)" stroke="currentColor" strokeWidth="1.5" />
            <path d="M156 52 L156 32 L175 32 L190 52 Z" fill="rgba(255,255,255,0.08)" stroke="currentColor" strokeWidth="1.5" />
            {/* Headlight beam */}
            <path d="M228 60 L240 60" stroke="#fef08a" strokeWidth="3" strokeLinecap="round" />
          </svg>
        )}

        {type === 'Bike' && (
          <svg
            className="w-36 h-20 text-slate-200 transition-transform duration-300 group-hover:scale-105"
            viewBox="0 0 240 120"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {/* Motorcycle wheels */}
            <circle cx="45" cy="85" r="22" stroke="currentColor" fill="#1e293b" strokeWidth="3" />
            <circle cx="45" cy="85" r="9" fill={getAccentColor()} />
            <circle cx="195" cy="85" r="22" stroke="currentColor" fill="#1e293b" strokeWidth="3" />
            <circle cx="195" cy="85" r="9" fill={getAccentColor()} />
            {/* Frame & Engine */}
            <path d="M45 85 L95 85 L135 60 L80 60 Z" fill="rgba(255,255,255,0.05)" />
            <path d="M95 85 L145 85 L170 50 L135 50" />
            <path d="M170 50 L195 85" strokeWidth="3" />
            <path d="M170 50 L160 30 L180 30" stroke={getAccentColor()} strokeWidth="3" />
            {/* Seat & Tank */}
            <path d="M100 50 C110 40 135 40 155 48" stroke="#ffffff" strokeWidth="4" />
            {/* Exhaust */}
            <path d="M120 90 L180 90 L200 82" stroke="#94a3b8" strokeWidth="2.5" />
          </svg>
        )}

        {type === 'Van' && (
          <svg
            className="w-44 h-20 text-slate-200 transition-transform duration-300 group-hover:scale-105"
            viewBox="0 0 240 100"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {/* Commercial passenger van silhouette */}
            <path d="M20 70 L45 70 M75 70 L175 70 M205 70 L225 70" stroke={getAccentColor()} strokeWidth="3" />
            <path d="M20 70 L20 35 C20 28 26 25 35 25 L180 25 C195 25 210 38 220 52 L225 70" />
            <circle cx="60" cy="70" r="15" stroke="currentColor" fill="#1e293b" strokeWidth="3" />
            <circle cx="60" cy="70" r="6" fill={getAccentColor()} />
            <circle cx="190" cy="70" r="15" stroke="currentColor" fill="#1e293b" strokeWidth="3" />
            <circle cx="190" cy="70" r="6" fill={getAccentColor()} />
            {/* Windows sequence */}
            <path d="M35 32 H70 V50 H35 Z" fill="rgba(255,255,255,0.08)" stroke="currentColor" strokeWidth="1.5" />
            <path d="M78 32 H120 V50 H78 Z" fill="rgba(255,255,255,0.08)" stroke="currentColor" strokeWidth="1.5" />
            <path d="M128 32 H170 V50 H128 Z" fill="rgba(255,255,255,0.08)" stroke="currentColor" strokeWidth="1.5" />
            <path d="M178 32 H198 L212 50 H178 Z" fill="rgba(255,255,255,0.08)" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        )}

        {type === 'SUV' && (
          <svg
            className="w-42 h-20 text-slate-200 transition-transform duration-300 group-hover:scale-105"
            viewBox="0 0 240 100"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {/* SUV silhouette */}
            <path d="M15 70 L40 70 M75 70 L170 70 M205 70 L228 70" stroke={getAccentColor()} strokeWidth="3" />
            <path d="M15 70 C15 50 25 45 40 45 L70 45 L95 22 C102 18 120 18 185 18 L210 45 L228 48 C232 55 232 65 228 70" />
            <circle cx="58" cy="70" r="16" stroke="currentColor" fill="#1e293b" strokeWidth="3" />
            <circle cx="58" cy="70" r="6" fill={getAccentColor()} />
            <circle cx="188" cy="70" r="16" stroke="currentColor" fill="#1e293b" strokeWidth="3" />
            <circle cx="188" cy="70" r="6" fill={getAccentColor()} />
            {/* Roof rails */}
            <path d="M100 15 L180 15" stroke="#94a3b8" strokeWidth="2" />
            {/* Windows */}
            <path d="M80 42 L100 24 L145 24 L145 42 Z" fill="rgba(255,255,255,0.08)" stroke="currentColor" strokeWidth="1.5" />
            <path d="M152 42 L152 24 L180 24 L198 42 Z" fill="rgba(255,255,255,0.08)" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        )}
      </div>

      {/* Model tag in bottom right */}
      <div className="absolute bottom-2 right-3 text-[11px] font-mono font-medium text-slate-400">
        {brand} {model}
      </div>
    </div>
  );
};

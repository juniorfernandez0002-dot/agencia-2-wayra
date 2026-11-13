import React, { useRef } from 'react';
import { Compass } from 'lucide-react';

export type TransitionKind =
  | 'papercut-tide'
  | 'route-slope'
  | 'horizon-arch'
  | 'ticker-terrace'
  | 'andes-peaks';

interface SectionTransitionProps {
  kind: TransitionKind;
  topColor: string;
  bottomColor: string;
  midColors?: [string, string];
}

export const SectionTransition: React.FC<SectionTransitionProps> = ({
  kind,
  topColor,
  bottomColor,
  midColors = ['#FFE6CE', '#D2EFE5']
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  if (kind === 'papercut-tide') {
    return (
      <div
        ref={containerRef}
        aria-hidden="true"
        style={{ backgroundColor: topColor }}
        className="relative w-full overflow-hidden leading-none select-none -my-px"
      >
        {/* Pure lightweight GPU vector layers with crisp subtle edge highlight (zero expensive CPU Gaussian blur) */}
        <svg
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
          className="block w-full h-12 sm:h-20 lg:h-24"
        >
          <path
            d="M0,20 C240,100 480,14 780,58 C1080,100 1280,22 1440,48 L1440,125 L0,125 Z"
            fill={midColors[0]}
            stroke="rgba(22,42,34,0.05)"
            strokeWidth="1.5"
          />
          <path
            d="M0,54 C280,16 540,104 860,52 C1140,8 1320,82 1440,46 L1440,125 L0,125 Z"
            fill={midColors[1]}
            stroke="rgba(22,42,34,0.06)"
            strokeWidth="1.5"
          />
          <path
            d="M0,86 C320,46 650,114 980,76 C1190,52 1340,92 1440,78 L1440,125 L0,125 Z"
            fill={bottomColor}
            stroke="rgba(22,42,34,0.06)"
            strokeWidth="1.5"
          />
        </svg>
      </div>
    );
  }

  if (kind === 'route-slope') {
    return (
      <div
        ref={containerRef}
        aria-hidden="true"
        style={{ backgroundColor: topColor }}
        className="relative w-full overflow-hidden leading-none select-none -my-px"
      >
        <svg
          viewBox="0 0 1440 96"
          preserveAspectRatio="none"
          className="block w-full h-12 sm:h-18 lg:h-20"
        >
          <polygon points="0,78 1440,14 1440,100 0,100" fill={bottomColor} />
          <path
            d="M0,84 Q720,40 1440,18"
            fill="none"
            stroke="#F26430"
            strokeWidth="2.5"
            strokeDasharray="7 9"
            strokeOpacity="0.6"
          />
        </svg>
        <div className="hidden sm:flex items-center justify-center w-8 h-8 rounded-full bg-white border-2 border-[#F26430] text-[#F26430] shadow-sm absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <Compass className="w-4 h-4" />
        </div>
      </div>
    );
  }

  if (kind === 'horizon-arch') {
    return (
      <div
        ref={containerRef}
        aria-hidden="true"
        style={{ backgroundColor: topColor }}
        className="relative w-full overflow-hidden leading-none select-none -my-px"
      >
        <svg
          viewBox="0 0 1440 88"
          preserveAspectRatio="none"
          className="block w-full h-10 sm:h-14 lg:h-18"
        >
          <path
            d="M0,72 Q720,-4 1440,72"
            fill="none"
            stroke="#F4A62A"
            strokeWidth="3"
            strokeOpacity="0.45"
          />
          <path d="M0,74 Q720,0 1440,74 L1440,94 L0,94 Z" fill={bottomColor} />
        </svg>
      </div>
    );
  }

  if (kind === 'ticker-terrace') {
    const marqueeWords = [
      'Machu Picchu',
      'Paracas & Ballestas',
      'Vinicunca 5,036 m',
      'Oasis Huacachina',
      'Amazonía Tambopata',
      'Valle Sagrado',
      'Cañón del Colca',
      'Lago Titicaca',
      'Lima Costera'
    ];
    return (
      <div
        ref={containerRef}
        aria-hidden="true"
        style={{ backgroundColor: topColor }}
        className="relative w-full overflow-hidden py-4 select-none"
      >
        <div
          style={{ backgroundColor: bottomColor }}
          className="absolute inset-x-0 bottom-0 h-1/2"
        />
        <div className="relative z-10 bg-[#162A22] text-[#FFFDF8] py-2.5 sm:py-3 -rotate-[0.6deg] scale-[1.02] shadow-sm border-y border-[#F4A62A]/40 overflow-hidden flex">
          <div className="animate-wayra-marquee flex items-center gap-8 whitespace-nowrap pr-8 font-display text-xs sm:text-base font-bold tracking-wide">
            {[...marqueeWords, ...marqueeWords].map((word, idx) => (
              <span key={idx} className="inline-flex items-center gap-6">
                <span className={idx % 2 === 0 ? 'text-[#F4A62A]' : 'text-[#FFFDF8]'}>
                  {word}
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#F26430]" />
              </span>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // 'andes-peaks'
  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      style={{ backgroundColor: topColor }}
      className="relative w-full overflow-hidden leading-none select-none -my-px"
    >
      <svg
        viewBox="0 0 1440 124"
        preserveAspectRatio="none"
        className="block w-full h-14 sm:h-20 lg:h-24"
      >
        <path
          d="M0,104 L160,38 L350,80 L590,18 L840,74 L1090,26 L1310,70 L1440,42 L1440,130 L0,130 Z"
          fill={midColors[0]}
          stroke="rgba(22,42,34,0.06)"
          strokeWidth="1.5"
        />
        <path
          d="M0,114 L220,58 L460,92 L720,42 L980,88 L1240,48 L1440,80 L1440,130 L0,130 Z"
          fill={midColors[1]}
          stroke="rgba(22,42,34,0.08)"
          strokeWidth="1.5"
        />
        <path
          d="M0,122 L170,88 L400,112 L660,70 L930,108 L1190,78 L1440,104 L1440,130 L0,130 Z"
          fill={bottomColor}
        />
      </svg>
    </div>
  );
};

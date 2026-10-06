import React from 'react';

interface RiyadhEmblemProps {
  customLogoUrl?: string;
  size?: number; // default 82
  className?: string;
}

export const RiyadhEmblem: React.FC<RiyadhEmblemProps> = ({
  customLogoUrl,
  size = 82,
  className = '',
}) => {
  if (customLogoUrl) {
    return (
      <div
        style={{ width: `${size}px`, height: `${size}px` }}
        className={`rounded-full overflow-hidden bg-white shadow-md border-2 border-white flex items-center justify-center ${className}`}
      >
        <img
          src={customLogoUrl}
          alt="Municipality Emblem"
          className="w-full h-full object-cover"
        />
      </div>
    );
  }

  return (
    <div
      style={{ width: `${size}px`, height: `${size}px` }}
      className={`rounded-full overflow-hidden shadow-md border-[2.5px] border-white select-none ${className}`}
      title="أمانة منطقة الرياض - Riyadh Municipality"
    >
      <svg
        viewBox="0 0 100 100"
        width="100%"
        height="100%"
        className="w-full h-full block"
      >
        <defs>
          {/* Top half clip */}
          <clipPath id="topHalf">
            <rect x="0" y="0" width="100" height="52" />
          </clipPath>
          {/* Bottom half clip */}
          <clipPath id="bottomHalf">
            <rect x="0" y="52" width="100" height="48" />
          </clipPath>
        </defs>

        {/* Outer Background Base */}
        <circle cx="50" cy="50" r="49" fill="#005a32" />

        {/* Top Half: Light Sky Blue */}
        <g clipPath="url(#topHalf)">
          <circle cx="50" cy="50" r="49" fill="#589db8" />

          {/* White Traditional Masmak Fortress / Castle Vector */}
          {/* Main Castle base & walls */}
          <path
            d="M 22 49 L 22 28 L 27 28 L 27 31 L 32 31 L 32 28 L 37 28 L 37 32 L 63 32 L 63 28 L 68 28 L 68 31 L 73 31 L 73 28 L 78 28 L 78 49 Z"
            fill="#ffffff"
          />
          {/* Watchtower Battlements details */}
          <rect x="25" y="34" width="3" height="6" fill="#589db8" rx="1" />
          <rect x="72" y="34" width="3" height="6" fill="#589db8" rx="1" />
          <rect x="47" y="38" width="6" height="11" fill="#589db8" rx="2" />
          <polygon points="50,35 45,41 55,41" fill="#ffffff" />

          {/* Central Palm Tree above fortress */}
          {/* Trunk */}
          <path
            d="M 48.5 28 Q 50 20 50 14 Q 50 20 51.5 28 Z"
            fill="#005a32"
          />
          {/* Palm Fronds */}
          <path
            d="M 50 14 C 44 11 38 14 36 17 C 41 16 46 17 50 19"
            fill="none"
            stroke="#005a32"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          <path
            d="M 50 14 C 56 11 62 14 64 17 C 59 16 54 17 50 19"
            fill="none"
            stroke="#005a32"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          <path
            d="M 50 13 C 45 8 41 9 40 12 C 44 11 47 13 50 15"
            fill="none"
            stroke="#005a32"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <path
            d="M 50 13 C 55 8 59 9 60 12 C 56 11 53 13 50 15"
            fill="none"
            stroke="#005a32"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <path
            d="M 50 13 C 50 7 50 6 50 5 C 50 7 50 10 50 13"
            fill="none"
            stroke="#005a32"
            strokeWidth="1.5"
            strokeLinecap="round"
          />

          {/* Crossed Scimitar Swords */}
          <path
            d="M 40 25 Q 50 22 58 20"
            stroke="#c8a646"
            strokeWidth="1.2"
            fill="none"
          />
          <path
            d="M 60 25 Q 50 22 42 20"
            stroke="#c8a646"
            strokeWidth="1.2"
            fill="none"
          />
        </g>

        {/* Dividing Gold / White Arch Line */}
        <line
          x1="6"
          y1="51.5"
          x2="94"
          y2="51.5"
          stroke="#ffffff"
          strokeWidth="1.5"
        />

        {/* Bottom Half: Dark Green with Authentic Calligraphy "الرياض" */}
        <g clipPath="url(#bottomHalf)">
          <circle cx="50" cy="50" r="49" fill="#005a32" />

          {/* Decorative curved golden arch under text */}
          <path
            d="M 18 80 Q 50 94 82 80"
            fill="none"
            stroke="#d4af37"
            strokeWidth="1"
            opacity="0.75"
          />

          {/* White Calligraphy 'الرياض' */}
          <text
            x="50"
            y="74"
            textAnchor="middle"
            fill="#ffffff"
            fontSize="21"
            fontWeight="bold"
            fontFamily="'Cairo', 'Almarai', Arial, sans-serif"
            letterSpacing="1"
          >
            الرياض
          </text>

          {/* Small sub-text or decorative dots */}
          <circle cx="41" cy="59" r="1.3" fill="#ffffff" />
          <circle cx="58" cy="59" r="1.3" fill="#ffffff" />
          <circle cx="61" cy="59" r="1.3" fill="#ffffff" />
        </g>

        {/* Inner thin gold decorative ring */}
        <circle
          cx="50"
          cy="50"
          r="46.5"
          fill="none"
          stroke="#d4af37"
          strokeWidth="0.8"
          opacity="0.8"
        />
      </svg>
    </div>
  );
};

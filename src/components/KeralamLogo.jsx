import { useId } from 'react';
import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from 'remotion';

export const LOGO_DURATION = 240;
const gold = '#D4A64A';
const ivory = '#FAF7F0';
const timing = { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.bezier(0.22, 1, 0.36, 1) };
const house = 'M 550 195 L 610 315 L 569 315 L 569 270 L 531 270 L 531 315 L 490 315 Z';

export function LogoArtwork({ frame: elapsedFrame = LOGO_DURATION - 1, caption = 'AAFA COLIVING' }) {
  const frame = elapsedFrame / 1.5;
  const id = useId().replace(/:/g, '');
  return (
    <svg viewBox="0 0 1400 600" width="100%" height="100%" role="img" aria-label="Kerala PG — AAFA Coliving">
      <defs>
        <linearGradient id={`${id}-light`}><stop stopColor={gold} stopOpacity="0"/><stop offset=".5" stopColor="#FFF0BF"/><stop offset="1" stopColor={gold} stopOpacity="0"/></linearGradient>
        <clipPath id={`${id}-house`}><path d={house}/></clipPath>
      </defs>
      <g transform="translate(12 0)">
        <path d={house} fill="none" stroke={gold} strokeWidth="1.5" strokeLinejoin="round" pathLength="1" strokeDasharray="1" strokeDashoffset={interpolate(frame, [0, 40], [1, 0], timing)}/>
        <path d={house} fill={gold} opacity={interpolate(frame, [28, 58], [0, 1], timing)}/>
        <g clipPath={`url(#${id}-house)`} opacity={interpolate(frame, [60, 76, 105], [0, .6, 0], timing)}>
          <rect x={interpolate(frame, [60, 105], [460, 650], timing)} y="180" width="35" height="150" fill={`url(#${id}-light)`}/>
        </g>
        {/* Sized as complete text runs so the house A has equal optical gaps: KER - [House A] - LA   PG */}
        <g fill={ivory} fontFamily="Arial, Helvetica, sans-serif" fontSize="158" fontWeight="400">
          <text x="185" y="315" textLength="290" lengthAdjust="spacingAndGlyphs" style={{ opacity: interpolate(frame, [22, 62], [0, 1], timing), translate: `0px ${interpolate(frame, [22, 62], [18, 0], timing)}px` }}>KER</text>
          <text x="614" y="315" textLength="195" lengthAdjust="spacingAndGlyphs" style={{ opacity: interpolate(frame, [32, 72], [0, 1], timing), translate: `0px ${interpolate(frame, [32, 72], [18, 0], timing)}px` }}>LA</text>
        </g>
        <text x="865" y="315" fill={gold} fontFamily="Arial, Helvetica, sans-serif" fontSize="158" fontWeight="400" textLength="215" lengthAdjust="spacingAndGlyphs" style={{ opacity: interpolate(frame, [48, 82], [0, 1], timing), translate: `0px ${interpolate(frame, [48, 82], [12, 0], timing)}px` }}>PG</text>
        <text x="635" y="382" textAnchor="middle" fill={ivory} fontFamily="Arial, Helvetica, sans-serif" fontSize="25" letterSpacing="9" style={{ opacity: interpolate(frame, [65, 99], [0, 1], timing), translate: `0px ${interpolate(frame, [65, 99], [10, 0], timing)}px` }}>{caption}</text>
      </g>
    </svg>
  );
}

export function LogoAnimation() {
  const frame = useCurrentFrame();
  return <AbsoluteFill style={{ backgroundColor: 'transparent' }}><LogoArtwork frame={frame}/></AbsoluteFill>;
}

export const HOUSE_PATH = house;

/**
 * Signature vector wordmark for KERALA PG where the house path forms the letter 'A' (KER - [House A] - LA   PG)
 */
export function KeralamWordmark({ className = 'h-4 sm:h-5 w-auto' }) {
  return (
    <svg
      viewBox="170 175 950 160"
      className={className}
      role="img"
      aria-label="Kerala PG"
    >
      <g transform="translate(12 0)">
        {/* House 'A' */}
        <path d={house} fill={gold} />
        {/* KER and LA text */}
        <g fill={ivory} fontFamily="Arial, Helvetica, sans-serif" fontSize="158" fontWeight="400">
          <text x="185" y="315" textLength="290" lengthAdjust="spacingAndGlyphs">KER</text>
          <text x="614" y="315" textLength="195" lengthAdjust="spacingAndGlyphs">LA</text>
        </g>
        {/* PG text in gold with refined breathing space */}
        <text
          x="865"
          y="315"
          fill={gold}
          fontFamily="Arial, Helvetica, sans-serif"
          fontSize="158"
          fontWeight="400"
          textLength="215"
          lengthAdjust="spacingAndGlyphs"
        >
          PG
        </text>
      </g>
    </svg>
  );
}

/**
 * Standalone icon mark of the Kerala house 'A'
 */
export function KeralamMark({ className = 'w-4.5 h-4.5' }) {
  return (
    <svg viewBox="485 190 130 130" className={className} fill="none" role="img" aria-hidden="true">
      <path d={house} fill={gold} />
    </svg>
  );
}

/**
 * Header / Navbar Logo Lockup with:
 * - Iconic Kerala house 'A' badge
 * - Signature KERALA PG vector wordmark
 * - Subtitle caption (e.g. "Jigani • Pan-India")
 */
export function KeralamLogo({
  className = '',
  caption = 'Jigani • Pan-India',
  showIcon = true,
  showCaption = true,
  size = 'default', // 'small' | 'default' | 'large'
}) {
  const sizeConfig = {
    small: {
      box: 'w-6.5 h-6.5 rounded-lg',
      icon: 'w-3.5 h-3.5',
      wordmark: 'h-[14px] sm:h-[16px]',
      caption: 'text-[7.5px] sm:text-[8px]',
      gap: 'gap-2',
    },
    default: {
      box: 'w-7.5 h-7.5 sm:w-8 sm:h-8 rounded-xl',
      icon: 'w-4.5 h-4.5 sm:w-5 sm:h-5',
      wordmark: 'h-[16px] sm:h-[19px]',
      caption: 'text-[8.5px] sm:text-[9.5px]',
      gap: 'gap-2.5 sm:gap-3',
    },
    large: {
      box: 'w-9 h-9 sm:w-10 sm:h-10 rounded-xl',
      icon: 'w-5.5 h-5.5 sm:w-6 sm:h-6',
      wordmark: 'h-[20px] sm:h-[24px]',
      caption: 'text-[9.5px] sm:text-[10.5px]',
      gap: 'gap-3 sm:gap-3.5',
    },
  };

  const currentSize = sizeConfig[size] || sizeConfig.default;

  return (
    <div className={`flex items-center ${currentSize.gap} group shrink-0 ${className}`}>
      {showIcon && (
        <div className={`${currentSize.box} bg-gradient-to-br from-[#D4A64A]/25 via-[#D4A64A]/10 to-transparent border border-[#D4A64A]/40 flex items-center justify-center shadow-[0_0_15px_rgba(212,166,74,0.2)] group-hover:border-[#D4A64A] group-hover:shadow-[0_0_20px_rgba(212,166,74,0.45)] group-hover:scale-105 transition-all duration-300 shrink-0`}>
          <KeralamMark className={currentSize.icon} />
        </div>
      )}

      <div className="flex flex-col justify-center">
        <div className="flex items-center">
          <KeralamWordmark className={`${currentSize.wordmark} w-auto transition-transform duration-300 group-hover:scale-[1.02] origin-left`} />
        </div>
        {showCaption && caption && (
          <p className={`${currentSize.caption} text-[#FAF7F0]/60 tracking-wider font-mono uppercase mt-0.5`}>
            {caption}
          </p>
        )}
      </div>
    </div>
  );
}

export const KeralaLogo = KeralamLogo;
export const KeralaWordmark = KeralamWordmark;
export const KeralaMark = KeralamMark;

export default KeralamLogo;





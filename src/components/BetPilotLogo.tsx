'use client'

import { ReactNode } from 'react'
import GlowingText from './GlowingText'

interface BetPilotLogoProps {
  className?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  showTagline?: boolean
}

export default function BetPilotLogo({ 
  className = '', 
  size = 'md',
  showTagline = false
}: BetPilotLogoProps) {
  const sizeClasses = {
    sm: 'text-xl',
    md: 'text-2xl',
    lg: 'text-4xl sm:text-5xl',
    xl: 'text-5xl sm:text-6xl'
  };
  
  return (
    <div className={`${className}`}>
      <GlowingText 
        className={`font-bold tracking-tight ${sizeClasses[size]}`}
        glowColor="rgba(255, 255, 255, 0.7)"
        glowIntensity="medium"
      >
        <span className="text-white">Bet</span><span className="text-blue-500">Pilot</span>
        {showTagline && <span className="text-white text-sm block mt-1">The Future of Smart Betting</span>}
      </GlowingText>
    </div>
  );
}

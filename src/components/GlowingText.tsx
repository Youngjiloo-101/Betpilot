'use client'

import { ReactNode } from 'react'
import { motion } from 'framer-motion'

interface GlowingTextProps {
  children: ReactNode
  className?: string
  glowColor?: string
  glowIntensity?: 'light' | 'medium' | 'strong'
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div'
}

export default function GlowingText({ 
  children, 
  className = '', 
  glowColor = 'white',
  glowIntensity = 'medium',
  as = 'span'
}: GlowingTextProps) {
  // Reduced glow intensity values - defined outside for access in animation
  const intensityMap = {
    light: '0 0 1px',
    medium: '0 0 2px',
    strong: '0 0 3px'
  };
  
  // Determine glow intensity values and 3D effect
  const getStyles = () => {
    // Create 3D effect with subtle shadows
    const textShadow = [
      // Subtle glow
      `${intensityMap[glowIntensity]} ${glowColor}`,
      // 3D effect with light source from top-left
      '-1px -1px 0 rgba(255,255,255,0.3)',
      '1px 1px 2px rgba(0,0,0,0.3)',
      '2px 2px 3px rgba(0,0,0,0.2)',
    ].join(', ');
    
    return {
      textShadow,
      transform: 'translateZ(0.01px)',
      fontWeight: 'bold',
      letterSpacing: '0.02em'
    };
  };

  const Component = motion[as];

  return (
    <Component
      className={className}
      style={getStyles()}
      animate={{
        textShadow: [
          getStyles().textShadow,
          // Very subtle pulse animation
          getStyles().textShadow.replace(
            `${intensityMap[glowIntensity]} ${glowColor}`,
            `0 0 ${glowIntensity === 'strong' ? '4px' : glowIntensity === 'medium' ? '3px' : '2px'} ${glowColor}`
          ),
          getStyles().textShadow
        ]
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        repeatType: "reverse"
      }}
      whileHover={{
        scale: 1.02,
        transition: { duration: 0.2 }
      }}
    >
      {children}
    </Component>
  );
}

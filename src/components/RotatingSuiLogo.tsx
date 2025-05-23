'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

interface RotatingSuiLogoProps {
  className?: string
  size?: number
}

export default function RotatingSuiLogo({ className = '', size = 60 }: RotatingSuiLogoProps) {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      className={`relative ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Glow effect background */}
      <motion.div
        className="absolute inset-0 rounded-full blur-xl opacity-50"
        style={{
          backgroundColor: '#0078D4',
          width: size,
          height: size,
        }}
        animate={{
          opacity: isHovered ? 0.7 : 0.5,
          scale: isHovered ? 1.2 : 1,
        }}
        transition={{
          duration: 0.5,
        }}
      />
      
      {/* 3D rotating logo */}
      <motion.div
        animate={{ 
          rotateY: 360,
          scale: isHovered ? 1.1 : 1,
        }}
        transition={{ 
          rotateY: {
            duration: 8,
            repeat: Infinity,
            ease: "linear"
          },
          scale: {
            duration: 0.4,
          }
        }}
        style={{
          transformStyle: 'preserve-3d',
          perspective: '1000px',
          width: size,
          height: size,
          filter: 'drop-shadow(0 0 10px rgba(0, 120, 212, 0.8))',
        }}
      >
        <img
          src="/sui-logo-3d-glow.svg" 
          alt="Sui Logo"
          className="w-full h-full object-contain"
          style={{
            transform: 'translateZ(20px)',
            width: size,
            height: size
          }}
        />
      </motion.div>
    </div>
  )
}

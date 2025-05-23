'use client'

import { useEffect, useRef } from 'react'
import { motion, useAnimation, useInView } from 'framer-motion'

interface AnimatedText3DProps {
  text: string
  className?: string
  delay?: number
  duration?: number
}

export default function AnimatedText3D({ 
  text, 
  className = '', 
  delay = 0,
  duration = 0.5 
}: AnimatedText3DProps) {
  const controls = useAnimation()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.5 })
  
  useEffect(() => {
    if (isInView) {
      controls.start('visible')
    }
  }, [controls, isInView])
  
  // Split text into words and characters
  const words = text.split(' ')
  
  // Blue glow color variations
  const blueGlow = [
    'rgba(56, 182, 255, 0.8)',    // Bright blue
    'rgba(0, 119, 255, 0.8)',     // Medium blue
    'rgba(0, 89, 255, 0.8)',      // Deep blue
    'rgba(66, 153, 225, 0.8)',    // Sky blue
    'rgba(49, 130, 206, 0.8)'     // Royal blue
  ]
  
  return (
    <motion.div
      ref={ref}
      className={`perspective-1000 ${className}`}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: {},
        visible: {}
      }}
    >
      <div className="flex flex-wrap justify-center">
        {words.map((word, wordIndex) => (
          <div key={wordIndex} className="mx-1 my-1 flex">
            {word.split('').map((char, charIndex) => {
              // Calculate glow index based on the overall character position
              const glowIndex = (wordIndex + charIndex) % blueGlow.length
              
              return (
                <motion.div
                  key={`${wordIndex}-${charIndex}`}
                  className="relative inline-block transform-style-3d"
                  style={{
                    textShadow: `0 0 10px ${blueGlow[glowIndex]}`,
                    color: 'white',
                    transformStyle: 'preserve-3d'
                  }}
                  variants={{
                    hidden: {
                      opacity: 0,
                      y: 20,
                      rotateX: 90,
                      z: -100,
                      textShadow: '0 0 0px rgba(56, 182, 255, 0)'
                    },
                    visible: {
                      opacity: 1,
                      y: 0,
                      rotateX: 0,
                      z: 0,
                      textShadow: `0 0 15px ${blueGlow[glowIndex]}`,
                      transition: {
                        duration: duration,
                        delay: delay + (wordIndex * 0.1) + (charIndex * 0.03),
                        ease: [0.2, 0.65, 0.3, 0.9],
                        textShadow: {
                          delay: delay + (wordIndex * 0.1) + (charIndex * 0.03) + 0.2,
                          duration: 1.5,
                          repeat: Infinity,
                          repeatType: 'reverse',
                          ease: 'easeInOut'
                        }
                      }
                    }
                  }}
                >
                  <span className="text-4xl sm:text-5xl md:text-6xl font-extrabold">
                    {char}
                  </span>
                  
                  {/* Reflection effect */}
                  <span 
                    className="absolute left-0 bottom-0 transform scale-y-[-0.25] opacity-30 blur-[1px] select-none pointer-events-none"
                    style={{ 
                      transformOrigin: 'bottom', 
                      color: 'rgba(255, 255, 255, 0.7)'
                    }}
                  >
                    {char}
                  </span>
                </motion.div>
              )
            })}
          </div>
        ))}
      </div>
    </motion.div>
  )
}

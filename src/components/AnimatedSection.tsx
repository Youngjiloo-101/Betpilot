'use client'

import { ReactNode } from 'react'
import { motion } from 'framer-motion'

interface AnimatedSectionProps {
  children: ReactNode
  delay?: number
  className?: string
}

export default function AnimatedSection({ children, delay = 0, className = '' }: AnimatedSectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export function AnimatedCard({ children, delay = 0, className = '' }: AnimatedSectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, delay: delay }}
      whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export function AnimatedText({ children, delay = 0, className = '' }: AnimatedSectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export function AnimatedButton({ children, className = '' }: AnimatedSectionProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={className}
    >
      {children}
    </motion.button>
  )
}

export function StaggeredContainer({ children, className = '' }: AnimatedSectionProps) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: 0.1
          }
        }
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export function StaggeredItem({ children, className = '' }: AnimatedSectionProps) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export function FadeInView({ children, className = '' }: AnimatedSectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export function FloatingElement({ children, className = '' }: AnimatedSectionProps) {
  return (
    <motion.div
      animate={{ 
        y: [0, -10, 0],
      }}
      transition={{ 
        duration: 4,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut"
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export function PulseAnimation({ children, className = '' }: AnimatedSectionProps) {
  return (
    <motion.div
      animate={{ 
        scale: [1, 1.03, 1],
      }}
      transition={{ 
        duration: 2,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut"
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

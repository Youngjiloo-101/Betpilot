'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import AnimatedSection, { AnimatedCard, AnimatedText, FadeInView } from '@/components/AnimatedSection'
import GlowingText from '@/components/GlowingText'
import BetPilotLogo from '@/components/BetPilotLogo'
import RotatingSuiLogo from '@/components/RotatingSuiLogo'
import AnimatedText3D from '@/components/AnimatedText3D'
import SuiWalletConnect from '@/components/SuiWalletConnect'
import { useWallet } from '@/contexts/WalletContext'

export default function WelcomePage() {
  const router = useRouter()
  const [showContent, setShowContent] = useState(false)
  const [showWalletConnect, setShowWalletConnect] = useState(false)
  const { isConnected, walletAddress } = useWallet()
  
  useEffect(() => {
    // Show content after a short delay for better animation timing
    const timer = setTimeout(() => {
      setShowContent(true)
    }, 500)
    
    // Redirect to dashboard if wallet is already connected
    if (isConnected && walletAddress) {
      router.push('/dashboard')
    }
    
    return () => clearTimeout(timer)
  }, [isConnected, walletAddress, router])
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-900 to-primary-950 pt-24 relative overflow-hidden">
      {/* Background particle effects */}
      <div className="absolute inset-0 z-0">
        {Array.from({ length: 30 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-blue-500/20 blur-xl"
            style={{
              width: Math.random() * 200 + 50,
              height: Math.random() * 200 + 50,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              x: [0, Math.random() * 100 - 50],
              y: [0, Math.random() * 100 - 50],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: Math.random() * 20 + 10,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        ))}
      </div>
      
      {/* Sui Logo in center of page */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-0 opacity-30">
        <RotatingSuiLogo size={400} />
      </div>
      
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 relative z-10">
        <AnimatedSection>
          <div className="text-center mb-8">
            <Link href="/">
              <BetPilotLogo size="xl" />
            </Link>
          </div>
        </AnimatedSection>
        
        {/* 3D Animated Text */}
        <div className="my-16 text-center">
          <AnimatedText3D 
            text="Do you want to win? Then be the smart guy. Pilot your odds" 
            delay={0.5}
            duration={0.7}
            className="mb-12"
          />
        </div>
        
        {showContent && (
          <FadeInView className="mt-16">
            {showWalletConnect ? (
              <div className="max-w-md mx-auto">
                <SuiWalletConnect 
                  onSuccess={(address) => {
                    // Handle successful wallet connection
                    console.log('Connected wallet address:', address)
                    // Redirect to dashboard
                    router.push('/dashboard')
                  }}
                  onSkip={() => setShowWalletConnect(false)}
                />
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              <AnimatedCard 
                delay={0.3} 
                className="bg-primary-800/30 backdrop-blur-sm border border-primary-700/50 shadow-xl rounded-lg p-6 hover:bg-primary-800/40 transition-colors"
              >
                <div className="text-center">
                  <GlowingText 
                    as="h2" 
                    className="text-2xl font-bold text-white mb-4"
                    glowColor="rgba(255, 255, 255, 0.6)"
                    glowIntensity="medium"
                  >
                    Create New Account
                  </GlowingText>
                  <p className="text-gray-300 mb-6">
                    Join BetPilot and access advanced betting tools, AI-powered insights, and blockchain integration.
                  </p>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <button
                      onClick={() => router.push('/signup')}
                      className="w-full py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
                    >
                      Sign Up
                    </button>
                  </motion.div>
                </div>
              </AnimatedCard>
              
              <AnimatedCard 
                delay={0.4} 
                className="bg-primary-800/30 backdrop-blur-sm border border-primary-700/50 shadow-xl rounded-lg p-6 hover:bg-primary-800/40 transition-colors"
              >
                <div className="text-center">
                  <GlowingText 
                    as="h2" 
                    className="text-2xl font-bold text-white mb-4"
                    glowColor="rgba(255, 255, 255, 0.6)"
                    glowIntensity="medium"
                  >
                    Already a Member?
                  </GlowingText>
                  <p className="text-gray-300 mb-6">
                    Welcome back! Log in to your account to continue your smart betting journey.
                  </p>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <button
                      onClick={() => router.push('/login')}
                      className="w-full py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-700 hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors duration-200"
                    >
                      Log In
                    </button>
                  </motion.div>
                </div>
              </AnimatedCard>
              <AnimatedCard 
                delay={0.5} 
                className="bg-primary-800/30 backdrop-blur-sm border border-primary-700/50 shadow-xl rounded-lg p-6 hover:bg-primary-800/40 transition-colors"
              >
                <div className="text-center">
                  <GlowingText 
                    as="h2" 
                    className="text-2xl font-bold text-white mb-4"
                    glowColor="rgba(255, 255, 255, 0.6)"
                    glowIntensity="medium"
                  >
                    Connect Wallet
                  </GlowingText>
                  <p className="text-gray-300 mb-6">
                    Use your Sui wallet to quickly access your account with blockchain integration.
                  </p>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <button
                      onClick={() => setShowWalletConnect(true)}
                      className="w-full py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
                    >
                      Connect Wallet
                    </button>
                  </motion.div>
                </div>
              </AnimatedCard>
            </div>
            )}
            
            <div className="text-center mt-12">
              <Link href="/" className="text-sm font-semibold text-gray-300 hover:text-white transition-colors duration-200">
                ← Back to Home
              </Link>
            </div>
          </FadeInView>
        )}
      </div>
    </div>
  )
}

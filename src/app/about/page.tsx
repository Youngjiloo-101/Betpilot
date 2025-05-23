'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import AnimatedSection, { AnimatedCard, AnimatedText, FadeInView } from '@/components/AnimatedSection'
import GlowingText from '@/components/GlowingText'
import BetPilotLogo from '@/components/BetPilotLogo'
import RotatingSuiLogo from '@/components/RotatingSuiLogo'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-900 to-primary-950 pt-24 relative overflow-hidden">
      {/* Background particle effects */}
      <div className="absolute inset-0 z-0">
        {Array.from({ length: 20 }).map((_, i) => (
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
        <RotatingSuiLogo size={300} />
      </div>
      
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 relative z-10">
        <AnimatedSection>
          <div className="text-center mb-12">
            <Link href="/">
              <BetPilotLogo size="xl" />
            </Link>
            <AnimatedText delay={0.1}>
              <GlowingText 
                as="h1" 
                className="mt-6 text-3xl font-bold text-white sm:text-4xl"
                glowColor="rgba(255, 255, 255, 0.6)"
                glowIntensity="medium"
              >
                About BetPilot
              </GlowingText>
            </AnimatedText>
          </div>
        </AnimatedSection>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <AnimatedCard delay={0.2} className="md:col-span-2 bg-primary-800/30 backdrop-blur-sm border border-primary-700/50 shadow-xl rounded-lg p-6">
            <GlowingText 
              as="h2" 
              className="text-2xl font-bold text-white mb-4"
              glowColor="rgba(255, 255, 255, 0.6)"
              glowIntensity="medium"
            >
              Our Mission
            </GlowingText>
            <div className="space-y-4 text-gray-300">
              <p>
                BetPilot was founded in Ghana with a clear mission: to revolutionize the betting industry by combining cutting-edge AI technology, blockchain integration, and advanced statistical modeling to empower bettors with smarter, more informed decisions while showcasing African technological innovation.
              </p>
              <p>
                We believe that successful betting isn't about luck—it's about strategy, discipline, and having the right tools at your disposal. Our platform provides bettors with sophisticated analytics, risk management features, and AI-powered insights that were previously only available to professional bookmakers and large betting syndicates.
              </p>
              <p>
                By leveraging the transparency and security of blockchain technology through our Sui wallet integration, we're creating a more trustworthy betting ecosystem that benefits all participants.
              </p>
            </div>
          </AnimatedCard>
          
          <AnimatedCard delay={0.3} className="bg-primary-800/30 backdrop-blur-sm border border-primary-700/50 shadow-xl rounded-lg p-6">
            <GlowingText 
              as="h2" 
              className="text-2xl font-bold text-white mb-4"
              glowColor="rgba(255, 255, 255, 0.6)"
              glowIntensity="medium"
            >
              Key Facts
            </GlowingText>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-start">
                <span className="text-blue-400 mr-2">•</span>
                <span>Founded in 2025 in Accra, Ghana</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-400 mr-2">•</span>
                <span>Proudly African-built technology</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-400 mr-2">•</span>
                <span>Team of talented Ghanaian data scientists, developers, and betting analysts</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-400 mr-2">•</span>
                <span>Integrated with major African and global sportsbooks</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-400 mr-2">•</span>
                <span>Processing over 10,000 bet simulations daily</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-400 mr-2">•</span>
                <span>Supporting the growth of Ghana's tech ecosystem</span>
              </li>
            </ul>
          </AnimatedCard>
        </div>
        
        <FadeInView>
          <AnimatedCard delay={0.4} className="bg-primary-800/30 backdrop-blur-sm border border-primary-700/50 shadow-xl rounded-lg p-6 mb-12">
            <GlowingText 
              as="h2" 
              className="text-2xl font-bold text-white mb-4"
              glowColor="rgba(255, 255, 255, 0.6)"
              glowIntensity="medium"
            >
              Our Technology
            </GlowingText>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <h3 className="text-xl font-semibold text-blue-400">AI-Powered Analytics</h3>
                <p className="text-gray-300">
                  Our proprietary AI models analyze millions of historical betting data points to identify patterns and opportunities that human analysis might miss.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-semibold text-blue-400">Blockchain Integration</h3>
                <p className="text-gray-300">
                  Built on the Sui blockchain, BetPilot offers transparent, secure, and immutable record-keeping for all betting activities.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-semibold text-blue-400">Advanced Risk Management</h3>
                <p className="text-gray-300">
                  Our Monte Carlo simulations and risk assessment tools help bettors understand the true probability distributions of their betting portfolios.
                </p>
              </div>
            </div>
          </AnimatedCard>
        </FadeInView>
        
        <FadeInView>
          <AnimatedCard delay={0.5} className="bg-primary-800/30 backdrop-blur-sm border border-primary-700/50 shadow-xl rounded-lg p-6 mb-12">
            <GlowingText 
              as="h2" 
              className="text-2xl font-bold text-white mb-4"
              glowColor="rgba(255, 255, 255, 0.6)"
              glowIntensity="medium"
            >
              Our Team
            </GlowingText>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <h3 className="text-xl font-semibold text-blue-400">Leadership</h3>
                <p className="text-gray-300">
                  Our leadership team brings together expertise from sports betting, fintech, blockchain, and AI development. With roots in Ghana's growing tech ecosystem and experience across African betting markets, our team is uniquely positioned to transform the betting industry with solutions built by Africans for a global audience.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-semibold text-blue-400">Development</h3>
                <p className="text-gray-300">
                  Our development team consists of talented Ghanaian software engineers, data scientists, and UI/UX designers who are passionate about creating intuitive, powerful tools that make complex betting concepts accessible to everyone while showcasing African innovation on the global stage.
                </p>
              </div>
            </div>
          </AnimatedCard>
        </FadeInView>
        
        <div className="flex justify-center space-x-6 mt-12">
          <Link 
            href="/contact" 
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Contact Us
          </Link>
          <Link 
            href="/partner" 
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-700 hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            Partner With Us
          </Link>
          <Link 
            href="/" 
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-300 hover:text-white"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}

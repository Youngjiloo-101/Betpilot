'use client'

import AnimatedSection, { AnimatedText } from '@/components/AnimatedSection'
import GlowingText from '@/components/GlowingText'
import BetPilotLogo from '@/components/BetPilotLogo'
import Link from 'next/link'

export default function AboutMVP() {
  return (
    <div className="bg-gradient-to-b from-primary-900 to-primary-950 min-h-screen">
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
        <AnimatedSection>
          <div className="mx-auto max-w-2xl text-center">
            <BetPilotLogo size="lg" />
            <AnimatedText delay={0.1}>
              <GlowingText 
                as="h2" 
                className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl"
                glowColor="rgba(255, 255, 255, 0.6)"
                glowIntensity="medium"
              >
                About BetPilot
              </GlowingText>
            </AnimatedText>
          </div>
          
          <div className="mx-auto mt-16 max-w-2xl rounded-xl bg-primary-800/20 p-8">
            <AnimatedText delay={0.2}>
              <GlowingText 
                as="h3" 
                className="text-xl font-semibold text-white mb-4"
                glowColor="rgba(255, 255, 255, 0.5)"
                glowIntensity="light"
              >
                Our Mission
              </GlowingText>
            </AnimatedText>
            
            <AnimatedText delay={0.3}>
              <p className="text-gray-300 mb-6">
                BetPilot is designed to transform the betting experience by combining advanced statistical modeling 
                and intuitive tools to help you make more informed betting decisions.
              </p>
            </AnimatedText>
            
            <AnimatedText delay={0.4}>
              <GlowingText 
                as="h3" 
                className="text-xl font-semibold text-white mb-4"
                glowColor="rgba(255, 255, 255, 0.5)"
                glowIntensity="light"
              >
                Core Features
              </GlowingText>
            </AnimatedText>
            
            <AnimatedText delay={0.5}>
              <div className="space-y-4 text-gray-300">
                <div>
                  <h4 className="font-medium text-white">Monte Carlo Simulator</h4>
                  <p>
                    Our simulator runs thousands of betting scenarios to show you the range of possible outcomes.
                    Visualize the risk and reward of your betting strategy before placing real bets.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-medium text-white">Smart Bet Planner</h4>
                  <p>
                    Tell us your stake and desired return, and we'll show you optimized betting options with
                    risk assessments and probability calculations.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-medium text-white">Reverse Odds Engine</h4>
                  <p>
                    Specify your target odds, and our engine will find the best matching bets from current
                    market data, saving you time and helping you find value.
                  </p>
                </div>
              </div>
            </AnimatedText>
            
            <AnimatedText delay={0.6}>
              <div className="mt-8 text-center">
                <Link 
                  href="/monte-carlo" 
                  className="rounded-md bg-primary-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
                >
                  Try the Monte Carlo Simulator
                </Link>
              </div>
            </AnimatedText>
          </div>
        </AnimatedSection>
      </div>
    </div>
  )
}

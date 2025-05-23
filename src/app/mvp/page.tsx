'use client'

import Image from 'next/image'
import Link from 'next/link'
import AnimatedSection, { AnimatedText, StaggeredContainer, StaggeredItem, FloatingElement } from '@/components/AnimatedSection'
import GlowingText from '@/components/GlowingText'
import BetPilotLogo from '@/components/BetPilotLogo'

export default function HomeMVP() {
  // Focused MVP features
  const mvpFeatures = [
    {
      title: 'Monte Carlo Simulator',
      description: 'Simulates thousands of bet outcomes and visualizes risk percentiles, expected value, and variance.',
      icon: '🧮',
      href: '/monte-carlo'
    },
    {
      title: 'Smart Bet Planner',
      description: 'Input stake and desired return → receive risk-rated bets, success probabilities, and historical insights.',
      icon: '📈',
      href: '/bet-planner'
    },
    {
      title: 'Reverse Odds Engine',
      description: 'Input target odds (e.g. 4.0x), get back a list of optimized bets that match via real-time data.',
      icon: '🎯',
      href: '/reverse-odds'
    }
  ]

  return (
    <div className="bg-gradient-to-b from-primary-900 to-primary-950 min-h-screen">
      {/* Hero Section */}
      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
          <AnimatedSection>
            <div className="text-center">
              <AnimatedText delay={0.1}>
                <div>
                  <BetPilotLogo size="xl" />
                  <GlowingText 
                    as="h2" 
                    className="mt-4 text-2xl font-medium tracking-tight text-white sm:text-3xl"
                    glowColor="rgba(255, 255, 255, 0.6)"
                    glowIntensity="medium"
                  >
                    Smart Betting, Simplified
                  </GlowingText>
                </div>
              </AnimatedText>
              <AnimatedText delay={0.3}>
                <GlowingText 
                  as="p" 
                  className="mt-6 text-lg leading-8 text-gray-300"
                  glowColor="rgba(209, 213, 219, 0.6)"
                  glowIntensity="light"
                >
                  Make data-driven betting decisions with our advanced simulation tools
                  and AI-powered analytics.
                </GlowingText>
              </AnimatedText>
              <AnimatedSection delay={0.5}>
                <div className="mt-10 flex items-center justify-center gap-x-6">
                  <Link 
                    href="/monte-carlo" 
                    className="rounded-md bg-primary-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
                  >
                    Try Monte Carlo Simulator
                  </Link>
                  <Link href="/mvp/about" className="text-sm font-semibold leading-6 text-gray-300 hover:text-white">
                    Learn more <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </AnimatedSection>
            </div>
          </AnimatedSection>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <AnimatedSection>
            <div className="mx-auto max-w-2xl lg:text-center">
              <AnimatedText>
                <GlowingText 
                  as="h2" 
                  className="text-base font-semibold leading-7 text-primary-400"
                  glowColor="rgba(96, 165, 250, 0.7)"
                  glowIntensity="medium"
                >
                  Core Features
                </GlowingText>
              </AnimatedText>
              <AnimatedText delay={0.1}>
                <div className="mt-2">
                  <GlowingText 
                    as="p" 
                    className="mt-3 text-2xl font-medium tracking-tight text-white sm:text-3xl"
                    glowColor="rgba(255, 255, 255, 0.6)"
                    glowIntensity="medium"
                  >
                    Everything you need to bet smarter
                  </GlowingText>
                </div>
              </AnimatedText>
            </div>
          </AnimatedSection>
          
          <StaggeredContainer className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
              {mvpFeatures.map((feature) => (
                <StaggeredItem key={feature.title}>
                  <Link href={feature.href} className="block h-full">
                    <div className="flex flex-col h-full p-6 rounded-xl bg-primary-800/20 hover:bg-primary-800/30 transition-colors">
                      <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-white">
                        <FloatingElement className="h-10 w-10 flex items-center justify-center rounded-lg bg-primary-800">
                          <span className="text-2xl">{feature.icon}</span>
                        </FloatingElement>
                        <GlowingText 
                          className="ml-2" 
                          glowColor="rgba(255, 255, 255, 0.7)"
                          glowIntensity="medium"
                        >
                          {feature.title}
                        </GlowingText>
                      </dt>
                      <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-300">
                        <GlowingText 
                          as="p" 
                          className="flex-auto"
                          glowColor="rgba(209, 213, 219, 0.5)"
                          glowIntensity="light"
                        >
                          {feature.description}
                        </GlowingText>
                      </dd>
                    </div>
                  </Link>
                </StaggeredItem>
              ))}
            </dl>
          </StaggeredContainer>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-primary-800/30 py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <GlowingText 
              as="h2" 
              className="text-2xl font-bold tracking-tight text-white"
              glowColor="rgba(255, 255, 255, 0.6)"
              glowIntensity="medium"
            >
              Ready to make smarter bets?
            </GlowingText>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-300">
              Start with our Monte Carlo simulator to see how your betting strategy performs over thousands of simulations.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href="/monte-carlo"
                className="rounded-md bg-primary-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
              >
                Get started
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

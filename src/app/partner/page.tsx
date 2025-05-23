'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { CheckCircleIcon } from '@heroicons/react/24/outline'
import AnimatedSection, { AnimatedCard, AnimatedText, FadeInView } from '@/components/AnimatedSection'
import GlowingText from '@/components/GlowingText'
import BetPilotLogo from '@/components/BetPilotLogo'
import RotatingSuiLogo from '@/components/RotatingSuiLogo'

interface PartnershipType {
  id: string
  title: string
  description: string
  benefits: string[]
  icon: string
}

export default function PartnerPage() {
  const [formState, setFormState] = useState({
    name: '',
    companyName: '',
    email: '',
    partnershipType: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  
  const partnershipTypes: PartnershipType[] = [
    {
      id: 'sportsbook',
      title: 'Sportsbook Integration',
      description: 'Connect your sportsbook to BetPilot to offer our users direct access to your odds and betting markets.',
      benefits: [
        'Tap into our growing user base of sophisticated bettors',
        'Increase betting volume through our AI-powered recommendations',
        'Seamless API integration with your existing platform'
      ],
      icon: '🏆'
    },
    {
      id: 'data',
      title: 'Data Provider',
      description: 'Integrate your sports data, odds feeds, or statistical models with our platform.',
      benefits: [
        'Monetize your data through our subscription model',
        'Showcase your data quality to a targeted audience',
        'Collaborate on developing new betting metrics and insights'
      ],
      icon: '📊'
    },
    {
      id: 'blockchain',
      title: 'Blockchain Partner',
      description: 'Collaborate on blockchain innovations for the betting industry, from smart contracts to NFTs.',
      benefits: [
        'Co-develop novel blockchain applications for betting',
        'Access to our Sui blockchain integration expertise',
        'Joint marketing opportunities in the web3 space'
      ],
      icon: '⛓️'
    },
    {
      id: 'affiliate',
      title: 'Affiliate Program',
      description: 'Promote BetPilot to your audience and earn commission on referred users.',
      benefits: [
        'Competitive commission structure',
        'Detailed tracking and reporting dashboard',
        'Custom promotional materials and support'
      ],
      icon: '🤝'
    }
  ]
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormState(prev => ({
      ...prev,
      [name]: value
    }))
  }
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
      setFormState({
        name: '',
        companyName: '',
        email: '',
        partnershipType: '',
        message: ''
      })
    }, 1500)
  }
  
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
                Partner With Us
              </GlowingText>
            </AnimatedText>
            <AnimatedText delay={0.2}>
              <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-300">
                Join forces with BetPilot to shape the future of smart betting
              </p>
            </AnimatedText>
          </div>
        </AnimatedSection>
        
        <FadeInView>
          <AnimatedCard delay={0.3} className="bg-primary-800/30 backdrop-blur-sm border border-primary-700/50 shadow-xl rounded-lg p-6 mb-12">
            <GlowingText 
              as="h2" 
              className="text-2xl font-bold text-white mb-4"
              glowColor="rgba(255, 255, 255, 0.6)"
              glowIntensity="medium"
            >
              Why Partner With BetPilot?
            </GlowingText>
            <div className="text-gray-300 space-y-4">
              <p>
                BetPilot is at the forefront of innovation in the betting industry, combining AI, blockchain technology, and advanced statistical modeling to create a revolutionary platform for smart betting.
              </p>
              <p>
                By partnering with us, you'll gain access to our growing user base of sophisticated bettors, our cutting-edge technology, and our team of industry experts. Together, we can create new opportunities and drive the future of betting.
              </p>
            </div>
          </AnimatedCard>
        </FadeInView>
        
        <div className="mb-12">
          <GlowingText 
            as="h2" 
            className="text-2xl font-bold text-white mb-6 text-center"
            glowColor="rgba(255, 255, 255, 0.6)"
            glowIntensity="medium"
          >
            Partnership Opportunities
          </GlowingText>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {partnershipTypes.map((type, index) => (
              <AnimatedCard 
                key={type.id} 
                delay={0.3 + (index * 0.1)} 
                className="bg-primary-800/30 backdrop-blur-sm border border-primary-700/50 shadow-xl rounded-lg p-6"
              >
                <div className="flex items-center mb-4">
                  <span className="text-3xl mr-3">{type.icon}</span>
                  <h3 className="text-xl font-bold text-white">{type.title}</h3>
                </div>
                <p className="text-gray-300 mb-4">{type.description}</p>
                <h4 className="text-blue-400 font-medium mb-2">Benefits:</h4>
                <ul className="space-y-2">
                  {type.benefits.map((benefit, i) => (
                    <li key={i} className="flex items-start text-gray-300">
                      <span className="text-green-400 mr-2">✓</span>
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </AnimatedCard>
            ))}
          </div>
        </div>
        
        <FadeInView>
          <AnimatedCard delay={0.5} className="bg-primary-800/30 backdrop-blur-sm border border-primary-700/50 shadow-xl rounded-lg p-6 mb-12">
            {isSubmitted ? (
              <div className="flex flex-col items-center justify-center py-12">
                <CheckCircleIcon className="h-16 w-16 text-green-400 mb-4" />
                <h2 className="text-2xl font-bold text-white mb-2">Partnership Request Submitted!</h2>
                <p className="text-gray-300 text-center mb-6">
                  Thank you for your interest in partnering with BetPilot. Our partnership team will review your information and contact you soon.
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Submit Another Request
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <GlowingText 
                  as="h2" 
                  className="text-2xl font-bold text-white mb-6"
                  glowColor="rgba(255, 255, 255, 0.6)"
                  glowIntensity="medium"
                >
                  Partner Application
                </GlowingText>
                
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-white">
                      Your Name
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="name"
                        id="name"
                        required
                        className="block w-full rounded-md border-gray-700 bg-primary-700/50 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        value={formState.name}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="companyName" className="block text-sm font-medium text-white">
                      Company Name
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="companyName"
                        id="companyName"
                        required
                        className="block w-full rounded-md border-gray-700 bg-primary-700/50 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        value={formState.companyName}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-white">
                    Email Address
                  </label>
                  <div className="mt-1">
                    <input
                      type="email"
                      name="email"
                      id="email"
                      required
                      className="block w-full rounded-md border-gray-700 bg-primary-700/50 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      value={formState.email}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="partnershipType" className="block text-sm font-medium text-white">
                    Partnership Type
                  </label>
                  <div className="mt-1">
                    <select
                      id="partnershipType"
                      name="partnershipType"
                      required
                      className="block w-full rounded-md border-gray-700 bg-primary-700/50 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      value={formState.partnershipType}
                      onChange={handleChange}
                    >
                      <option value="">Select a partnership type</option>
                      {partnershipTypes.map(type => (
                        <option key={type.id} value={type.id}>
                          {type.title}
                        </option>
                      ))}
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-white">
                    Tell us about your partnership idea
                  </label>
                  <div className="mt-1">
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      required
                      className="block w-full rounded-md border-gray-700 bg-primary-700/50 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      value={formState.message}
                      onChange={handleChange}
                      placeholder="Please describe your company, your partnership idea, and how you think we could work together."
                    />
                  </div>
                </div>
                
                <div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center justify-center w-full px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Partnership Request'}
                  </button>
                </div>
              </form>
            )}
          </AnimatedCard>
        </FadeInView>
        
        <div className="flex justify-center space-x-6 mt-12">
          <Link 
            href="/about" 
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-700 hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            About Us
          </Link>
          <Link 
            href="/contact" 
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-700 hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            Contact Us
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

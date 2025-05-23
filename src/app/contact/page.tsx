'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { EnvelopeIcon, PhoneIcon, MapPinIcon, CheckCircleIcon } from '@heroicons/react/24/outline'
import AnimatedSection, { AnimatedCard, AnimatedText, FadeInView } from '@/components/AnimatedSection'
import GlowingText from '@/components/GlowingText'
import BetPilotLogo from '@/components/BetPilotLogo'
import RotatingSuiLogo from '@/components/RotatingSuiLogo'

export default function ContactPage() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  
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
        email: '',
        subject: '',
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
                Contact Us
              </GlowingText>
            </AnimatedText>
            <AnimatedText delay={0.2}>
              <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-300">
                Have questions or feedback? We'd love to hear from you.
              </p>
            </AnimatedText>
          </div>
        </AnimatedSection>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="md:col-span-1 space-y-6">
            <AnimatedCard delay={0.3} className="bg-primary-800/30 backdrop-blur-sm border border-primary-700/50 shadow-xl rounded-lg p-6">
              <div className="flex items-start">
                <EnvelopeIcon className="h-6 w-6 text-blue-400 flex-shrink-0 mr-3" />
                <div>
                  <h3 className="text-lg font-medium text-white">Email</h3>
                  <p className="mt-1 text-gray-300">
                    <a href="mailto:support@betpilot.io" className="hover:text-blue-400 transition-colors">
                      support@betpilot.io
                    </a>
                  </p>
                  <p className="mt-1 text-sm text-gray-400">
                    We aim to respond within 24 hours
                  </p>
                </div>
              </div>
            </AnimatedCard>
            
            <AnimatedCard delay={0.4} className="bg-primary-800/30 backdrop-blur-sm border border-primary-700/50 shadow-xl rounded-lg p-6">
              <div className="flex items-start">
                <PhoneIcon className="h-6 w-6 text-blue-400 flex-shrink-0 mr-3" />
                <div>
                  <h3 className="text-lg font-medium text-white">Phone</h3>
                  <p className="mt-1 text-gray-300">
                    <a href="tel:+1-800-BET-PILOT" className="hover:text-blue-400 transition-colors">
                      +1-800-BET-PILOT
                    </a>
                  </p>
                  <p className="mt-1 text-sm text-gray-400">
                    Mon-Fri, 9am-5pm PT
                  </p>
                </div>
              </div>
            </AnimatedCard>
            
            <AnimatedCard delay={0.5} className="bg-primary-800/30 backdrop-blur-sm border border-primary-700/50 shadow-xl rounded-lg p-6">
              <div className="flex items-start">
                <MapPinIcon className="h-6 w-6 text-blue-400 flex-shrink-0 mr-3" />
                <div>
                  <h3 className="text-lg font-medium text-white">Location</h3>
                  <p className="mt-1 text-gray-300">
                    123 Blockchain Way<br />
                    Palo Alto, CA 94301<br />
                    United States
                  </p>
                </div>
              </div>
            </AnimatedCard>
          </div>
          
          <AnimatedCard delay={0.3} className="md:col-span-2 bg-primary-800/30 backdrop-blur-sm border border-primary-700/50 shadow-xl rounded-lg p-6">
            {isSubmitted ? (
              <div className="flex flex-col items-center justify-center py-12">
                <CheckCircleIcon className="h-16 w-16 text-green-400 mb-4" />
                <h2 className="text-2xl font-bold text-white mb-2">Message Sent!</h2>
                <p className="text-gray-300 text-center mb-6">
                  Thank you for reaching out. We'll get back to you as soon as possible.
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Send Another Message
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
                  Send Us a Message
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
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-white">
                    Subject
                  </label>
                  <div className="mt-1">
                    <select
                      id="subject"
                      name="subject"
                      required
                      className="block w-full rounded-md border-gray-700 bg-primary-700/50 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      value={formState.subject}
                      onChange={handleChange}
                    >
                      <option value="">Select a subject</option>
                      <option value="general">General Inquiry</option>
                      <option value="support">Technical Support</option>
                      <option value="feedback">Product Feedback</option>
                      <option value="partnership">Partnership Opportunity</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-white">
                    Message
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
                    />
                  </div>
                </div>
                
                <div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center justify-center w-full px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </button>
                </div>
              </form>
            )}
          </AnimatedCard>
        </div>
        
        <div className="flex justify-center space-x-6 mt-12">
          <Link 
            href="/about" 
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-700 hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            About Us
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

'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowPathIcon, ExclamationCircleIcon, WalletIcon } from '@heroicons/react/24/outline'
import AnimatedSection, { AnimatedCard, AnimatedText } from '@/components/AnimatedSection'
import GlowingText from '@/components/GlowingText'
import BetPilotLogo from '@/components/BetPilotLogo'
import RotatingSuiLogo from '@/components/RotatingSuiLogo'
import SuiWalletConnect from '@/components/SuiWalletConnect'

interface FormData {
  email: string;
  password: string;
  rememberMe: boolean;
}

interface FormErrors {
  email?: string;
  password?: string;
  general?: string;
}

export default function LoginPage() {
  const router = useRouter()
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
    rememberMe: false,
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [isLoading, setIsLoading] = useState(false)
  const [showWalletConnect, setShowWalletConnect] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
    
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }))
    }
  }

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}
    
    // Email validation
    if (!formData.email) {
      newErrors.email = 'Email is required'
    }
    
    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }
    
    setIsLoading(true)
    
    // Simulate API call
    setTimeout(() => {
      // Mock login check
      if (formData.email === 'test@example.com' && formData.password === 'password123') {
        // Successful login
        router.push('/')
      } else {
        // Failed login
        setErrors({
          general: 'Invalid email or password'
        })
        setIsLoading(false)
      }
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-900 to-primary-950 pt-24 relative">
      {/* Sui Logo in center of page */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-0 opacity-30">
        <RotatingSuiLogo size={300} />
      </div>
      
      <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8 py-10 relative z-10">
        <AnimatedSection>
          <div className="text-center mb-8">
            <Link href="/">
              <BetPilotLogo size="lg" />
            </Link>
            <AnimatedText delay={0.1}>
              <GlowingText 
                as="h1" 
                className="mt-3 text-3xl font-bold text-white sm:text-4xl"
                glowColor="rgba(255, 255, 255, 0.6)"
                glowIntensity="medium"
              >
                Welcome Back
              </GlowingText>
            </AnimatedText>
            <AnimatedText delay={0.2}>
              <GlowingText 
                as="p" 
                className="mt-3 text-gray-300"
                glowColor="rgba(209, 213, 219, 0.5)"
                glowIntensity="light"
              >
                Log in to access your BetPilot account
              </GlowingText>
            </AnimatedText>
          </div>
        </AnimatedSection>
        
        <AnimatedCard delay={0.3} className="bg-primary-800/30 backdrop-blur-sm border border-primary-700/50 shadow-xl rounded-lg p-6">
          {showWalletConnect ? (
            <div>
              <SuiWalletConnect 
                onSuccess={(address) => {
                  // Handle successful wallet connection
                  console.log('Connected wallet address:', address)
                  // You might want to store this in localStorage or context
                  localStorage.setItem('walletAddress', address)
                  router.push('/dashboard')
                }}
                onSkip={() => setShowWalletConnect(false)}
              />
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
            {errors.general && (
              <div className="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded-md">
                <p className="text-red-300 text-sm">{errors.general}</p>
              </div>
            )}
            
            <div className="space-y-4">
              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-white mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full rounded-md border ${errors.email ? 'border-red-500' : 'border-gray-700'} bg-primary-800/50 text-white shadow-sm focus:border-primary-500 focus:ring-primary-500`}
                  placeholder="you@example.com"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-400 flex items-center">
                    <ExclamationCircleIcon className="h-4 w-4 mr-1" />
                    {errors.email}
                  </p>
                )}
              </div>
              
              {/* Password Field */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-white mb-1">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full rounded-md border ${errors.password ? 'border-red-500' : 'border-gray-700'} bg-primary-800/50 text-white shadow-sm focus:border-primary-500 focus:ring-primary-500`}
                  placeholder="••••••••"
                />
                {errors.password && (
                  <p className="mt-1 text-sm text-red-400 flex items-center">
                    <ExclamationCircleIcon className="h-4 w-4 mr-1" />
                    {errors.password}
                  </p>
                )}
              </div>
              
              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="rememberMe"
                    name="rememberMe"
                    type="checkbox"
                    checked={formData.rememberMe}
                    onChange={handleChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-700 rounded bg-primary-800/50"
                  />
                  <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-300">
                    Remember me
                  </label>
                </div>
                
                <div className="text-sm">
                  <Link href="/forgot-password" className="text-blue-400 hover:text-blue-300 transition-colors duration-200">
                    Forgot your password?
                  </Link>
                </div>
              </div>
              
              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
                >
                  {isLoading ? (
                    <>
                      <ArrowPathIcon className="animate-spin -ml-1 mr-2 h-4 w-4" />
                      Logging in...
                    </>
                  ) : (
                    'Log In'
                  )}
                </button>
              </div>
              
              {/* Divider */}
              <div className="relative mt-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-600"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-primary-800/30 text-gray-400">Or</span>
                </div>
              </div>
              
              {/* Wallet Login Button */}
              <div className="mt-6">
                <button
                  type="button"
                  onClick={() => setShowWalletConnect(true)}
                  className="w-full flex justify-center items-center py-2 px-4 border border-gray-700 rounded-md shadow-sm text-sm font-medium text-white bg-primary-700 hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors duration-200"
                >
                  <WalletIcon className="h-5 w-5 mr-2" />
                  Connect with Wallet
                </button>
              </div>
              
              {/* Sign Up Link */}
              <div className="text-center mt-4">
                <p className="text-sm text-gray-300">
                  Don't have an account?{' '}
                  <Link href="/signup" className="text-blue-400 hover:text-blue-300 transition-colors duration-200">
                    Sign up
                  </Link>
                </p>
              </div>
            </div>
          </form>
          )}
        </AnimatedCard>
        
        {/* Back Button */}
        <div className="text-center mt-6">
          <Link href="/welcome" className="text-sm font-semibold text-gray-300 hover:text-white transition-colors duration-200">
            ← Back to Welcome Page
          </Link>
        </div>
      </div>
    </div>
  )
}

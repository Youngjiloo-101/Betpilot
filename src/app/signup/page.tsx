'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowPathIcon, CheckCircleIcon, ExclamationCircleIcon, WalletIcon } from '@heroicons/react/24/outline'
import AnimatedSection, { AnimatedCard, AnimatedText, FadeInView } from '@/components/AnimatedSection'
import GlowingText from '@/components/GlowingText'
import BetPilotLogo from '@/components/BetPilotLogo'
import RotatingSuiLogo from '@/components/RotatingSuiLogo'
import SuiWalletConnect from '@/components/SuiWalletConnect'

interface FormData {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
}

interface FormErrors {
  email?: string;
  username?: string;
  password?: string;
  confirmPassword?: string;
  general?: string;
}

export default function SignupPage() {
  const router = useRouter()
  const [formData, setFormData] = useState<FormData>({
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [isLoading, setIsLoading] = useState(false)
  const [signupSuccess, setSignupSuccess] = useState(false)
  const [showWalletConnect, setShowWalletConnect] = useState(false)
  const [walletConnected, setWalletConnected] = useState(false)
  const [walletAddress, setWalletAddress] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
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
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid'
    }
    
    // Username validation
    if (!formData.username) {
      newErrors.username = 'Username is required'
    } else if (formData.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters'
    }
    
    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters'
    }
    
    // Confirm password validation
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
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
      // Check if email already exists (mock check)
      if (formData.email === 'test@example.com') {
        setErrors({
          email: 'Email already in use'
        })
        setIsLoading(false)
        return
      }
      
      // Successful signup
      setSignupSuccess(true)
      setIsLoading(false)
      
      // Show wallet connect after successful signup
      setTimeout(() => {
        setShowWalletConnect(true)
      }, 1500)
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
                Create Your Account
              </GlowingText>
            </AnimatedText>
            <AnimatedText delay={0.2}>
              <GlowingText 
                as="p" 
                className="mt-3 text-gray-300"
                glowColor="rgba(209, 213, 219, 0.5)"
                glowIntensity="light"
              >
                Join BetPilot to access advanced betting tools and analytics
              </GlowingText>
            </AnimatedText>
          </div>
        </AnimatedSection>
        
        {showWalletConnect && !signupSuccess ? (
          <AnimatedCard delay={0.3} className="bg-primary-800/30 backdrop-blur-sm border border-primary-700/50 shadow-xl rounded-lg p-6">
            <SuiWalletConnect 
              onSuccess={(address) => {
                // Handle successful wallet connection
                console.log('Connected wallet address:', address)
                setWalletAddress(address)
                setWalletConnected(true)
                // Store in localStorage
                localStorage.setItem('walletAddress', address)
                
                // Show success message
                setSignupSuccess(true)
                
                // Redirect to dashboard after a delay
                setTimeout(() => {
                  router.push('/dashboard')
                }, 2000)
              }}
              onSkip={() => setShowWalletConnect(false)}
            />
          </AnimatedCard>
        ) : signupSuccess ? (
          <FadeInView className="bg-primary-800/30 backdrop-blur-sm border border-primary-700/50 shadow-xl rounded-lg p-6 text-center">
            <CheckCircleIcon className="h-12 w-12 text-green-400 mx-auto mb-4" />
            <GlowingText 
              as="h2" 
              className="text-xl font-semibold text-white mb-2"
              glowColor="rgba(255, 255, 255, 0.6)"
              glowIntensity="medium"
            >
              Account Created Successfully!
            </GlowingText>
            <p className="text-gray-300 mb-4">
              Welcome to BetPilot. Preparing wallet connection...
            </p>
          </FadeInView>
        ) : signupSuccess && showWalletConnect ? (
          <FadeInView>
            <SuiWalletConnect 
              onSuccess={(address) => {
                setWalletAddress(address)
                setWalletConnected(true)
                
                // Redirect to dashboard after wallet connection
                setTimeout(() => {
                  router.push('/')
                }, 1500)
              }}
              onSkip={() => {
                // Skip wallet connection and go to dashboard
                router.push('/')
              }}
            />
          </FadeInView>
        ) : (
          <AnimatedCard delay={0.3} className="bg-primary-800/30 backdrop-blur-sm border border-primary-700/50 shadow-xl rounded-lg p-6">
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
                
                {/* Username Field */}
                <div>
                  <label htmlFor="username" className="block text-sm font-medium text-white mb-1">
                    Username
                  </label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    className={`w-full rounded-md border ${errors.username ? 'border-red-500' : 'border-gray-700'} bg-primary-800/50 text-white shadow-sm focus:border-primary-500 focus:ring-primary-500`}
                    placeholder="betmaster123"
                  />
                  {errors.username && (
                    <p className="mt-1 text-sm text-red-400 flex items-center">
                      <ExclamationCircleIcon className="h-4 w-4 mr-1" />
                      {errors.username}
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
                
                {/* Confirm Password Field */}
                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-white mb-1">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className={`w-full rounded-md border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-700'} bg-primary-800/50 text-white shadow-sm focus:border-primary-500 focus:ring-primary-500`}
                    placeholder="••••••••"
                  />
                  {errors.confirmPassword && (
                    <p className="mt-1 text-sm text-red-400 flex items-center">
                      <ExclamationCircleIcon className="h-4 w-4 mr-1" />
                      {errors.confirmPassword}
                    </p>
                  )}
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
                        Creating Account...
                      </>
                    ) : (
                      'Sign Up'
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
                
                {/* Wallet Signup Button */}
                <div className="mt-6">
                  <button
                    type="button"
                    onClick={() => setShowWalletConnect(true)}
                    className="w-full flex justify-center items-center py-2 px-4 border border-gray-700 rounded-md shadow-sm text-sm font-medium text-white bg-primary-700 hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors duration-200"
                  >
                    <WalletIcon className="h-5 w-5 mr-2" />
                    Sign Up with Wallet
                  </button>
                </div>
                
                {/* Login Link */}
                <div className="text-center mt-4">
                  <p className="text-sm text-gray-300">
                    Already have an account?{' '}
                    <Link href="/login" className="text-blue-400 hover:text-blue-300 transition-colors duration-200">
                      Log in
                    </Link>
                  </p>
                </div>
              </div>
            </form>
          </AnimatedCard>
        )}
      </div>
      
      {/* Back Button */}
      <div className="text-center mt-6">
        <Link href="/welcome" className="text-sm font-semibold text-gray-300 hover:text-white transition-colors duration-200">
          ← Back to Welcome Page
        </Link>
      </div>
    </div>
  )
}

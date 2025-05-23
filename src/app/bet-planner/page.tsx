'use client'

import { useState } from 'react'
import { ArrowPathIcon, ChartBarIcon, ShieldCheckIcon, ExclamationTriangleIcon, CalendarIcon, ChartPieIcon } from '@heroicons/react/24/outline'
import AnimatedSection, { AnimatedCard, AnimatedText, FadeInView } from '@/components/AnimatedSection'
import GlowingText from '@/components/GlowingText'
import WeeklyTargetPlanner from '@/components/WeeklyTargetPlanner'
import LiveOddsSpectrum from '@/components/LiveOddsSpectrum'

// Mock data for betting recommendations
const MOCK_RECOMMENDATIONS = [
  {
    id: 1,
    type: 'Low Risk',
    icon: <ShieldCheckIcon className="h-6 w-6 text-green-500" />,
    options: [
      {
        id: 101,
        event: 'Manchester City vs Tottenham',
        market: 'Double Chance',
        selection: 'Man City or Draw',
        odds: 1.25,
        probability: '80%',
        expectedReturn: 125,
        riskRating: 'Low',
        confidence: 'Very High',
      },
      {
        id: 102,
        event: 'Bayern Munich vs Dortmund',
        market: 'Total Goals',
        selection: 'Over 1.5',
        odds: 1.35,
        probability: '74%',
        expectedReturn: 135,
        riskRating: 'Low',
        confidence: 'High',
      },
    ]
  },
  {
    id: 2,
    type: 'Medium Risk',
    icon: <ChartBarIcon className="h-6 w-6 text-yellow-500" />,
    options: [
      {
        id: 201,
        event: 'Real Madrid vs Barcelona',
        market: 'Match Result',
        selection: 'Real Madrid',
        odds: 2.1,
        probability: '47%',
        expectedReturn: 210,
        riskRating: 'Medium',
        confidence: 'Medium',
      },
      {
        id: 202,
        event: 'Los Angeles Lakers vs Brooklyn Nets',
        market: 'Point Spread',
        selection: 'Lakers -4.5',
        odds: 1.9,
        probability: '52%',
        expectedReturn: 190,
        riskRating: 'Medium',
        confidence: 'Medium',
      },
    ]
  },
  {
    id: 3,
    type: 'High Risk',
    icon: <ExclamationTriangleIcon className="h-6 w-6 text-red-500" />,
    options: [
      {
        id: 301,
        event: 'Tyson Fury vs Anthony Joshua',
        market: 'Method of Victory',
        selection: 'Fury by KO/TKO',
        odds: 4.5,
        probability: '22%',
        expectedReturn: 450,
        riskRating: 'High',
        confidence: 'Low',
      },
      {
        id: 302,
        event: 'French Open - Final',
        market: 'Correct Score',
        selection: '3-2 in Sets',
        odds: 5.0,
        probability: '20%',
        expectedReturn: 500,
        riskRating: 'High',
        confidence: 'Low',
      },
    ]
  },
]

export default function BetPlannerPage() {
  const [stake, setStake] = useState<string>('100')
  const [targetReturn, setTargetReturn] = useState<string>('200')
  const [targetPercentage, setTargetPercentage] = useState<string>('50')
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [recommendations, setRecommendations] = useState<any[]>([])
  const [activeTab, setActiveTab] = useState<string>('recommendations')

  const handleCalculate = () => {
    setIsLoading(true)
    
    // Simulate API call with setTimeout
    setTimeout(() => {
      const stakeValue = parseFloat(stake)
      const targetReturnValue = parseFloat(targetReturn)
      
      // Calculate expected returns based on stake
      const calculatedRecommendations = MOCK_RECOMMENDATIONS.map(category => {
        const updatedOptions = category.options.map(option => {
          return {
            ...option,
            expectedReturn: Math.round(stakeValue * option.odds)
          }
        })
        
        return {
          ...category,
          options: updatedOptions
        }
      })
      
      setRecommendations(calculatedRecommendations)
      setIsLoading(false)
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-900 to-primary-950 pt-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 relative z-10">
        <AnimatedSection>
          <div className="text-center mb-12">
            <AnimatedText>
              <GlowingText 
                as="h1" 
                className="text-3xl font-bold text-white sm:text-4xl"
                glowColor="rgba(255, 255, 255, 0.6)"
                glowIntensity="medium"
              >
                📈 Smart Bet Planner
              </GlowingText>
            </AnimatedText>
            <AnimatedText delay={0.1}>
              <GlowingText 
                as="p" 
                className="mt-3 max-w-2xl mx-auto text-xl text-gray-300 sm:mt-4"
                glowColor="rgba(209, 213, 219, 0.5)"
                glowIntensity="light"
              >
                Plan your bets with risk management and discipline to maximize returns
              </GlowingText>
            </AnimatedText>
          </div>
        </AnimatedSection>
        
        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <nav className="flex space-x-4" aria-label="Tabs">
            <button
              onClick={() => setActiveTab('recommendations')}
              className={`px-3 py-2 font-medium text-sm rounded-md ${activeTab === 'recommendations' ? 'bg-blue-600 text-white' : 'text-gray-300 hover:text-white hover:bg-primary-800/50'}`}
            >
              <span className="flex items-center">
                <ChartPieIcon className="-ml-0.5 mr-2 h-5 w-5" />
                Bet Recommendations
              </span>
            </button>
            <button
              onClick={() => setActiveTab('weekly-target')}
              className={`px-3 py-2 font-medium text-sm rounded-md ${activeTab === 'weekly-target' ? 'bg-blue-600 text-white' : 'text-gray-300 hover:text-white hover:bg-primary-800/50'}`}
            >
              <span className="flex items-center">
                <CalendarIcon className="-ml-0.5 mr-2 h-5 w-5" />
                Weekly Target Planner
              </span>
            </button>
            <button
              onClick={() => setActiveTab('live-odds')}
              className={`px-3 py-2 font-medium text-sm rounded-md ${activeTab === 'live-odds' ? 'bg-blue-600 text-white' : 'text-gray-300 hover:text-white hover:bg-primary-800/50'}`}
            >
              <span className="flex items-center">
                <ArrowPathIcon className="-ml-0.5 mr-2 h-5 w-5" />
                Live Odds Spectrum
              </span>
            </button>
          </nav>
        </div>
        
        {activeTab === 'recommendations' && (
        <AnimatedCard delay={0.2} className="max-w-3xl mx-auto bg-primary-800/30 backdrop-blur-sm border border-primary-700/50 shadow-xl rounded-lg p-6 mb-10">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label htmlFor="stake" className="block text-sm font-medium text-white">
                Your Stake ($)
              </label>
              <div className="mt-1">
                <input
                  type="number"
                  name="stake"
                  id="stake"
                  className="input"
                  value={stake}
                  onChange={(e) => setStake(e.target.value)}
                  min="1"
                />
              </div>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                How much are you willing to bet?
              </p>
            </div>
            
            <div>
              <label htmlFor="targetReturn" className="block text-sm font-medium text-white">
                Target Return ($)
              </label>
              <div className="mt-1">
                <input
                  type="number"
                  name="targetReturn"
                  id="targetReturn"
                  className="input"
                  value={targetReturn}
                  onChange={(e) => setTargetReturn(e.target.value)}
                  min="1"
                />
              </div>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                How much would you like to win?
              </p>
            </div>
          </div>
          
          <div className="mt-6">
            <button
              type="button"
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              onClick={handleCalculate}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <ArrowPathIcon className="animate-spin -ml-1 mr-2 h-4 w-4" />
                  Calculating...
                </>
              ) : (
                'Calculate Betting Plan'
              )}
            </button>
          </div>
        </AnimatedCard>
        )}
        
        {/* Weekly Target Planner Tab */}
        {activeTab === 'weekly-target' && (
          <FadeInView>
            <div className="max-w-5xl mx-auto mb-10">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 mb-6">
                <AnimatedCard delay={0.2} className="bg-primary-800/30 backdrop-blur-sm border border-primary-700/50 shadow-xl rounded-lg p-6">
                  <label htmlFor="stake" className="block text-sm font-medium text-white">
                    Your Stake ($)
                  </label>
                  <div className="mt-1">
                    <input
                      type="number"
                      name="stake"
                      id="stake"
                      className="input"
                      value={stake}
                      onChange={(e) => setStake(e.target.value)}
                      min="1"
                    />
                  </div>
                  <p className="mt-2 text-xs text-gray-400">Your initial investment amount</p>
                </AnimatedCard>
                
                <AnimatedCard delay={0.3} className="bg-primary-800/30 backdrop-blur-sm border border-primary-700/50 shadow-xl rounded-lg p-6">
                  <label htmlFor="targetPercentage" className="block text-sm font-medium text-white">
                    Weekly Target (%)
                  </label>
                  <div className="mt-1">
                    <input
                      type="number"
                      name="targetPercentage"
                      id="targetPercentage"
                      className="input"
                      value={targetPercentage}
                      onChange={(e) => setTargetPercentage(e.target.value)}
                      min="1"
                      max="200"
                    />
                  </div>
                  <p className="mt-2 text-xs text-gray-400">Percentage of stake as weekly profit goal</p>
                </AnimatedCard>
                
                <AnimatedCard delay={0.4} className="bg-primary-800/30 backdrop-blur-sm border border-primary-700/50 shadow-xl rounded-lg p-6">
                  <div className="h-full flex flex-col justify-between">
                    <div>
                      <h3 className="text-lg font-medium text-white">Weekly Target</h3>
                      <p className="mt-1 text-sm text-gray-300">Your calculated weekly profit goal</p>
                    </div>
                    <div className="mt-4">
                      <div className="text-3xl font-bold text-green-400">
                        ${(parseFloat(stake) * parseFloat(targetPercentage) / 100).toFixed(2)}
                      </div>
                      <p className="text-xs text-gray-400 mt-1">Based on {targetPercentage}% of ${stake}</p>
                    </div>
                  </div>
                </AnimatedCard>
              </div>
              
              <WeeklyTargetPlanner 
                initialStake={parseFloat(stake)} 
                targetPercentage={parseFloat(targetPercentage)} 
              />
            </div>
          </FadeInView>
        )}
        
        {/* Live Odds Spectrum Tab */}
        {activeTab === 'live-odds' && (
          <FadeInView>
            <div className="max-w-5xl mx-auto mb-10">
              <LiveOddsSpectrum initialStake={parseFloat(stake)} />
            </div>
          </FadeInView>
        )}
        
        {activeTab === 'recommendations' && recommendations.length > 0 && (
          <div className="space-y-8 mt-10">
            {recommendations.map((category) => (
              <div key={category.id} className="bg-primary-800/30 backdrop-blur-sm border border-primary-700/50 shadow-xl rounded-lg overflow-hidden">
                <div className="px-4 py-5 sm:px-6 flex items-center">
                  <div className="mr-4">
                    {category.icon}
                  </div>
                  <div>
                    <h3 className="text-lg leading-6 font-medium text-white">
                      {category.type} Betting Options
                    </h3>
                    <p className="mt-1 max-w-2xl text-sm text-gray-300">
                      {category.type === 'Low Risk' ? 'Safer bets with lower returns' : 
                       category.type === 'Medium Risk' ? 'Balanced risk and reward options' : 
                       'Higher risk bets with potential for larger returns'}
                    </p>
                  </div>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-700">
                    <thead className="bg-primary-800/50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                          Event
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                          Selection
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                          Odds
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                          Probability
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                          Expected Return
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700">
                      {category.options.map((bet) => (
                        <tr key={bet.id} className="hover:bg-primary-700/30">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
                            {bet.event}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                            <div>{bet.market}</div>
                            <div className="font-medium text-blue-400">{bet.selection}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                            <span className="px-2 py-1 rounded bg-blue-900/30 text-blue-300 font-medium">
                              {bet.odds}x
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                            {bet.probability}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              bet.expectedReturn >= parseFloat(targetReturn)
                                ? 'bg-green-800 text-green-100'
                                : 'bg-yellow-800 text-yellow-100'
                            }`}>
                              ${bet.expectedReturn}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

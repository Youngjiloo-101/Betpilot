'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowPathIcon, CheckCircleIcon, ExclamationCircleIcon, ChartBarIcon } from '@heroicons/react/24/outline'
import GlowingText from './GlowingText'

interface BetOption {
  id: number
  event: string
  market: string
  selection: string
  odds: number
  probability: string
  riskPercentage: number
  expectedReturn: number
  date: string
  time: string
  sport: string
  bookmaker: string
}

interface WeeklyTargetPlannerProps {
  initialStake: number
  targetPercentage: number
}

export default function WeeklyTargetPlanner({ initialStake, targetPercentage }: WeeklyTargetPlannerProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [weeklyPlan, setWeeklyPlan] = useState<BetOption[]>([])
  const [weeklyTarget, setWeeklyTarget] = useState<number>(0)
  const [currentProgress, setCurrentProgress] = useState<number>(0)
  
  // Calculate the weekly target amount based on the stake and target percentage
  const calculateWeeklyTarget = (stake: number, percentage: number) => {
    return stake * (percentage / 100)
  }
  
  // Generate a weekly betting plan
  const generateWeeklyPlan = () => {
    setIsLoading(true)
    
    // Calculate the weekly target amount
    const target = calculateWeeklyTarget(initialStake, targetPercentage)
    setWeeklyTarget(target)
    
    // Mock data for the weekly plan
    // In a real application, this would come from an API or algorithm
    setTimeout(() => {
      const mockWeeklyPlan: BetOption[] = [
        {
          id: 1,
          event: 'Liverpool vs Manchester City',
          market: 'Double Chance',
          selection: 'Liverpool or Draw',
          odds: 1.45,
          probability: '68%',
          riskPercentage: 15,
          expectedReturn: initialStake * 0.15 * 1.45,
          date: '2025-05-13',
          time: '15:00',
          sport: 'Football',
          bookmaker: 'Bet365'
        },
        {
          id: 2,
          event: 'Arsenal vs Chelsea',
          market: 'Both Teams to Score',
          selection: 'Yes',
          odds: 1.75,
          probability: '57%',
          riskPercentage: 10,
          expectedReturn: initialStake * 0.10 * 1.75,
          date: '2025-05-14',
          time: '19:45',
          sport: 'Football',
          bookmaker: 'Betfair'
        },
        {
          id: 3,
          event: 'Los Angeles Lakers vs Golden State Warriors',
          market: 'Total Points',
          selection: 'Over 219.5',
          odds: 1.90,
          probability: '52%',
          riskPercentage: 12,
          expectedReturn: initialStake * 0.12 * 1.90,
          date: '2025-05-15',
          time: '20:30',
          sport: 'Basketball',
          bookmaker: 'DraftKings'
        },
        {
          id: 4,
          event: 'Novak Djokovic vs Rafael Nadal',
          market: 'Match Winner',
          selection: 'Djokovic',
          odds: 1.65,
          probability: '60%',
          riskPercentage: 15,
          expectedReturn: initialStake * 0.15 * 1.65,
          date: '2025-05-16',
          time: '14:00',
          sport: 'Tennis',
          bookmaker: 'Unibet'
        },
        {
          id: 5,
          event: 'New York Yankees vs Boston Red Sox',
          market: 'Money Line',
          selection: 'Yankees',
          odds: 1.55,
          probability: '64%',
          riskPercentage: 18,
          expectedReturn: initialStake * 0.18 * 1.55,
          date: '2025-05-17',
          time: '18:05',
          sport: 'Baseball',
          bookmaker: 'FanDuel'
        }
      ]
      
      // Calculate the total expected return
      const totalExpectedReturn = mockWeeklyPlan.reduce((total, bet) => total + bet.expectedReturn, 0)
      const progressPercentage = (totalExpectedReturn / target) * 100
      
      setWeeklyPlan(mockWeeklyPlan)
      setCurrentProgress(Math.min(progressPercentage, 100))
      setIsLoading(false)
    }, 1500)
  }
  
  return (
    <div className="bg-primary-800/30 backdrop-blur-sm border border-primary-700/50 shadow-xl rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <GlowingText 
            as="h2" 
            className="text-xl font-bold text-white"
            glowColor="rgba(255, 255, 255, 0.6)"
            glowIntensity="medium"
          >
            Weekly Target Planner
          </GlowingText>
          <p className="mt-1 text-gray-300 text-sm">
            Plan your bets to achieve a weekly profit target of {targetPercentage}% on your stake
          </p>
        </div>
        <button
          onClick={generateWeeklyPlan}
          disabled={isLoading}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          {isLoading ? (
            <>
              <ArrowPathIcon className="animate-spin -ml-1 mr-2 h-5 w-5" />
              Generating...
            </>
          ) : (
            <>
              <ChartBarIcon className="-ml-1 mr-2 h-5 w-5" />
              Generate Plan
            </>
          )}
        </button>
      </div>
      
      {weeklyPlan.length > 0 && (
        <div className="space-y-6">
          <div className="bg-primary-700/30 rounded-lg p-4">
            <div className="flex justify-between items-center mb-2">
              <div>
                <span className="text-sm text-gray-300">Weekly Target:</span>
                <span className="ml-2 text-lg font-bold text-white">${weeklyTarget.toFixed(2)}</span>
              </div>
              <div>
                <span className="text-sm text-gray-300">Expected Return:</span>
                <span className="ml-2 text-lg font-bold text-green-400">
                  ${weeklyPlan.reduce((total, bet) => total + bet.expectedReturn, 0).toFixed(2)}
                </span>
              </div>
            </div>
            
            <div className="w-full bg-gray-700 rounded-full h-2.5">
              <motion.div 
                className="bg-green-500 h-2.5 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${currentProgress}%` }}
                transition={{ duration: 1 }}
              />
            </div>
            <div className="flex justify-between mt-1">
              <span className="text-xs text-gray-400">0%</span>
              <span className="text-xs text-gray-400">{currentProgress.toFixed(0)}% of target</span>
              <span className="text-xs text-gray-400">100%</span>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-700">
              <thead className="bg-primary-800/50">
                <tr>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Day
                  </th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Event
                  </th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Selection
                  </th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Odds
                  </th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Risk %
                  </th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Stake
                  </th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Return
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {weeklyPlan.map((bet) => (
                  <tr key={bet.id} className="hover:bg-primary-700/30">
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300">
                      <div className="font-medium">{new Date(bet.date).toLocaleDateString('en-US', { weekday: 'short' })}</div>
                      <div className="text-xs text-gray-400">{bet.date}</div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-white">
                      <div>{bet.event}</div>
                      <div className="text-xs text-gray-400">{bet.sport} • {bet.time}</div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm">
                      <div className="text-gray-300">{bet.market}</div>
                      <div className="font-medium text-blue-400">{bet.selection}</div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm">
                      <span className="px-2 py-1 rounded bg-blue-900/30 text-blue-300 font-medium">
                        {bet.odds}
                      </span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm">
                      <span className={`px-2 py-1 rounded font-medium
                        ${bet.riskPercentage <= 10 ? 'bg-green-900/30 text-green-300' : 
                          bet.riskPercentage <= 15 ? 'bg-yellow-900/30 text-yellow-300' : 
                          'bg-red-900/30 text-red-300'}`}>
                        {bet.riskPercentage}%
                      </span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300">
                      ${(initialStake * (bet.riskPercentage / 100)).toFixed(2)}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-green-400">
                      ${bet.expectedReturn.toFixed(2)}
                    </td>
                  </tr>
                ))}
                <tr className="bg-primary-700/50">
                  <td colSpan={5} className="px-4 py-3 whitespace-nowrap text-sm font-medium text-white text-right">
                    Total:
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-white">
                    ${weeklyPlan.reduce((total, bet) => total + (initialStake * (bet.riskPercentage / 100)), 0).toFixed(2)}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-green-400">
                    ${weeklyPlan.reduce((total, bet) => total + bet.expectedReturn, 0).toFixed(2)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <div className="bg-blue-900/30 border border-blue-700/50 rounded-lg p-4 text-sm text-blue-300">
            <div className="flex items-start">
              <InformationIcon className="h-5 w-5 mr-2 flex-shrink-0" />
              <div>
                <p className="font-medium">Risk Management Strategy</p>
                <p className="mt-1">This weekly plan distributes your stake across multiple bets to minimize risk while targeting a {targetPercentage}% return. The risk percentage indicates how much of your initial stake to wager on each bet.</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function InformationIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
    </svg>
  )
}

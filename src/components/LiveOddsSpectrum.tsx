'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowPathIcon, ChartBarIcon, ArrowsRightLeftIcon } from '@heroicons/react/24/outline'
import GlowingText from './GlowingText'

interface LiveOddsOption {
  id: number
  event: string
  market: string
  selection: string
  odds: number
  probability: string
  riskPercentage: number
  bookmaker: string
  sport: string
  startTime: string
  movement: 'up' | 'down' | 'stable'
  movementValue: number
}

interface LiveOddsSpectrumProps {
  initialStake: number
}

export default function LiveOddsSpectrum({ initialStake }: LiveOddsSpectrumProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [liveOdds, setLiveOdds] = useState<LiveOddsOption[]>([])
  const [riskFilter, setRiskFilter] = useState<string>('all')
  const [sportFilter, setSportFilter] = useState<string>('all')
  
  // Fetch live odds data
  const fetchLiveOdds = () => {
    setIsLoading(true)
    
    // Mock data for live odds
    // In a real application, this would come from an API
    setTimeout(() => {
      const mockLiveOdds: LiveOddsOption[] = [
        {
          id: 1,
          event: 'Manchester United vs Liverpool',
          market: 'Match Result',
          selection: 'Manchester United',
          odds: 3.8,
          probability: '26.3%',
          riskPercentage: 25,
          bookmaker: 'Betfair',
          sport: 'Football',
          startTime: '2025-05-13T15:00:00Z',
          movement: 'up',
          movementValue: 0.2
        },
        {
          id: 2,
          event: 'Arsenal vs Chelsea',
          market: 'Both Teams to Score',
          selection: 'Yes',
          odds: 1.75,
          probability: '57.1%',
          riskPercentage: 10,
          bookmaker: 'Bet365',
          sport: 'Football',
          startTime: '2025-05-14T19:45:00Z',
          movement: 'down',
          movementValue: 0.05
        },
        {
          id: 3,
          event: 'Los Angeles Lakers vs Golden State Warriors',
          market: 'Total Points',
          selection: 'Over 220.5',
          odds: 1.9,
          probability: '52.6%',
          riskPercentage: 15,
          bookmaker: 'DraftKings',
          sport: 'Basketball',
          startTime: '2025-05-15T02:30:00Z',
          movement: 'stable',
          movementValue: 0
        },
        {
          id: 4,
          event: 'Novak Djokovic vs Rafael Nadal',
          market: 'Match Winner',
          selection: 'Rafael Nadal',
          odds: 2.5,
          probability: '40.0%',
          riskPercentage: 20,
          bookmaker: 'Unibet',
          sport: 'Tennis',
          startTime: '2025-05-12T12:00:00Z',
          movement: 'down',
          movementValue: 0.3
        },
        {
          id: 5,
          event: 'New York Yankees vs Boston Red Sox',
          market: 'Run Line',
          selection: 'Yankees -1.5',
          odds: 2.2,
          probability: '45.5%',
          riskPercentage: 18,
          bookmaker: 'FanDuel',
          sport: 'Baseball',
          startTime: '2025-05-11T23:00:00Z',
          movement: 'up',
          movementValue: 0.15
        },
        {
          id: 6,
          event: 'Jon Jones vs Stipe Miocic',
          market: 'Method of Victory',
          selection: 'Jones by KO/TKO',
          odds: 3.5,
          probability: '28.6%',
          riskPercentage: 30,
          bookmaker: 'Unibet',
          sport: 'MMA',
          startTime: '2025-05-15T03:00:00Z',
          movement: 'up',
          movementValue: 0.5
        },
        {
          id: 7,
          event: 'Toronto Maple Leafs vs Montreal Canadiens',
          market: 'Total Goals',
          selection: 'Under 5.5',
          odds: 1.85,
          probability: '54.1%',
          riskPercentage: 12,
          bookmaker: 'FanDuel',
          sport: 'Hockey',
          startTime: '2025-05-11T00:00:00Z',
          movement: 'stable',
          movementValue: 0
        },
      ]
      
      setLiveOdds(mockLiveOdds)
      setIsLoading(false)
    }, 1500)
  }
  
  // Filter odds based on risk percentage
  const getFilteredOdds = () => {
    let filtered = [...liveOdds]
    
    // Apply risk filter
    if (riskFilter === 'low') {
      filtered = filtered.filter(odds => odds.riskPercentage <= 15)
    } else if (riskFilter === 'medium') {
      filtered = filtered.filter(odds => odds.riskPercentage > 15 && odds.riskPercentage <= 25)
    } else if (riskFilter === 'high') {
      filtered = filtered.filter(odds => odds.riskPercentage > 25)
    }
    
    // Apply sport filter
    if (sportFilter !== 'all') {
      filtered = filtered.filter(odds => odds.sport === sportFilter)
    }
    
    return filtered
  }
  
  // Get unique sports from live odds
  const getUniqueSports = () => {
    return Array.from(new Set(liveOdds.map(odds => odds.sport)))
  }
  
  // Format date and time
  const formatDateTime = (dateTimeString: string) => {
    const date = new Date(dateTimeString)
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }
  
  // Load live odds on component mount
  useEffect(() => {
    fetchLiveOdds()
  }, [])
  
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
            Live Odds Spectrum
          </GlowingText>
          <p className="mt-1 text-gray-300 text-sm">
            Real-time odds with risk assessment to help you make informed decisions
          </p>
        </div>
        <button
          onClick={fetchLiveOdds}
          disabled={isLoading}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          {isLoading ? (
            <>
              <ArrowPathIcon className="animate-spin -ml-1 mr-2 h-5 w-5" />
              Refreshing...
            </>
          ) : (
            <>
              <ArrowsRightLeftIcon className="-ml-1 mr-2 h-5 w-5" />
              Refresh Odds
            </>
          )}
        </button>
      </div>
      
      {liveOdds.length > 0 && (
        <div className="space-y-6">
          <div className="flex flex-wrap gap-4">
            <div>
              <label htmlFor="riskFilter" className="block text-sm font-medium text-gray-300">
                Risk Level
              </label>
              <select
                id="riskFilter"
                value={riskFilter}
                onChange={(e) => setRiskFilter(e.target.value)}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md bg-primary-700/50 text-white border-primary-600"
              >
                <option value="all">All Risks</option>
                <option value="low">Low Risk (≤15%)</option>
                <option value="medium">Medium Risk (16-25%)</option>
                <option value="high">High Risk (&gt;25%)</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="sportFilter" className="block text-sm font-medium text-gray-300">
                Sport
              </label>
              <select
                id="sportFilter"
                value={sportFilter}
                onChange={(e) => setSportFilter(e.target.value)}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md bg-primary-700/50 text-white border-primary-600"
              >
                <option value="all">All Sports</option>
                {getUniqueSports().map((sport) => (
                  <option key={sport} value={sport}>{sport}</option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-700">
              <thead className="bg-primary-800/50">
                <tr>
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
                    Movement
                  </th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Risk %
                  </th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Bookmaker
                  </th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Time
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {getFilteredOdds().map((odds) => (
                  <tr key={odds.id} className="hover:bg-primary-700/30">
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-white">
                      <div>{odds.event}</div>
                      <div className="text-xs text-gray-400">{odds.sport}</div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm">
                      <div className="text-gray-300">{odds.market}</div>
                      <div className="font-medium text-blue-400">{odds.selection}</div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm">
                      <span className="px-2 py-1 rounded bg-blue-900/30 text-blue-300 font-medium">
                        {odds.odds}
                      </span>
                      <div className="text-xs text-gray-400 mt-1">
                        Prob: {odds.probability}
                      </div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm">
                      <div className="flex items-center">
                        {odds.movement === 'up' ? (
                          <span className="text-green-400 flex items-center">
                            <ArrowUpIcon className="h-4 w-4 mr-1" />
                            +{odds.movementValue.toFixed(2)}
                          </span>
                        ) : odds.movement === 'down' ? (
                          <span className="text-red-400 flex items-center">
                            <ArrowDownIcon className="h-4 w-4 mr-1" />
                            -{odds.movementValue.toFixed(2)}
                          </span>
                        ) : (
                          <span className="text-gray-400 flex items-center">
                            <ArrowRightIcon className="h-4 w-4 mr-1" />
                            0.00
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm">
                      <span className={`px-2 py-1 rounded font-medium
                        ${odds.riskPercentage <= 15 ? 'bg-green-900/30 text-green-300' : 
                          odds.riskPercentage <= 25 ? 'bg-yellow-900/30 text-yellow-300' : 
                          'bg-red-900/30 text-red-300'}`}>
                        {odds.riskPercentage}%
                      </span>
                      <div className="text-xs text-gray-400 mt-1">
                        ${(initialStake * (odds.riskPercentage / 100)).toFixed(2)}
                      </div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300">
                      {odds.bookmaker}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300">
                      {formatDateTime(odds.startTime)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="bg-blue-900/30 border border-blue-700/50 rounded-lg p-4 text-sm text-blue-300">
            <div className="flex items-start">
              <InformationIcon className="h-5 w-5 mr-2 flex-shrink-0" />
              <div>
                <p className="font-medium">Understanding Risk Percentages</p>
                <p className="mt-1">The risk percentage indicates the recommended portion of your stake to wager on each bet. Lower percentages (green) represent safer bets, while higher percentages (red) indicate higher risk but potentially higher rewards.</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// Arrow icons for odds movement
function ArrowUpIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 10.5L12 3m0 0l7.5 7.5M12 3v18" />
    </svg>
  )
}

function ArrowDownIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3" />
    </svg>
  )
}

function ArrowRightIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
    </svg>
  )
}

function InformationIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
    </svg>
  )
}

'use client'

import { useState, useEffect } from 'react'
import { ArrowPathIcon, ChartBarIcon, ClockIcon, CheckCircleIcon, InformationCircleIcon } from '@heroicons/react/24/outline'
import AnimatedSection, { AnimatedCard, AnimatedText, StaggeredContainer, StaggeredItem, FadeInView, PulseAnimation } from '@/components/AnimatedSection'
import GlowingText from '@/components/GlowingText'
import BetPilotLogo from '@/components/BetPilotLogo'
import RotatingSuiLogo from '@/components/RotatingSuiLogo'
import BettingInsightPanel from '@/components/BettingInsightPanel'

// Types for betting options
interface BettingOption {
  id: number;
  event: string;
  market: string;
  selection: string;
  odds: number;
  probability: string;
  confidence: 'Low' | 'Medium' | 'High';
  startTime: string;
  league?: string;
  sport: 'Football' | 'Basketball' | 'Tennis' | 'Baseball' | 'Hockey' | 'MMA' | 'Cricket';
  bookmaker: string;
  trend?: 'up' | 'down' | 'stable';
}

// Extended mock data for betting options
const MOCK_BETTING_OPTIONS: BettingOption[] = [
  {
    id: 1,
    event: 'Manchester United vs Liverpool',
    market: 'Match Result',
    selection: 'Manchester United',
    odds: 3.8,
    probability: '26.3%',
    confidence: 'Medium',
    startTime: '2025-05-10T15:00:00Z',
    league: 'Premier League',
    sport: 'Football',
    bookmaker: 'Betfair',
    trend: 'up',
  },
  {
    id: 2,
    event: 'Arsenal vs Chelsea',
    market: 'Both Teams to Score',
    selection: 'Yes',
    odds: 4.1,
    probability: '24.4%',
    confidence: 'High',
    startTime: '2025-05-11T14:00:00Z',
    league: 'Premier League',
    sport: 'Football',
    bookmaker: 'Bet365',
    trend: 'stable',
  },
  {
    id: 3,
    event: 'Los Angeles Lakers vs Golden State Warriors',
    market: 'Total Points',
    selection: 'Over 220.5',
    odds: 3.9,
    probability: '25.6%',
    confidence: 'Medium',
    startTime: '2025-05-10T02:30:00Z',
    league: 'NBA',
    sport: 'Basketball',
    bookmaker: 'DraftKings',
    trend: 'down',
  },
  {
    id: 4,
    event: 'Novak Djokovic vs Rafael Nadal',
    market: 'Match Winner',
    selection: 'Rafael Nadal',
    odds: 4.2,
    probability: '23.8%',
    confidence: 'Medium',
    startTime: '2025-05-12T12:00:00Z',
    league: 'ATP Masters',
    sport: 'Tennis',
    bookmaker: 'Unibet',
    trend: 'up',
  },
  {
    id: 5,
    event: 'New York Yankees vs Boston Red Sox',
    market: 'Run Line',
    selection: 'Yankees -1.5',
    odds: 3.95,
    probability: '25.3%',
    confidence: 'High',
    startTime: '2025-05-11T23:00:00Z',
    league: 'MLB',
    sport: 'Baseball',
    bookmaker: 'FanDuel',
    trend: 'stable',
  },
  {
    id: 6,
    event: 'Barcelona vs Real Madrid',
    market: 'Asian Handicap',
    selection: 'Barcelona -0.5',
    odds: 4.0,
    probability: '25.0%',
    confidence: 'High',
    startTime: '2025-05-13T19:00:00Z',
    league: 'La Liga',
    sport: 'Football',
    bookmaker: 'Betfair',
    trend: 'up',
  },
  {
    id: 7,
    event: 'Boston Celtics vs Miami Heat',
    market: 'Handicap',
    selection: 'Miami Heat +7.5',
    odds: 4.15,
    probability: '24.1%',
    confidence: 'Medium',
    startTime: '2025-05-12T00:00:00Z',
    league: 'NBA',
    sport: 'Basketball',
    bookmaker: 'DraftKings',
    trend: 'down',
  },
  {
    id: 8,
    event: 'India vs Australia',
    market: 'Match Winner',
    selection: 'India',
    odds: 3.75,
    probability: '26.7%',
    confidence: 'Medium',
    startTime: '2025-05-14T09:00:00Z',
    league: 'International',
    sport: 'Cricket',
    bookmaker: 'Bet365',
    trend: 'stable',
  },
  {
    id: 9,
    event: 'Jon Jones vs Stipe Miocic',
    market: 'Method of Victory',
    selection: 'Jones by KO/TKO',
    odds: 4.25,
    probability: '23.5%',
    confidence: 'Medium',
    startTime: '2025-05-15T03:00:00Z',
    league: 'UFC',
    sport: 'MMA',
    bookmaker: 'Unibet',
    trend: 'up',
  },
  {
    id: 10,
    event: 'Toronto Maple Leafs vs Montreal Canadiens',
    market: 'Total Goals',
    selection: 'Under 5.5',
    odds: 3.85,
    probability: '26.0%',
    confidence: 'High',
    startTime: '2025-05-11T00:00:00Z',
    league: 'NHL',
    sport: 'Hockey',
    bookmaker: 'FanDuel',
    trend: 'down',
  },
]

export default function ReverseOddsPage() {
  const [targetOdds, setTargetOdds] = useState<string>('4.0')
  const [tolerance, setTolerance] = useState<string>('0.5')
  const [targetOddsError, setTargetOddsError] = useState<string>('')
  const [toleranceError, setToleranceError] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [results, setResults] = useState<BettingOption[]>([])
  const [selectedSports, setSelectedSports] = useState<string[]>([])
  const [selectedBookmakers, setSelectedBookmakers] = useState<string[]>([])
  const [selectedBet, setSelectedBet] = useState<BettingOption | null>(null)
  
  // Extract unique sports and bookmakers for filters
  const availableSports = Array.from(new Set(MOCK_BETTING_OPTIONS.map(bet => bet.sport)))
  const availableBookmakers = Array.from(new Set(MOCK_BETTING_OPTIONS.map(bet => bet.bookmaker)))

  // Validate input and convert to number
  const validateInput = (value: string): number | null => {
    // Remove any non-numeric characters except for decimal point
    const cleanedValue = value.replace(/[^0-9.]/g, '')
    const numValue = parseFloat(cleanedValue)
    
    if (isNaN(numValue)) {
      return null
    }
    
    return numValue
  }
  
  const handleSearch = () => {
    // Validate inputs before searching
    const targetOddsValue = validateInput(targetOdds)
    const toleranceValue = validateInput(tolerance)
    
    // Reset error messages
    setTargetOddsError('')
    setToleranceError('')
    
    // Validate target odds
    if (targetOddsValue === null || targetOddsValue < 1.1) {
      setTargetOddsError('Please enter a valid number greater than 1.1')
      return
    }
    
    // Validate tolerance
    if (toleranceValue === null || toleranceValue < 0.1) {
      setToleranceError('Please enter a valid number greater than 0.1')
      return
    }
    
    setIsLoading(true)
    
    // Simulate API call with setTimeout
    setTimeout(() => {
      
      let filteredResults = MOCK_BETTING_OPTIONS.filter(option => {
        // Filter by odds within tolerance range
        const oddsMatch = Math.abs(option.odds - targetOddsValue) <= toleranceValue
        
        // Apply sport filter if any sports are selected
        const sportMatch = selectedSports.length === 0 || 
          selectedSports.includes(option.sport)
        
        // Apply bookmaker filter if any bookmakers are selected
        const bookmakerMatch = selectedBookmakers.length === 0 || 
          selectedBookmakers.includes(option.bookmaker)
        
        return oddsMatch && sportMatch && bookmakerMatch
      })
      
      // Sort by closest to target odds
      filteredResults.sort((a, b) => {
        return Math.abs(a.odds - targetOddsValue) - Math.abs(b.odds - targetOddsValue)
      })
      
      setResults(filteredResults)
      setIsLoading(false)
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-900 to-primary-950 pt-24 relative">
      {/* Sui Logo in center of page */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-0 opacity-30">
        <RotatingSuiLogo size={300} />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 relative z-10">
        <AnimatedSection>
          <div className="text-center mb-12">
            <AnimatedText>
              <BetPilotLogo size="lg" />
              <GlowingText 
                as="h1" 
                className="mt-3 text-3xl font-bold text-white sm:text-4xl"
                glowColor="rgba(255, 255, 255, 0.6)"
                glowIntensity="medium"
              >
                🎯 Reverse Odds Engine
              </GlowingText>
            </AnimatedText>
            <AnimatedText delay={0.1}>
              <GlowingText 
                as="p" 
                className="mt-3 max-w-2xl mx-auto text-xl text-gray-300 sm:mt-4"
                glowColor="rgba(209, 213, 219, 0.5)"
                glowIntensity="light"
              >
                Input your target odds and get a list of matching bets from real-time data
              </GlowingText>
            </AnimatedText>
          </div>
        </AnimatedSection>
        
        <AnimatedCard delay={0.2} className="max-w-3xl mx-auto bg-primary-800/30 backdrop-blur-sm border border-primary-700/50 shadow-xl rounded-lg p-6 mb-10">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <AnimatedSection delay={0.3}>
              <div>
                <label htmlFor="targetOdds" className="block text-sm font-medium text-white">
                  Target Odds
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="targetOdds"
                    id="targetOdds"
                    className="input"
                    value={targetOdds}
                    onChange={(e) => setTargetOdds(e.target.value)}
                    placeholder="e.g. 4.0"
                  />
                  {targetOddsError && (
                    <p className="mt-1 text-sm text-red-400">
                      {targetOddsError}
                    </p>
                  )}
                </div>
                <p className="mt-2 text-sm text-gray-300">
                  Enter your desired odds multiplier
                </p>
              </div>
            </AnimatedSection>
            
            <AnimatedSection delay={0.4}>
              <div>
                <label htmlFor="tolerance" className="block text-sm font-medium text-white">
                  Tolerance Range (±)
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="tolerance"
                    id="tolerance"
                    className="input"
                    value={tolerance}
                    onChange={(e) => setTolerance(e.target.value)}
                    placeholder="e.g. 0.5"
                  />
                  {toleranceError && (
                    <p className="mt-1 text-sm text-red-400">
                      {toleranceError}
                    </p>
                  )}
                </div>
                <p className="mt-2 text-sm text-gray-300">
                  How close to your target odds (±)
                </p>
              </div>
            </AnimatedSection>
          </div>
          
          {/* Filters */}
          <AnimatedSection delay={0.5}>
            <div className="mt-6 border-t border-primary-700/50 pt-6">
              <h3 className="text-sm font-medium text-white mb-3">Filters</h3>
              
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {/* Sports filter */}
                <div>
                  <label className="text-sm text-gray-300 mb-2 block">Sports</label>
                  <div className="flex flex-wrap gap-2">
                    {availableSports.map(sport => (
                      <button
                        key={sport}
                        onClick={() => {
                          setSelectedSports(prev => 
                            prev.includes(sport) 
                              ? prev.filter(s => s !== sport) 
                              : [...prev, sport]
                          )
                        }}
                        className={`inline-flex items-center px-2.5 py-1.5 rounded-full text-xs font-medium transition-colors duration-200 ${
                          selectedSports.includes(sport)
                            ? 'bg-blue-600 text-white'
                            : 'bg-primary-700/50 text-gray-300 hover:bg-primary-700'
                        }`}
                      >
                        {sport}
                      </button>
                    ))}
                  </div>
                </div>
                
                {/* Bookmakers filter */}
                <div>
                  <label className="text-sm text-gray-300 mb-2 block">Bookmakers</label>
                  <div className="flex flex-wrap gap-2">
                    {availableBookmakers.map(bookmaker => (
                      <button
                        key={bookmaker}
                        onClick={() => {
                          setSelectedBookmakers(prev => 
                            prev.includes(bookmaker) 
                              ? prev.filter(b => b !== bookmaker) 
                              : [...prev, bookmaker]
                          )
                        }}
                        className={`inline-flex items-center px-2.5 py-1.5 rounded-full text-xs font-medium transition-colors duration-200 ${
                          selectedBookmakers.includes(bookmaker)
                            ? 'bg-blue-600 text-white'
                            : 'bg-primary-700/50 text-gray-300 hover:bg-primary-700'
                        }`}
                      >
                        {bookmaker}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>
          
          <AnimatedSection delay={0.6}>
            <div className="mt-6">
              <button
                type="button"
                className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
                onClick={handleSearch}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <ArrowPathIcon className="animate-spin -ml-1 mr-2 h-4 w-4" />
                    Searching...
                  </>
                ) : (
                  'Find Matching Bets'
                )}
              </button>
            </div>
          </AnimatedSection>
        </AnimatedCard>
        
        {results.length > 0 && (
          <FadeInView className="bg-primary-800/30 backdrop-blur-sm border border-primary-700/50 shadow-xl rounded-lg overflow-hidden">
            <div className="px-4 py-5 sm:px-6">
              <GlowingText 
                as="h3" 
                className="text-lg leading-6 font-medium text-white"
                glowColor="rgba(255, 255, 255, 0.6)"
                glowIntensity="light"
              >
                Matching Bets (Target: {targetOdds}x ±{tolerance})
              </GlowingText>
              <p className="mt-1 max-w-2xl text-sm text-gray-300">
                {results.length} results found matching your criteria
              </p>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-700">
                <thead className="bg-primary-700/50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Event
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Market / Selection
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Odds
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Sport / League
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Bookmaker
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Confidence
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-primary-800/20 divide-y divide-gray-700">
                  {results.map((bet) => (
                    <tr 
                      key={bet.id} 
                      className={`hover:bg-primary-700/30 transition-colors duration-150 cursor-pointer ${selectedBet?.id === bet.id ? 'bg-primary-700/50' : ''}`}
                      onClick={() => setSelectedBet(bet)}
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
                        {bet.event}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                        <div>{bet.market}</div>
                        <div className="font-medium text-blue-400">{bet.selection}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100">
                          {bet.odds}x
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                        <div className="flex flex-col">
                          <span className="font-medium">{bet.sport}</span>
                          <span className="text-xs text-gray-400">{bet.league}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                        <div className="flex items-center">
                          <span className="font-medium">{bet.bookmaker}</span>
                          {bet.trend && (
                            <span className="ml-2">
                              {bet.trend === 'up' ? (
                                <span className="text-green-400">↑</span>
                              ) : bet.trend === 'down' ? (
                                <span className="text-red-400">↓</span>
                              ) : (
                                <span className="text-gray-400">→</span>
                              )}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          bet.confidence === 'High' 
                            ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100' 
                            : bet.confidence === 'Medium'
                            ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100'
                            : 'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100'
                        }`}>
                          {bet.confidence}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </FadeInView>
        )}
        
        {/* Betting Insights Panel */}
        {selectedBet && (
          <FadeInView className="mt-8">
            <div className="max-w-3xl mx-auto">
              <div className="flex items-center mb-4">
                <InformationCircleIcon className="h-5 w-5 text-blue-400 mr-2" />
                <GlowingText 
                  as="h3" 
                  className="text-lg font-medium text-white"
                  glowColor="rgba(255, 255, 255, 0.6)"
                  glowIntensity="light"
                >
                  Analysis for {selectedBet.event} - {selectedBet.selection}
                </GlowingText>
              </div>
              
              <BettingInsightPanel 
                odds={selectedBet.odds}
                probability={selectedBet.probability}
                confidence={selectedBet.confidence}
              />
            </div>
          </FadeInView>
        )}
      </div>
    </div>
  )
}

'use client'

import { useState } from 'react'
import { ArrowPathIcon, UserGroupIcon, CurrencyDollarIcon, ChartBarIcon } from '@heroicons/react/24/outline'

// Mock data for portfolios
const MOCK_PORTFOLIOS = [
  {
    id: 1,
    name: 'Premier League Specialist',
    creator: 'FootballGuru',
    creatorType: 'Pro User',
    followers: 1243,
    roi: 18.5,
    winRate: 62,
    description: 'Focused on Premier League matches with emphasis on under/over markets and value betting on home underdogs.',
    recentBets: [
      { event: 'Arsenal vs Chelsea', market: 'BTTS', selection: 'Yes', odds: 1.85, result: 'Win' },
      { event: 'Man Utd vs Liverpool', market: 'Total Goals', selection: 'Under 2.5', odds: 2.1, result: 'Loss' },
      { event: 'Tottenham vs West Ham', market: 'Match Result', selection: 'Tottenham', odds: 1.75, result: 'Win' },
    ],
    tags: ['Football', 'Premier League', 'Value Betting'],
    fee: 2.5,
  },
  {
    id: 2,
    name: 'Tennis Grand Slam Expert',
    creator: 'AceAnalytics',
    creatorType: 'Pro User',
    followers: 876,
    roi: 22.3,
    winRate: 58,
    description: 'Specializing in Grand Slam tournaments with focus on player matchups, surface advantages, and in-play opportunities.',
    recentBets: [
      { event: 'Djokovic vs Nadal', market: 'Match Winner', selection: 'Nadal', odds: 2.4, result: 'Win' },
      { event: 'Swiatek vs Gauff', market: 'Total Sets', selection: 'Over 2.5', odds: 2.2, result: 'Win' },
      { event: 'Medvedev vs Zverev', market: 'First Set Winner', selection: 'Medvedev', odds: 1.9, result: 'Loss' },
    ],
    tags: ['Tennis', 'Grand Slams', 'In-Play'],
    fee: 3.0,
  },
  {
    id: 3,
    name: 'NBA Value Hunter',
    creator: 'BetGPT Alpha',
    creatorType: 'AI Agent',
    followers: 2150,
    roi: 24.7,
    winRate: 55,
    description: 'AI-powered portfolio that identifies value in NBA markets using advanced statistical modeling and real-time data analysis.',
    recentBets: [
      { event: 'Lakers vs Warriors', market: 'Point Spread', selection: 'Warriors +4.5', odds: 1.9, result: 'Win' },
      { event: 'Celtics vs Bucks', market: 'Total Points', selection: 'Over 220.5', odds: 1.95, result: 'Win' },
      { event: 'Heat vs 76ers', market: 'Player Props', selection: 'Butler Over 24.5 pts', odds: 2.1, result: 'Win' },
    ],
    tags: ['Basketball', 'NBA', 'AI-Powered', 'Statistics'],
    fee: 5.0,
  },
]

// Mock data for user's portfolios
const MOCK_USER_PORTFOLIOS = [
  {
    id: 101,
    name: 'My Football Strategy',
    followers: 37,
    roi: 12.8,
    winRate: 54,
    description: 'Focus on European leagues with emphasis on home teams in good form.',
    recentBets: [
      { event: 'Barcelona vs Real Madrid', market: 'BTTS', selection: 'Yes', odds: 1.7, result: 'Win' },
      { event: 'Bayern vs Dortmund', market: 'Match Result', selection: 'Bayern', odds: 1.5, result: 'Win' },
    ],
    earnings: 125.50,
    active: true,
  }
]

export default function PortfoliosPage() {
  const [activeTab, setActiveTab] = useState<'discover' | 'following' | 'my-portfolios'>('discover')
  const [isLoading, setIsLoading] = useState<boolean>(false)
  
  const handleFollow = (portfolioId: number) => {
    setIsLoading(true)
    
    // Simulate API call with setTimeout
    setTimeout(() => {
      setIsLoading(false)
      // In a real app, this would update the following status
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
            💼 Copy Betting Portfolios
          </h1>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 dark:text-gray-300 sm:mt-4">
            Follow strategies by pro users or AI agents, or earn rewards by sharing your own
          </p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden mb-8">
          <div className="border-b border-gray-200 dark:border-gray-700">
            <nav className="-mb-px flex" aria-label="Tabs">
              <button
                onClick={() => setActiveTab('discover')}
                className={`w-1/3 py-4 px-1 text-center border-b-2 font-medium text-sm ${
                  activeTab === 'discover'
                    ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                }`}
              >
                Discover Portfolios
              </button>
              <button
                onClick={() => setActiveTab('following')}
                className={`w-1/3 py-4 px-1 text-center border-b-2 font-medium text-sm ${
                  activeTab === 'following'
                    ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                }`}
              >
                Following
              </button>
              <button
                onClick={() => setActiveTab('my-portfolios')}
                className={`w-1/3 py-4 px-1 text-center border-b-2 font-medium text-sm ${
                  activeTab === 'my-portfolios'
                    ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                }`}
              >
                My Portfolios
              </button>
            </nav>
          </div>
          
          <div className="p-6">
            {activeTab === 'discover' && (
              <div>
                <div className="mb-6">
                  <h2 className="text-lg font-medium text-gray-900 dark:text-white">
                    Top Performing Portfolios
                  </h2>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    Discover and follow betting strategies from professional bettors and AI agents.
                  </p>
                </div>
                
                <div className="space-y-6">
                  {MOCK_PORTFOLIOS.map((portfolio) => (
                    <div key={portfolio.id} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                        <div>
                          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                            {portfolio.name}
                          </h3>
                          <div className="mt-1 flex items-center">
                            <span className="text-sm text-gray-500 dark:text-gray-400">
                              by {portfolio.creator}
                            </span>
                            <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100">
                              {portfolio.creatorType}
                            </span>
                          </div>
                        </div>
                        <div className="mt-4 sm:mt-0">
                          <button
                            type="button"
                            className="btn btn-primary"
                            onClick={() => handleFollow(portfolio.id)}
                            disabled={isLoading}
                          >
                            {isLoading ? (
                              <>
                                <ArrowPathIcon className="animate-spin -ml-1 mr-2 h-4 w-4" />
                                Following...
                              </>
                            ) : (
                              'Follow for $' + portfolio.fee + '/month'
                            )}
                          </button>
                        </div>
                      </div>
                      
                      <p className="mt-3 text-sm text-gray-600 dark:text-gray-300">
                        {portfolio.description}
                      </p>
                      
                      <div className="mt-4 grid grid-cols-3 gap-4">
                        <div className="flex items-center">
                          <UserGroupIcon className="h-5 w-5 text-gray-400 mr-2" />
                          <span className="text-sm text-gray-500 dark:text-gray-400">
                            {portfolio.followers} followers
                          </span>
                        </div>
                        <div className="flex items-center">
                          <CurrencyDollarIcon className="h-5 w-5 text-gray-400 mr-2" />
                          <span className="text-sm text-gray-500 dark:text-gray-400">
                            {portfolio.roi}% ROI
                          </span>
                        </div>
                        <div className="flex items-center">
                          <ChartBarIcon className="h-5 w-5 text-gray-400 mr-2" />
                          <span className="text-sm text-gray-500 dark:text-gray-400">
                            {portfolio.winRate}% win rate
                          </span>
                        </div>
                      </div>
                      
                      <div className="mt-4">
                        <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                          Recent Bets
                        </h4>
                        <div className="mt-2 overflow-x-auto">
                          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600">
                            <thead>
                              <tr>
                                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Event</th>
                                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Market</th>
                                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Selection</th>
                                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Odds</th>
                                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Result</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
                              {portfolio.recentBets.map((bet, index) => (
                                <tr key={index}>
                                  <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-500 dark:text-gray-400">{bet.event}</td>
                                  <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-500 dark:text-gray-400">{bet.market}</td>
                                  <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-500 dark:text-gray-400">{bet.selection}</td>
                                  <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-500 dark:text-gray-400">{bet.odds}</td>
                                  <td className="px-3 py-2 whitespace-nowrap text-xs">
                                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                                      bet.result === 'Win' 
                                        ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100' 
                                        : 'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100'
                                    }`}>
                                      {bet.result}
                                    </span>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                      
                      <div className="mt-4 flex flex-wrap gap-2">
                        {portfolio.tags.map((tag, index) => (
                          <span key={index} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-600 dark:text-gray-200">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {activeTab === 'following' && (
              <div className="text-center py-12">
                <p className="text-gray-500 dark:text-gray-400">
                  You are not following any portfolios yet. Discover and follow portfolios to see them here.
                </p>
              </div>
            )}
            
            {activeTab === 'my-portfolios' && (
              <div>
                <div className="mb-6 flex justify-between items-center">
                  <div>
                    <h2 className="text-lg font-medium text-gray-900 dark:text-white">
                      Your Betting Portfolios
                    </h2>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                      Manage your portfolios and track your earnings from followers.
                    </p>
                  </div>
                  <button
                    type="button"
                    className="btn btn-primary"
                  >
                    Create New Portfolio
                  </button>
                </div>
                
                {MOCK_USER_PORTFOLIOS.length > 0 ? (
                  <div className="space-y-6">
                    {MOCK_USER_PORTFOLIOS.map((portfolio) => (
                      <div key={portfolio.id} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                          <div>
                            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                              {portfolio.name}
                            </h3>
                            <div className="mt-1 flex items-center">
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                portfolio.active 
                                  ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100' 
                                  : 'bg-gray-100 text-gray-800 dark:bg-gray-600 dark:text-gray-200'
                              }`}>
                                {portfolio.active ? 'Active' : 'Inactive'}
                              </span>
                            </div>
                          </div>
                          <div className="mt-4 sm:mt-0">
                            <button
                              type="button"
                              className="btn btn-secondary"
                            >
                              Edit Portfolio
                            </button>
                          </div>
                        </div>
                        
                        <p className="mt-3 text-sm text-gray-600 dark:text-gray-300">
                          {portfolio.description}
                        </p>
                        
                        <div className="mt-4 grid grid-cols-3 gap-4">
                          <div className="flex items-center">
                            <UserGroupIcon className="h-5 w-5 text-gray-400 mr-2" />
                            <span className="text-sm text-gray-500 dark:text-gray-400">
                              {portfolio.followers} followers
                            </span>
                          </div>
                          <div className="flex items-center">
                            <CurrencyDollarIcon className="h-5 w-5 text-gray-400 mr-2" />
                            <span className="text-sm text-gray-500 dark:text-gray-400">
                              {portfolio.roi}% ROI
                            </span>
                          </div>
                          <div className="flex items-center">
                            <ChartBarIcon className="h-5 w-5 text-gray-400 mr-2" />
                            <span className="text-sm text-gray-500 dark:text-gray-400">
                              {portfolio.winRate}% win rate
                            </span>
                          </div>
                        </div>
                        
                        <div className="mt-4 p-3 bg-green-50 dark:bg-green-900 rounded-lg">
                          <h4 className="text-sm font-medium text-green-800 dark:text-green-100">
                            Earnings from Followers
                          </h4>
                          <p className="mt-1 text-lg font-semibold text-green-800 dark:text-green-100">
                            ${portfolio.earnings.toFixed(2)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <p className="text-gray-500 dark:text-gray-400">
                      You haven't created any portfolios yet. Create your first portfolio to share your betting strategy.
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
            How Copy Betting Works
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <h3 className="font-medium text-gray-900 dark:text-white mb-2">Follow Experts</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Subscribe to portfolios created by professional bettors or AI agents for a small monthly fee.
              </p>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <h3 className="font-medium text-gray-900 dark:text-white mb-2">Get Notifications</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Receive real-time alerts when your followed portfolios place new bets, allowing you to copy them.
              </p>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <h3 className="font-medium text-gray-900 dark:text-white mb-2">Share Your Strategy</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Create your own portfolio to share your betting strategy and earn passive income from followers.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

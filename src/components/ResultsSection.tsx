'use client'

import { useState } from 'react'
import { CheckCircleIcon, XCircleIcon, StarIcon, UserGroupIcon, ArrowTrendingUpIcon } from '@heroicons/react/24/solid'
import { AnimatedCard, StaggeredContainer, StaggeredItem, GlowEffect } from './AnimatedSection'
import GlowingText from './GlowingText'

// Mock data for daily selections
const DAILY_SELECTIONS = [
  {
    id: 1,
    event: 'Arsenal vs Chelsea',
    selection: 'Arsenal to win',
    odds: 2.1,
    result: 'win',
    profit: 110,
    date: '2025-05-12',
  },
  {
    id: 2,
    event: 'Lakers vs Warriors',
    selection: 'Over 220.5 points',
    odds: 1.9,
    result: 'loss',
    profit: -100,
    date: '2025-05-12',
  },
  {
    id: 3,
    event: 'UFC 300: Main Event',
    selection: 'Fighter A by KO/TKO',
    odds: 3.5,
    result: 'win',
    profit: 250,
    date: '2025-05-11',
  },
  {
    id: 4,
    event: 'French Open - Quarter Final',
    selection: 'Player B to win in straight sets',
    odds: 2.75,
    result: 'win',
    profit: 175,
    date: '2025-05-11',
  },
]

// Mock data for community members
const COMMUNITY_MEMBERS = [
  {
    id: 101,
    name: 'SportsMaster',
    avatar: '/avatars/user1.png',
    winRate: 68,
    roi: 22.5,
    followers: 1243,
    verified: true,
    recentResults: [
      { result: 'win', profit: 120 },
      { result: 'win', profit: 85 },
      { result: 'loss', profit: -100 },
      { result: 'win', profit: 150 },
      { result: 'win', profit: 200 },
    ],
    specialty: 'Football',
  },
  {
    id: 102,
    name: 'BasketballGuru',
    avatar: '/avatars/user2.png',
    winRate: 72,
    roi: 31.2,
    followers: 876,
    verified: true,
    recentResults: [
      { result: 'win', profit: 180 },
      { result: 'win', profit: 120 },
      { result: 'win', profit: 90 },
      { result: 'loss', profit: -100 },
      { result: 'win', profit: 150 },
    ],
    specialty: 'Basketball',
  },
  {
    id: 103,
    name: 'BettingPro',
    avatar: '/avatars/user3.png',
    winRate: 64,
    roi: 18.7,
    followers: 592,
    verified: false,
    recentResults: [
      { result: 'loss', profit: -100 },
      { result: 'win', profit: 140 },
      { result: 'win', profit: 110 },
      { result: 'win', profit: 95 },
      { result: 'loss', profit: -100 },
    ],
    specialty: 'Mixed Sports',
  },
]

export default function ResultsSection() {
  const [activeTab, setActiveTab] = useState<'daily' | 'community'>('daily')

  // Calculate total profit for daily selections
  const totalDailyProfit = DAILY_SELECTIONS.reduce((sum, selection) => sum + selection.profit, 0)
  const totalDailyWins = DAILY_SELECTIONS.filter(selection => selection.result === 'win').length
  const winRate = Math.round((totalDailyWins / DAILY_SELECTIONS.length) * 100)

  return (
    <div className="py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center mb-12">
          <GlowingText 
            as="h2" 
            className="text-base font-semibold leading-7 text-primary-400"
            glowColor="rgba(96, 165, 250, 0.7)"
            glowIntensity="medium"
          >
            Proven Results
          </GlowingText>
          <GlowingText 
            as="p" 
            className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl"
            glowColor="rgba(255, 255, 255, 0.6)"
            glowIntensity="medium"
          >
            Track Record of Success
          </GlowingText>
          <GlowingText 
            as="p" 
            className="mt-6 text-lg leading-8 text-gray-300"
            glowColor="rgba(209, 213, 219, 0.6)"
            glowIntensity="light"
          >
            See our daily selection results and follow top community members with proven track records.
            Build confidence in your betting decisions by learning from successful strategies.
          </GlowingText>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3 mb-10">
          <div className="bg-primary-800/30 backdrop-blur-sm border border-primary-700/50 overflow-hidden rounded-lg shadow">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-green-500/20 rounded-md p-3">
                  <CheckCircleIcon className="h-6 w-6 text-green-400" aria-hidden="true" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-400 truncate">Win Rate</dt>
                    <dd>
                      <div className="text-lg font-medium text-white">{winRate}%</div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-primary-800/30 backdrop-blur-sm border border-primary-700/50 overflow-hidden rounded-lg shadow">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-blue-500/20 rounded-md p-3">
                  <ArrowTrendingUpIcon className="h-6 w-6 text-blue-400" aria-hidden="true" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-400 truncate">Total Profit</dt>
                    <dd>
                      <div className="text-lg font-medium text-white">${totalDailyProfit > 0 ? '+' : ''}{totalDailyProfit}</div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-primary-800/30 backdrop-blur-sm border border-primary-700/50 overflow-hidden rounded-lg shadow">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-purple-500/20 rounded-md p-3">
                  <UserGroupIcon className="h-6 w-6 text-purple-400" aria-hidden="true" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-400 truncate">Community Members</dt>
                    <dd>
                      <div className="text-lg font-medium text-white">{COMMUNITY_MEMBERS.length} Verified Experts</div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 dark:border-gray-700 mb-8">
          <nav className="-mb-px flex space-x-8">
            <button
              className={`${activeTab === 'daily' ? 'border-primary-500 text-primary-600 dark:text-primary-400' : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 hover:border-gray-300 dark:hover:text-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
              onClick={() => setActiveTab('daily')}
            >
              Daily Selections
            </button>
            <button
              className={`${activeTab === 'community' ? 'border-primary-500 text-primary-600 dark:text-primary-400' : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 hover:border-gray-300 dark:hover:text-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
              onClick={() => setActiveTab('community')}
            >
              Community Members
            </button>
          </nav>
        </div>

        {/* Daily Selections Tab */}
        {activeTab === 'daily' && (
          <StaggeredContainer className="grid gap-5 sm:grid-cols-2 lg:grid-cols-2">
            {DAILY_SELECTIONS.map((selection, index) => (
              <StaggeredItem key={selection.id}>
                <AnimatedCard className="bg-primary-800/30 backdrop-blur-sm border border-primary-700/50 rounded-lg p-5 h-full">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-medium text-white">{selection.event}</h3>
                      <p className="text-gray-400 mt-1">{selection.selection}</p>
                    </div>
                    <div className={`flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      selection.result === 'win' 
                        ? 'bg-green-100/10 text-green-400' 
                        : 'bg-red-100/10 text-red-400'
                    }`}>
                      {selection.result === 'win' ? (
                        <CheckCircleIcon className="mr-1 h-4 w-4" />
                      ) : (
                        <XCircleIcon className="mr-1 h-4 w-4" />
                      )}
                      {selection.result.toUpperCase()}
                    </div>
                  </div>
                  <div className="mt-4 flex justify-between items-center">
                    <div>
                      <span className="text-sm text-gray-400">Odds:</span>
                      <span className="ml-2 text-white">{selection.odds}</span>
                    </div>
                    <div>
                      <span className="text-sm text-gray-400">Profit:</span>
                      <span className={`ml-2 ${selection.profit > 0 ? 'text-green-400' : 'text-red-400'}`}>
                        ${selection.profit > 0 ? '+' : ''}{selection.profit}
                      </span>
                    </div>
                  </div>
                  <div className="mt-2 text-xs text-gray-500">
                    {selection.date}
                  </div>
                </AnimatedCard>
              </StaggeredItem>
            ))}
          </StaggeredContainer>
        )}

        {/* Community Members Tab */}
        {activeTab === 'community' && (
          <StaggeredContainer className="grid gap-5 sm:grid-cols-1 lg:grid-cols-3">
            {COMMUNITY_MEMBERS.map((member, index) => (
              <StaggeredItem key={member.id}>
                <AnimatedCard className="bg-primary-800/30 backdrop-blur-sm border border-primary-700/50 rounded-lg p-5 h-full">
                  <div className="flex items-center mb-4">
                    <div className="relative">
                      <div className="h-12 w-12 rounded-full bg-primary-700 flex items-center justify-center text-lg font-bold text-white">
                        {member.name.charAt(0)}
                      </div>
                      {member.verified && (
                        <div className="absolute -bottom-1 -right-1 bg-blue-500 rounded-full p-1">
                          <StarIcon className="h-3 w-3 text-white" />
                        </div>
                      )}
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-medium text-white flex items-center">
                        {member.name}
                      </h3>
                      <p className="text-sm text-gray-400">{member.specialty} Specialist</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-2 mb-4">
                    <div className="bg-primary-700/40 rounded p-2 text-center">
                      <div className="text-sm text-gray-400">Win Rate</div>
                      <div className="text-lg font-medium text-white">{member.winRate}%</div>
                    </div>
                    <div className="bg-primary-700/40 rounded p-2 text-center">
                      <div className="text-sm text-gray-400">ROI</div>
                      <div className="text-lg font-medium text-white">{member.roi}%</div>
                    </div>
                    <div className="bg-primary-700/40 rounded p-2 text-center">
                      <div className="text-sm text-gray-400">Followers</div>
                      <div className="text-lg font-medium text-white">{member.followers}</div>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <div className="text-sm text-gray-400 mb-2">Recent Results</div>
                    <div className="flex space-x-1">
                      {member.recentResults.map((result, i) => (
                        <div 
                          key={i} 
                          className={`flex-1 h-8 rounded flex items-center justify-center text-xs font-medium ${
                            result.result === 'win' 
                              ? 'bg-green-900/30 text-green-400 border border-green-800/50' 
                              : 'bg-red-900/30 text-red-400 border border-red-800/50'
                          }`}
                        >
                          {result.result === 'win' ? 'W' : 'L'}
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <button className="w-full py-2 px-4 border border-primary-500 text-primary-400 rounded-md hover:bg-primary-500/20 transition-colors text-sm font-medium">
                    Follow Member
                  </button>
                </AnimatedCard>
              </StaggeredItem>
            ))}
          </StaggeredContainer>
        )}
      </div>
    </div>
  )
}

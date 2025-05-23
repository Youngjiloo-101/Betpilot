'use client'

import { useState } from 'react'
import { UserGroupIcon, ClockIcon, CheckCircleIcon } from '@heroicons/react/24/outline'

// Mock data for active voting rooms
const MOCK_ACTIVE_ROOMS = [
  {
    id: 1,
    title: 'Premier League Weekend Parlay',
    host: 'FootballGuru',
    participants: 128,
    status: 'Voting',
    endTime: '2025-05-14T18:30:00Z',
    description: 'Vote on which Premier League matches to include in our community parlay for this weekend.',
    options: [
      { id: 101, text: 'Arsenal to win vs Chelsea', votes: 87, percentage: 68 },
      { id: 102, text: 'Liverpool vs Man City - Both teams to score', votes: 104, percentage: 81 },
      { id: 103, text: 'Tottenham vs Newcastle - Over 2.5 goals', votes: 92, percentage: 72 },
      { id: 104, text: 'Aston Villa to win vs Everton', votes: 65, percentage: 51 },
    ],
    votingThreshold: 70,
    category: 'Parlay Building',
  },
  {
    id: 2,
    title: 'NBA Finals MVP Odds',
    host: 'BasketballExpert',
    participants: 95,
    status: 'Voting',
    endTime: '2025-05-14T20:00:00Z',
    description: 'What odds range represents fair value for the current NBA Finals MVP favorite?',
    options: [
      { id: 201, text: '1.5 - 1.8 odds', votes: 12, percentage: 13 },
      { id: 202, text: '1.9 - 2.2 odds', votes: 35, percentage: 37 },
      { id: 203, text: '2.3 - 2.6 odds', votes: 42, percentage: 44 },
      { id: 204, text: '2.7+ odds', votes: 6, percentage: 6 },
    ],
    votingThreshold: 50,
    category: 'Odds Evaluation',
  },
]

// Mock data for upcoming voting rooms
const MOCK_UPCOMING_ROOMS = [
  {
    id: 3,
    title: 'Champions League Final Risk Level',
    host: 'BetGPT Alpha',
    startTime: '2025-05-15T15:00:00Z',
    description: 'Vote on the risk level for our Champions League Final community betting vault.',
    category: 'Risk Assessment',
  },
  {
    id: 4,
    title: 'Tennis Grand Slam Parlays',
    host: 'TennisTrader',
    startTime: '2025-05-16T12:00:00Z',
    description: 'Build a community parlay for the upcoming Grand Slam tournament.',
    category: 'Parlay Building',
  },
]

// Mock data for completed voting rooms
const MOCK_COMPLETED_ROOMS = [
  {
    id: 5,
    title: 'UFC Fight Night Betting Vault',
    host: 'MMAExpert',
    participants: 203,
    result: 'Vault Created',
    vaultValue: 5280,
    winningOptions: [
      'Heavyweight Main Event - Under 2.5 rounds',
      'Co-Main Event - Fighter A by submission',
    ],
    category: 'Betting Vault',
  },
  {
    id: 6,
    title: 'Horse Racing Accumulator',
    host: 'RacingPro',
    participants: 156,
    result: 'Voting Failed',
    failureReason: 'No option reached the required 60% threshold',
    category: 'Accumulator Building',
  },
]

export default function VotingRoomPage() {
  const [activeTab, setActiveTab] = useState<'active' | 'upcoming' | 'completed'>('active')
  const [selectedRoom, setSelectedRoom] = useState<number | null>(1) // Default to first room
  const [isVoting, setIsVoting] = useState<boolean>(false)
  const [userVotes, setUserVotes] = useState<{[key: number]: number}>({})
  
  const handleVote = (roomId: number, optionId: number) => {
    setIsVoting(true)
    
    // Simulate API call with setTimeout
    setTimeout(() => {
      setUserVotes({
        ...userVotes,
        [roomId]: optionId
      })
      setIsVoting(false)
    }, 1000)
  }
  
  const formatTimeRemaining = (endTimeStr: string) => {
    const endTime = new Date(endTimeStr)
    const now = new Date()
    const diffMs = endTime.getTime() - now.getTime()
    
    if (diffMs <= 0) return 'Ended'
    
    const diffHrs = Math.floor(diffMs / (1000 * 60 * 60))
    const diffMins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60))
    
    return `${diffHrs}h ${diffMins}m remaining`
  }
  
  const selectedRoomData = MOCK_ACTIVE_ROOMS.find(room => room.id === selectedRoom)

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-900 to-primary-950 pt-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 relative z-10">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-white sm:text-4xl">
            🗳️ Live Odds Voting Room
          </h1>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-300 sm:mt-4">
            Join live community sessions to vote on odds, match targets, or parlay risks
          </p>
        </div>
        
        <div className="border-b border-gray-200 dark:border-gray-700 mb-8">
          <nav className="-mb-px flex space-x-8">
            <button
              className={`${activeTab === 'active' ? 'border-primary-500 text-primary-600 dark:text-primary-400' : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 hover:border-gray-300 dark:hover:text-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
              onClick={() => setActiveTab('active')}
            >
              Active Rooms
            </button>
            <button
              className={`${activeTab === 'upcoming' ? 'border-primary-500 text-primary-600 dark:text-primary-400' : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 hover:border-gray-300 dark:hover:text-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
              onClick={() => setActiveTab('upcoming')}
            >
              Upcoming
            </button>
            <button
              className={`${activeTab === 'completed' ? 'border-primary-500 text-primary-600 dark:text-primary-400' : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 hover:border-gray-300 dark:hover:text-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
              onClick={() => setActiveTab('completed')}
            >
              Completed
            </button>
          </nav>
        </div>
        
        {/* Active, Upcoming, and Completed Tabs */}
        {(activeTab === 'active' || activeTab === 'upcoming' || activeTab === 'completed') && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              <div className="bg-primary-800/30 backdrop-blur-sm border border-primary-700/50 shadow-xl rounded-lg overflow-hidden mb-8">
                <div className="p-4">
                  <h2 className="text-lg font-medium text-white mb-4">
                    {activeTab === 'active' ? 'Active Voting Rooms' : 
                     activeTab === 'upcoming' ? 'Upcoming Voting Rooms' : 
                     'Completed Voting Rooms'}
                  </h2>
                  
                  <div className="space-y-4">
                    {activeTab === 'active' && MOCK_ACTIVE_ROOMS.map((room) => (
                      <div 
                        key={room.id}
                        onClick={() => setSelectedRoom(room.id)}
                        className={`p-3 rounded-lg cursor-pointer transition-colors ${
                          selectedRoom === room.id 
                            ? 'bg-blue-600/30 border border-blue-500/50' 
                            : 'bg-primary-700/30 border border-primary-600/50 hover:bg-primary-700/50'
                        }`}
                      >
                        <div className="flex justify-between items-start">
                          <h3 className="font-medium text-white">{room.title}</h3>
                          <span className="px-2 py-1 text-xs rounded-full bg-blue-900/50 text-blue-300">
                            {room.participants} voters
                          </span>
                        </div>
                        <p className="text-sm text-gray-300 mt-1">Hosted by {room.host}</p>
                        <div className="flex justify-between items-center mt-2 text-xs">
                          <span className="text-gray-400">{room.category}</span>
                          <span className="text-blue-400">{formatTimeRemaining(room.endTime)}</span>
                        </div>
                      </div>
                    ))}
                    
                    {activeTab === 'upcoming' && MOCK_UPCOMING_ROOMS.map((room) => (
                      <div 
                        key={room.id}
                        className="p-3 rounded-lg bg-primary-700/30 border border-primary-600/50"
                      >
                        <h3 className="font-medium text-white">{room.title}</h3>
                        <p className="text-sm text-gray-300 mt-1">Hosted by {room.host}</p>
                        <p className="text-sm text-gray-300 mt-1">{room.description}</p>
                        <div className="flex justify-between items-center mt-2 text-xs">
                          <span className="text-gray-400">{room.category}</span>
                          <span className="text-blue-400">
                            Starts {new Date(room.startTime).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    ))}
                    
                    {activeTab === 'completed' && MOCK_COMPLETED_ROOMS.map((room) => (
                      <div 
                        key={room.id}
                        className="p-3 rounded-lg bg-primary-700/30 border border-primary-600/50"
                      >
                        <div className="flex justify-between items-start">
                          <h3 className="font-medium text-white">{room.title}</h3>
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            room.result === 'Vault Created' 
                              ? 'bg-green-900/50 text-green-300' 
                              : 'bg-red-900/50 text-red-300'
                          }`}>
                            {room.result}
                          </span>
                        </div>
                        <p className="text-sm text-gray-300 mt-1">Hosted by {room.host}</p>
                        {room.result === 'Vault Created' ? (
                          <div className="mt-2">
                            <p className="text-sm text-gray-300">Vault Value: ${room.vaultValue}</p>
                            <p className="text-sm text-gray-300 mt-1">Winning Options:</p>
                            <ul className="list-disc list-inside text-xs text-gray-400 mt-1">
                              {room.winningOptions && room.winningOptions.map((option, index) => (
                                <li key={index}>{option}</li>
                              ))}
                            </ul>
                          </div>
                        ) : (
                          <p className="text-sm text-red-300 mt-2">{room.failureReason}</p>
                        )}
                        <div className="flex justify-between items-center mt-2 text-xs">
                          <span className="text-gray-400">{room.category}</span>
                          <span className="text-gray-400">{room.participants} participants</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="bg-primary-800/30 backdrop-blur-sm border border-primary-700/50 shadow-xl rounded-lg p-4">
                <h2 className="text-lg font-medium text-white mb-4">
                  How Voting Rooms Work
                </h2>
                <div className="space-y-4 text-sm text-gray-300">
                  <p>
                    Voting rooms allow the BetPilot community to collectively make betting decisions based on wisdom of the crowd.
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-start">
                      <span className="text-blue-400 mr-2">1.</span>
                      <p>Join any active voting room to participate</p>
                    </div>
                    <div className="flex items-start">
                      <span className="text-blue-400 mr-2">2.</span>
                      <p>Cast your vote on betting options, odds ranges, or risk levels</p>
                    </div>
                    <div className="flex items-start">
                      <span className="text-blue-400 mr-2">3.</span>
                      <p>Options that reach the threshold become part of the community bet</p>
                    </div>
                    <div className="flex items-start">
                      <span className="text-blue-400 mr-2">4.</span>
                      <p>Join the betting vault with as little as $10 to participate</p>
                    </div>
                    <div className="flex items-start">
                      <span className="text-blue-400 mr-2">5.</span>
                      <p>Profits are distributed proportionally to your contribution</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {activeTab === 'active' && selectedRoomData && (
              <div className="lg:col-span-2">
                <div className="bg-primary-800/30 backdrop-blur-sm border border-primary-700/50 shadow-xl rounded-lg p-6">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h2 className="text-xl font-bold text-white">{selectedRoomData.title}</h2>
                      <p className="text-gray-300 mt-1">Hosted by {selectedRoomData.host}</p>
                    </div>
                    <div className="text-right">
                      <div className="px-3 py-1 rounded-full bg-blue-900/50 text-blue-300 text-sm">
                        {selectedRoomData.participants} participants
                      </div>
                      <p className="text-gray-400 text-sm mt-1">{formatTimeRemaining(selectedRoomData.endTime)}</p>
                    </div>
                  </div>
                  
                  <div className="bg-primary-700/30 rounded-lg p-4 mb-6">
                    <h3 className="text-lg font-medium text-white mb-2">
                      Description
                    </h3>
                    <p className="text-gray-300">
                      {selectedRoomData.description}
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium text-white mb-4">
                      Voting Options
                    </h3>
                    <div className="space-y-4">
                      {selectedRoomData.options.map((option) => (
                        <div 
                          key={option.id} 
                          className={`p-4 rounded-lg border ${
                            userVotes[selectedRoomData.id] === option.id
                              ? 'bg-blue-600/30 border-blue-500/50'
                              : 'bg-primary-700/30 border-primary-600/50'
                          }`}
                        >
                          <div className="flex justify-between items-center mb-2">
                            <div className="flex items-center">
                              <input
                                type="radio"
                                id={`option-${option.id}`}
                                name={`room-${selectedRoomData.id}`}
                                checked={userVotes[selectedRoomData.id] === option.id}
                                onChange={() => handleVote(selectedRoomData.id, option.id)}
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                              />
                              <label htmlFor={`option-${option.id}`} className="ml-2 text-white font-medium">
                                {option.text}
                              </label>
                            </div>
                            <span className="text-gray-300 text-sm">
                              {option.percentage}%
                            </span>
                          </div>
                          
                          <div className="w-full bg-primary-900/50 rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full ${
                                option.percentage >= selectedRoomData.votingThreshold
                                  ? 'bg-green-500'
                                  : 'bg-blue-500'
                              }`}
                              style={{ width: `${option.percentage}%` }}
                            />
                          </div>
                          
                          <div className="flex justify-between items-center mt-2 text-xs">
                            <span className="text-gray-400">
                              {option.votes} votes
                            </span>
                            {option.percentage >= selectedRoomData.votingThreshold && (
                              <span className="text-green-400 font-medium">
                                Threshold reached
                              </span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="mt-8 bg-primary-700/30 rounded-lg p-4">
                    <h3 className="text-lg font-medium text-white mb-2">
                      Voting Rules
                    </h3>
                    <ul className="list-disc list-inside text-sm text-gray-300 space-y-1">
                      <li>Options need {selectedRoomData.votingThreshold}% approval to be included in the final result</li>
                      <li>Voting ends at {new Date(selectedRoomData.endTime).toLocaleString()}</li>
                      <li>You can change your vote until voting closes</li>
                      <li>If enough options reach the threshold, a community betting vault will be created</li>
                    </ul>
                  </div>
                  
                  <div className="mt-6 flex justify-between">
                    <button
                      type="button"
                      className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-700 hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                    >
                      Share Room
                    </button>
                    
                    <button
                      type="button"
                      className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      disabled={!userVotes[selectedRoomData.id]}
                    >
                      {userVotes[selectedRoomData.id] ? 'Update Vote' : 'Submit Vote'}
                    </button>
                  </div>
                </div>
                
                <div className="mt-8 bg-primary-800/30 backdrop-blur-sm border border-primary-700/50 shadow-xl rounded-lg p-6">
                  <h2 className="text-lg font-medium text-white mb-4">
                    About Community Betting Vaults
                  </h2>
                  <p className="text-gray-300 mb-4">
                    Community Betting Vaults are a unique feature of BetPilot that allow users to pool resources and bet together based on collective wisdom.
                  </p>
                  
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                    <div className="bg-primary-700/30 p-4 rounded-lg">
                      <h3 className="font-medium text-white mb-2">Vote Together</h3>
                      <p className="text-sm text-gray-400">
                        Participate in voting rooms to collectively decide on betting options, risk levels, and strategies.
                      </p>
                    </div>
                    
                    <div className="bg-primary-700/30 p-4 rounded-lg">
                      <h3 className="font-medium text-white mb-2">Pool Resources</h3>
                      <p className="text-sm text-gray-400">
                        Join community vaults with as little as $10 to gain exposure to larger, more diversified betting portfolios.
                      </p>
                    </div>
                    
                    <div className="bg-primary-700/30 p-4 rounded-lg">
                      <h3 className="font-medium text-white mb-2">Share Rewards</h3>
                      <p className="text-sm text-gray-400">
                        When community bets win, profits are distributed proportionally to your contribution, with NFT rewards for participants.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

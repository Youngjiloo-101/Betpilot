'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ArrowPathIcon, TrophyIcon, FireIcon, SparklesIcon } from '@heroicons/react/24/outline'

// Mock data for NFT collections
const MOCK_NFT_COLLECTIONS = [
  {
    id: 1,
    name: 'Win Streak Masters',
    description: 'Awarded for consecutive winning bets. The longer your streak, the rarer your NFT.',
    tiers: [
      { name: 'Bronze', requirement: '3 consecutive wins', rarity: 'Common', image: '/nft-streak-bronze.png' },
      { name: 'Silver', requirement: '5 consecutive wins', rarity: 'Uncommon', image: '/nft-streak-silver.png' },
      { name: 'Gold', requirement: '7 consecutive wins', rarity: 'Rare', image: '/nft-streak-gold.png' },
      { name: 'Platinum', requirement: '10+ consecutive wins', rarity: 'Epic', image: '/nft-streak-platinum.png' },
    ],
    icon: <TrophyIcon className="h-6 w-6 text-yellow-500" />,
    color: 'bg-yellow-100 dark:bg-yellow-900',
    textColor: 'text-yellow-800 dark:text-yellow-100',
  },
  {
    id: 2,
    name: 'Underdog Heroes',
    description: 'Earned by successfully betting on underdogs with high odds.',
    tiers: [
      { name: 'Challenger', requirement: 'Win with 3.0+ odds', rarity: 'Common', image: '/nft-underdog-bronze.png' },
      { name: 'Disruptor', requirement: 'Win with 5.0+ odds', rarity: 'Uncommon', image: '/nft-underdog-silver.png' },
      { name: 'Giant Slayer', requirement: 'Win with 7.0+ odds', rarity: 'Rare', image: '/nft-underdog-gold.png' },
      { name: 'Legend', requirement: 'Win with 10.0+ odds', rarity: 'Legendary', image: '/nft-underdog-platinum.png' },
    ],
    icon: <FireIcon className="h-6 w-6 text-red-500" />,
    color: 'bg-red-100 dark:bg-red-900',
    textColor: 'text-red-800 dark:text-red-100',
  },
  {
    id: 3,
    name: 'Efficiency Experts',
    description: 'Rewarded for achieving high ROI over a series of bets.',
    tiers: [
      { name: 'Analyst', requirement: '15%+ ROI over 10 bets', rarity: 'Common', image: '/nft-efficiency-bronze.png' },
      { name: 'Strategist', requirement: '25%+ ROI over 10 bets', rarity: 'Uncommon', image: '/nft-efficiency-silver.png' },
      { name: 'Mastermind', requirement: '40%+ ROI over 10 bets', rarity: 'Rare', image: '/nft-efficiency-gold.png' },
      { name: 'Oracle', requirement: '60%+ ROI over 10 bets', rarity: 'Legendary', image: '/nft-efficiency-platinum.png' },
    ],
    icon: <SparklesIcon className="h-6 w-6 text-purple-500" />,
    color: 'bg-purple-100 dark:bg-purple-900',
    textColor: 'text-purple-800 dark:text-purple-100',
  },
]

// Mock data for user's NFT collection
const MOCK_USER_NFTS = [
  {
    id: 101,
    name: 'Win Streak Master - Silver',
    description: 'Achieved 5 consecutive winning bets',
    image: '/nft-streak-silver.png',
    rarity: 'Uncommon',
    acquiredDate: '2025-04-15',
    collection: 'Win Streak Masters',
  },
  {
    id: 102,
    name: 'Underdog Hero - Challenger',
    description: 'Successfully bet on an underdog with 3.5 odds',
    image: '/nft-underdog-bronze.png',
    rarity: 'Common',
    acquiredDate: '2025-04-22',
    collection: 'Underdog Heroes',
  },
]

// Mock data for leaderboard
const MOCK_LEADERBOARD = [
  { id: 1, username: 'BetKing92', nftCount: 12, rarest: 'Win Streak Master - Platinum', avatar: '/avatar1.png' },
  { id: 2, username: 'OddsWizard', nftCount: 9, rarest: 'Efficiency Expert - Oracle', avatar: '/avatar2.png' },
  { id: 3, username: 'SportsProphet', nftCount: 8, rarest: 'Underdog Hero - Legend', avatar: '/avatar3.png' },
  { id: 4, username: 'BettingBaron', nftCount: 7, rarest: 'Win Streak Master - Gold', avatar: '/avatar4.png' },
  { id: 5, username: 'LuckyStriker', nftCount: 6, rarest: 'Efficiency Expert - Mastermind', avatar: '/avatar5.png' },
]

export default function NFTsPage() {
  const [activeTab, setActiveTab] = useState<'collections' | 'my-nfts' | 'leaderboard'>('collections')
  const [selectedCollection, setSelectedCollection] = useState<number | null>(null)
  const [isConnecting, setIsConnecting] = useState<boolean>(false)
  
  const handleConnectWallet = () => {
    setIsConnecting(true)
    
    // Simulate wallet connection with setTimeout
    setTimeout(() => {
      setIsConnecting(false)
      // In a real app, this would connect to MetaMask or another wallet
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
            🎮 Betting Streak NFTs
          </h1>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 dark:text-gray-300 sm:mt-4">
            Earn exclusive soulbound NFTs for your betting achievements
          </p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden mb-8">
          <div className="border-b border-gray-200 dark:border-gray-700">
            <nav className="-mb-px flex" aria-label="Tabs">
              <button
                onClick={() => setActiveTab('collections')}
                className={`w-1/3 py-4 px-1 text-center border-b-2 font-medium text-sm ${
                  activeTab === 'collections'
                    ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                }`}
              >
                NFT Collections
              </button>
              <button
                onClick={() => setActiveTab('my-nfts')}
                className={`w-1/3 py-4 px-1 text-center border-b-2 font-medium text-sm ${
                  activeTab === 'my-nfts'
                    ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                }`}
              >
                My NFTs
              </button>
              <button
                onClick={() => setActiveTab('leaderboard')}
                className={`w-1/3 py-4 px-1 text-center border-b-2 font-medium text-sm ${
                  activeTab === 'leaderboard'
                    ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                }`}
              >
                Leaderboard
              </button>
            </nav>
          </div>
          
          <div className="p-6">
            {activeTab === 'collections' && (
              <div>
                <div className="mb-6">
                  <h2 className="text-lg font-medium text-gray-900 dark:text-white">
                    Available NFT Collections
                  </h2>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    Explore the different types of NFTs you can earn through your betting achievements.
                  </p>
                </div>
                
                <div className="space-y-6">
                  {MOCK_NFT_COLLECTIONS.map((collection) => (
                    <div 
                      key={collection.id}
                      className={`p-4 rounded-lg ${collection.color} cursor-pointer transition-all hover:shadow-md`}
                      onClick={() => setSelectedCollection(selectedCollection === collection.id ? null : collection.id)}
                    >
                      <div className="flex items-center">
                        <div className="mr-4">
                          {collection.icon}
                        </div>
                        <div>
                          <h3 className={`font-medium ${collection.textColor}`}>
                            {collection.name}
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-300">
                            {collection.description}
                          </p>
                        </div>
                      </div>
                      
                      {selectedCollection === collection.id && (
                        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                          {collection.tiers.map((tier, index) => (
                            <div key={index} className="bg-white dark:bg-gray-700 rounded-lg p-4 shadow-sm">
                              <div className="aspect-w-1 aspect-h-1 bg-gray-200 dark:bg-gray-600 rounded-lg overflow-hidden mb-3">
                                <div className="flex items-center justify-center h-40 bg-gray-200 dark:bg-gray-600 text-gray-400 dark:text-gray-500">
                                  [NFT Image]
                                </div>
                              </div>
                              <h4 className="font-medium text-gray-900 dark:text-white">
                                {tier.name}
                              </h4>
                              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                Requirement: {tier.requirement}
                              </p>
                              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                Rarity: {tier.rarity}
                              </p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {activeTab === 'my-nfts' && (
              <div>
                <div className="mb-6 flex justify-between items-center">
                  <div>
                    <h2 className="text-lg font-medium text-gray-900 dark:text-white">
                      Your NFT Collection
                    </h2>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                      View the NFTs you've earned through your betting achievements.
                    </p>
                  </div>
                  <button
                    type="button"
                    className="btn btn-primary flex items-center"
                    onClick={handleConnectWallet}
                    disabled={isConnecting}
                  >
                    {isConnecting ? (
                      <>
                        <ArrowPathIcon className="animate-spin -ml-1 mr-2 h-4 w-4" />
                        Connecting...
                      </>
                    ) : (
                      'Connect Wallet'
                    )}
                  </button>
                </div>
                
                {MOCK_USER_NFTS.length > 0 ? (
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {MOCK_USER_NFTS.map((nft) => (
                      <div key={nft.id} className="bg-white dark:bg-gray-700 rounded-lg overflow-hidden shadow-sm">
                        <div className="aspect-w-1 aspect-h-1 bg-gray-200 dark:bg-gray-600">
                          <div className="flex items-center justify-center h-48 bg-gray-200 dark:bg-gray-600 text-gray-400 dark:text-gray-500">
                            [NFT Image]
                          </div>
                        </div>
                        <div className="p-4">
                          <h3 className="font-medium text-gray-900 dark:text-white">
                            {nft.name}
                          </h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                            {nft.description}
                          </p>
                          <div className="mt-3 flex justify-between items-center">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800 dark:bg-primary-800 dark:text-primary-100">
                              {nft.rarity}
                            </span>
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                              Acquired: {nft.acquiredDate}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <p className="text-gray-500 dark:text-gray-400">
                      You haven't earned any NFTs yet. Start betting to earn your first achievement!
                    </p>
                  </div>
                )}
              </div>
            )}
            
            {activeTab === 'leaderboard' && (
              <div>
                <div className="mb-6">
                  <h2 className="text-lg font-medium text-gray-900 dark:text-white">
                    NFT Leaderboard
                  </h2>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    See who has the most impressive NFT collection in the BetPilot community.
                  </p>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-700">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                          Rank
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                          User
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                          NFTs Collected
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                          Rarest NFT
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                      {MOCK_LEADERBOARD.map((user, index) => (
                        <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                            {index + 1}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-600">
                                <div className="flex items-center justify-center h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-600 text-gray-400 dark:text-gray-500 text-xs">
                                  [Avatar]
                                </div>
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900 dark:text-white">
                                  {user.username}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                            {user.nftCount}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                            {user.rarest}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
            How to Earn NFTs
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <h3 className="font-medium text-gray-900 dark:text-white mb-2">Place Bets</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Use the BetPilot platform to place bets on your favorite sports and events.
              </p>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <h3 className="font-medium text-gray-900 dark:text-white mb-2">Achieve Milestones</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Win consecutive bets, successfully pick underdogs, or maintain high efficiency to meet NFT requirements.
              </p>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <h3 className="font-medium text-gray-900 dark:text-white mb-2">Claim Your NFTs</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                NFTs are automatically minted to your connected wallet when you achieve the requirements.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

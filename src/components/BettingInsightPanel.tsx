'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  ExclamationTriangleIcon, 
  CheckCircleIcon, 
  ChartBarIcon,
  FireIcon
} from '@heroicons/react/24/outline'
import GlowingText from './GlowingText'

interface BettingInsightPanelProps {
  odds: number
  probability: string
  confidence: 'Low' | 'Medium' | 'High'
}

export default function BettingInsightPanel({ odds, probability, confidence }: BettingInsightPanelProps) {
  // Convert probability string to number (remove % sign and convert to decimal)
  const probabilityValue = parseFloat(probability.replace('%', '')) / 100
  
  // Calculate implied probability from odds
  const impliedProbability = 1 / odds
  
  // Calculate value ratio (actual probability / implied probability)
  // Values > 1 indicate positive expected value
  const valueRatio = probabilityValue / impliedProbability
  
  // Calculate greed index (0-100)
  // Higher odds with lower probability = higher greed
  // Formula: (1 - valueRatio) * 100, capped between 0-100
  const rawGreedIndex = (1 - valueRatio) * 100
  const greedIndex = Math.min(100, Math.max(0, rawGreedIndex))
  
  // Calculate win probability score (0-100)
  // Based on the provided probability and confidence level
  const confidenceMultiplier = confidence === 'High' ? 1.1 : confidence === 'Medium' ? 1 : 0.9
  const winProbabilityScore = Math.min(100, Math.max(0, probabilityValue * 100 * confidenceMultiplier))
  
  // Determine greed level
  const getGreedLevel = () => {
    if (greedIndex < 33) return { level: 'Low', color: 'text-green-400', bgColor: 'bg-green-400/20' }
    if (greedIndex < 66) return { level: 'Medium', color: 'text-yellow-400', bgColor: 'bg-yellow-400/20' }
    return { level: 'High', color: 'text-red-400', bgColor: 'bg-red-400/20' }
  }
  
  // Determine win probability level
  const getWinProbabilityLevel = () => {
    if (winProbabilityScore < 33) return { level: 'Low', color: 'text-red-400', bgColor: 'bg-red-400/20' }
    if (winProbabilityScore < 66) return { level: 'Medium', color: 'text-yellow-400', bgColor: 'bg-yellow-400/20' }
    return { level: 'High', color: 'text-green-400', bgColor: 'bg-green-400/20' }
  }
  
  const greedLevel = getGreedLevel()
  const winProbabilityLevel = getWinProbabilityLevel()
  
  // Expected value calculation
  const expectedValue = (odds - 1) * probabilityValue - (1 - probabilityValue)
  const isPositiveEV = expectedValue > 0
  
  return (
    <div className="bg-primary-800/50 backdrop-blur-sm border border-primary-700/50 rounded-lg p-4 space-y-4">
      <GlowingText 
        as="h3" 
        className="text-lg font-medium text-white mb-4"
        glowColor="rgba(255, 255, 255, 0.6)"
        glowIntensity="light"
      >
        Betting Insights
      </GlowingText>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Win Probability Meter */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <CheckCircleIcon className={`h-5 w-5 ${winProbabilityLevel.color} mr-1.5`} />
              <span className="text-sm font-medium text-white">Win Probability</span>
            </div>
            <span className={`text-sm font-bold ${winProbabilityLevel.color}`}>
              {winProbabilityScore.toFixed(1)}%
            </span>
          </div>
          
          <div className="h-2 w-full bg-gray-700 rounded-full overflow-hidden">
            <motion.div 
              className={`h-full ${winProbabilityLevel.bgColor}`}
              initial={{ width: 0 }}
              animate={{ width: `${winProbabilityScore}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
            />
          </div>
          
          <div className="flex justify-between text-xs text-gray-400">
            <span>Low</span>
            <span>Medium</span>
            <span>High</span>
          </div>
          
          <p className="text-xs text-gray-300 mt-1">
            Based on {probability} probability with {confidence.toLowerCase()} confidence
          </p>
        </div>
        
        {/* Greed Index Meter */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <FireIcon className={`h-5 w-5 ${greedLevel.color} mr-1.5`} />
              <span className="text-sm font-medium text-white">Greed Index</span>
            </div>
            <span className={`text-sm font-bold ${greedLevel.color}`}>
              {greedIndex.toFixed(1)}%
            </span>
          </div>
          
          <div className="h-2 w-full bg-gray-700 rounded-full overflow-hidden">
            <motion.div 
              className={`h-full ${greedLevel.bgColor}`}
              initial={{ width: 0 }}
              animate={{ width: `${greedIndex}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
            />
          </div>
          
          <div className="flex justify-between text-xs text-gray-400">
            <span>Low</span>
            <span>Medium</span>
            <span>High</span>
          </div>
          
          <p className="text-xs text-gray-300 mt-1">
            {greedLevel.level} greed - {greedIndex < 33 ? 'Conservative bet' : greedIndex < 66 ? 'Balanced risk/reward' : 'High-risk bet'}
          </p>
        </div>
      </div>
      
      {/* Expected Value */}
      <div className="pt-3 border-t border-primary-700/50">
        <div className="flex items-center">
          <ChartBarIcon className={`h-5 w-5 ${isPositiveEV ? 'text-green-400' : 'text-red-400'} mr-1.5`} />
          <span className="text-sm font-medium text-white">Expected Value:</span>
          <span className={`ml-2 text-sm font-bold ${isPositiveEV ? 'text-green-400' : 'text-red-400'}`}>
            {expectedValue > 0 ? '+' : ''}{(expectedValue * 100).toFixed(2)}%
          </span>
        </div>
        <p className="text-xs text-gray-300 mt-1 pl-6">
          {isPositiveEV 
            ? 'Positive EV - This bet has mathematical value in the long run' 
            : 'Negative EV - This bet is not mathematically favorable'}
        </p>
      </div>
      
      {/* Recommendation */}
      <div className="pt-3 border-t border-primary-700/50">
        <div className="flex items-center">
          <ExclamationTriangleIcon className={`h-5 w-5 ${
            isPositiveEV && greedIndex < 50 ? 'text-green-400' : 'text-yellow-400'
          } mr-1.5`} />
          <span className="text-sm font-medium text-white">Recommendation:</span>
        </div>
        <p className="text-xs text-gray-300 mt-1 pl-6">
          {isPositiveEV && greedIndex < 33
            ? 'Strong bet - Positive expected value with low greed'
            : isPositiveEV && greedIndex < 66
            ? 'Consider betting - Positive expected value with moderate risk'
            : isPositiveEV
            ? 'Cautious bet - Positive expected value but high risk'
            : 'Avoid - Negative expected value, unfavorable odds'}
        </p>
      </div>
    </div>
  )
}

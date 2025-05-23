'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { DocumentDuplicateIcon, TrashIcon, BookmarkIcon } from '@heroicons/react/24/outline'
import GlowingText from './GlowingText'

interface SimulationScenarioProps {
  id: string
  name: string
  initialBankroll: number
  betAmount: number
  odds: number
  probability: number
  numBets: number
  averageFinal: number
  profitPercentage: number
  min: number
  max: number
  onDelete: (id: string) => void
  onDuplicate: (scenario: SimulationScenarioType) => void
  isSelected: boolean
  onSelect: (id: string) => void
}

export interface SimulationScenarioType {
  id: string
  name: string
  initialBankroll: number
  betAmount: number
  odds: number
  probability: number
  numBets: number
  averageFinal: number
  profitPercentage: number
  min: number
  max: number
}

export default function SimulationScenario({
  id,
  name,
  initialBankroll,
  betAmount,
  odds,
  probability,
  numBets,
  averageFinal,
  profitPercentage,
  min,
  max,
  onDelete,
  onDuplicate,
  isSelected,
  onSelect
}: SimulationScenarioProps) {
  const [isHovered, setIsHovered] = useState(false)
  
  const expectedValue = (odds * probability - 1) * betAmount
  const riskLevel = profitPercentage > 75 ? 'Low' : profitPercentage > 50 ? 'Medium' : 'High'
  const riskColor = profitPercentage > 75 ? 'text-green-400' : profitPercentage > 50 ? 'text-yellow-400' : 'text-red-400'
  
  return (
    <motion.div
      className={`relative p-4 rounded-lg border transition-all cursor-pointer ${
        isSelected 
          ? 'bg-primary-700/50 border-blue-500 shadow-lg shadow-blue-500/20' 
          : 'bg-primary-800/30 border-primary-700/50 hover:bg-primary-700/40'
      }`}
      onClick={() => onSelect(id)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      {/* Actions */}
      <div className={`absolute top-2 right-2 flex space-x-1 transition-opacity ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
        <button 
          onClick={(e) => {
            e.stopPropagation()
            onDuplicate({
              id,
              name,
              initialBankroll,
              betAmount,
              odds,
              probability,
              numBets,
              averageFinal,
              profitPercentage,
              min,
              max
            })
          }}
          className="p-1 rounded-full bg-primary-700 hover:bg-primary-600 text-white"
          title="Duplicate scenario"
        >
          <DocumentDuplicateIcon className="h-4 w-4" />
        </button>
        <button 
          onClick={(e) => {
            e.stopPropagation()
            onDelete(id)
          }}
          className="p-1 rounded-full bg-red-700 hover:bg-red-600 text-white"
          title="Delete scenario"
        >
          <TrashIcon className="h-4 w-4" />
        </button>
      </div>
      
      {/* Selected indicator */}
      {isSelected && (
        <div className="absolute top-2 left-2">
          <BookmarkIcon className="h-4 w-4 text-blue-400" />
        </div>
      )}
      
      <GlowingText
        as="h4"
        className="text-md font-medium text-white mb-2 mt-1"
        glowColor="rgba(255, 255, 255, 0.5)"
        glowIntensity="light"
      >
        {name}
      </GlowingText>
      
      <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
        <div className="text-gray-400">Initial Bankroll:</div>
        <div className="text-white font-medium">${initialBankroll}</div>
        
        <div className="text-gray-400">Bet Amount:</div>
        <div className="text-white font-medium">${betAmount}</div>
        
        <div className="text-gray-400">Odds:</div>
        <div className="text-white font-medium">{odds}x</div>
        
        <div className="text-gray-400">Win Probability:</div>
        <div className="text-white font-medium">{Math.round(probability * 100)}%</div>
        
        <div className="text-gray-400">Number of Bets:</div>
        <div className="text-white font-medium">{numBets}</div>
        
        <div className="text-gray-400">Expected Value:</div>
        <div className={`font-medium ${expectedValue >= 0 ? 'text-green-400' : 'text-red-400'}`}>
          ${expectedValue.toFixed(2)} per bet
        </div>
        
        <div className="text-gray-400">Risk Level:</div>
        <div className={`font-medium ${riskColor}`}>{riskLevel}</div>
        
        <div className="text-gray-400">Profit Chance:</div>
        <div className="text-white font-medium">{Math.round(profitPercentage)}%</div>
        
        <div className="text-gray-400">Avg Final Bankroll:</div>
        <div className="text-white font-medium">${Math.round(averageFinal)}</div>
      </div>
    </motion.div>
  )
}

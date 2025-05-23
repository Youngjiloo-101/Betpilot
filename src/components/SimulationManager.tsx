'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { PlusIcon, ChartBarIcon, ArrowPathIcon } from '@heroicons/react/24/outline'
import SimulationScenario, { SimulationScenarioType } from './SimulationScenario'
import GlowingText from './GlowingText'

interface SimulationManagerProps {
  currentSimulation: {
    initialBankroll: number
    betAmount: number
    odds: number
    probability: number
    numBets: number
    averageFinal: number
    profitPercentage: number
    min: number
    max: number
  } | null
  onCompare: (scenarios: SimulationScenarioType[]) => void
}

export default function SimulationManager({ currentSimulation, onCompare }: SimulationManagerProps) {
  const [scenarios, setScenarios] = useState<SimulationScenarioType[]>([])
  const [selectedScenarios, setSelectedScenarios] = useState<string[]>([])
  const [isExpanded, setIsExpanded] = useState(false)
  const [scenarioName, setScenarioName] = useState('')
  
  // Load saved scenarios from localStorage on mount
  useEffect(() => {
    const savedScenarios = localStorage.getItem('betpilot-simulation-scenarios')
    if (savedScenarios) {
      try {
        setScenarios(JSON.parse(savedScenarios))
      } catch (e) {
        console.error('Failed to parse saved scenarios', e)
      }
    }
  }, [])
  
  // Save scenarios to localStorage when they change
  useEffect(() => {
    if (scenarios.length > 0) {
      localStorage.setItem('betpilot-simulation-scenarios', JSON.stringify(scenarios))
    }
  }, [scenarios])
  
  const saveCurrentSimulation = () => {
    if (!currentSimulation) return
    
    const newScenario: SimulationScenarioType = {
      id: `scenario-${Date.now()}`,
      name: scenarioName || `Scenario ${scenarios.length + 1}`,
      ...currentSimulation
    }
    
    setScenarios([...scenarios, newScenario])
    setScenarioName('')
  }
  
  const deleteScenario = (id: string) => {
    setScenarios(scenarios.filter(s => s.id !== id))
    setSelectedScenarios(selectedScenarios.filter(s => s !== id))
  }
  
  const duplicateScenario = (scenario: SimulationScenarioType) => {
    const newScenario = {
      ...scenario,
      id: `scenario-${Date.now()}`,
      name: `${scenario.name} (Copy)`
    }
    setScenarios([...scenarios, newScenario])
  }
  
  const toggleScenarioSelection = (id: string) => {
    if (selectedScenarios.includes(id)) {
      setSelectedScenarios(selectedScenarios.filter(s => s !== id))
    } else {
      // Limit to 3 selections
      if (selectedScenarios.length < 3) {
        setSelectedScenarios([...selectedScenarios, id])
      }
    }
  }
  
  const handleCompare = () => {
    const scenariosToCompare = scenarios.filter(s => selectedScenarios.includes(s.id))
    onCompare(scenariosToCompare)
  }
  
  return (
    <div className="bg-primary-800/30 backdrop-blur-sm border border-primary-700/50 shadow-xl rounded-lg overflow-hidden">
      <div 
        className="p-4 flex justify-between items-center cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <GlowingText
          as="h3"
          className="text-lg font-medium text-white"
          glowColor="rgba(255, 255, 255, 0.6)"
          glowIntensity="light"
        >
          Saved Scenarios
        </GlowingText>
        <div className="flex items-center">
          <span className="text-sm text-gray-300 mr-2">{scenarios.length} saved</span>
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <ArrowPathIcon className="h-5 w-5 text-gray-300" />
          </motion.div>
        </div>
      </div>
      
      {isExpanded && (
        <div className="p-4 pt-0 border-t border-primary-700/50">
          {/* Save current simulation */}
          {currentSimulation && (
            <div className="mb-4 p-3 bg-primary-700/30 rounded-lg">
              <div className="flex items-center mb-2">
                <input
                  type="text"
                  placeholder="Name this scenario"
                  value={scenarioName}
                  onChange={(e) => setScenarioName(e.target.value)}
                  className="flex-1 rounded-md border-gray-700 bg-primary-800/50 text-white shadow-sm focus:border-primary-500 focus:ring-primary-500 text-sm"
                />
                <button
                  onClick={saveCurrentSimulation}
                  className="ml-2 p-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white flex items-center transition-colors"
                >
                  <PlusIcon className="h-4 w-4 mr-1" />
                  Save
                </button>
              </div>
              <p className="text-xs text-gray-400">
                Save the current simulation parameters and results for future comparison
              </p>
            </div>
          )}
          
          {/* Saved scenarios */}
          {scenarios.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                {scenarios.map((scenario) => (
                  <SimulationScenario
                    key={scenario.id}
                    {...scenario}
                    onDelete={deleteScenario}
                    onDuplicate={duplicateScenario}
                    isSelected={selectedScenarios.includes(scenario.id)}
                    onSelect={toggleScenarioSelection}
                  />
                ))}
              </div>
              
              {/* Compare button */}
              {selectedScenarios.length > 1 && (
                <div className="flex justify-center">
                  <button
                    onClick={handleCompare}
                    className="py-2 px-4 rounded-md bg-green-600 hover:bg-green-700 text-white flex items-center transition-colors"
                  >
                    <ChartBarIcon className="h-4 w-4 mr-2" />
                    Compare {selectedScenarios.length} Scenarios
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-6 text-gray-400">
              <p>No saved scenarios yet</p>
              <p className="text-sm mt-1">Run a simulation and save it to compare different betting strategies</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

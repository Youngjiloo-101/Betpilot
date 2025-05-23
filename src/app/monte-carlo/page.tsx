'use client'

import { useState, useEffect, useRef } from 'react'
import { ArrowPathIcon, ChartBarIcon, CurrencyDollarIcon, DocumentDuplicateIcon, ArrowsPointingOutIcon } from '@heroicons/react/24/outline'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend, Filler } from 'chart.js'
import { Line, Bar } from 'react-chartjs-2'
import AnimatedSection, { AnimatedCard, AnimatedText, FadeInView } from '@/components/AnimatedSection'
import GlowingText from '@/components/GlowingText'
import BetPilotLogo from '@/components/BetPilotLogo'
import RotatingSuiLogo from '@/components/RotatingSuiLogo'
import SimulationManager from '@/components/SimulationManager'
import SimulationComparison from '@/components/SimulationComparison'
import { SimulationScenarioType } from '@/components/SimulationScenario'

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
)

// Helper function to generate random outcomes based on probability
const runMonteCarloSimulation = (
  initialBankroll: number,
  betAmount: number,
  odds: number,
  probability: number,
  numSimulations: number,
  numBets: number
) => {
  // Results array to store final bankrolls for each simulation
  const results = []
  
  // Arrays to track percentiles over time
  const percentile10 = Array(numBets).fill(0)
  const percentile25 = Array(numBets).fill(0)
  const percentile50 = Array(numBets).fill(0)
  const percentile75 = Array(numBets).fill(0)
  const percentile90 = Array(numBets).fill(0)
  
  // Run simulations
  for (let sim = 0; sim < numSimulations; sim++) {
    let bankroll = initialBankroll
    const bankrollHistory = [bankroll]
    
    for (let bet = 0; bet < numBets; bet++) {
      // Determine if bet wins based on probability
      const isWin = Math.random() < probability
      
      // Update bankroll
      if (isWin) {
        bankroll += betAmount * (odds - 1)
      } else {
        bankroll -= betAmount
      }
      
      // Ensure bankroll doesn't go negative
      bankroll = Math.max(0, bankroll)
      bankrollHistory.push(bankroll)
    }
    
    results.push(bankrollHistory)
  }
  
  // Calculate percentiles at each bet
  for (let bet = 0; bet <= numBets; bet++) {
    const bankrollsAtBet = results.map(sim => sim[bet]).sort((a, b) => a - b)
    
    percentile10[bet] = bankrollsAtBet[Math.floor(numSimulations * 0.1)]
    percentile25[bet] = bankrollsAtBet[Math.floor(numSimulations * 0.25)]
    percentile50[bet] = bankrollsAtBet[Math.floor(numSimulations * 0.5)]
    percentile75[bet] = bankrollsAtBet[Math.floor(numSimulations * 0.75)]
    percentile90[bet] = bankrollsAtBet[Math.floor(numSimulations * 0.9)]
  }
  
  // Calculate final statistics
  const finalBankrolls = results.map(sim => sim[sim.length - 1])
  const averageFinal = finalBankrolls.reduce((sum, val) => sum + val, 0) / numSimulations
  const profitableSims = finalBankrolls.filter(val => val > initialBankroll).length
  const profitPercentage = (profitableSims / numSimulations) * 100
  
  // Calculate distribution of final bankrolls
  const min = Math.min(...finalBankrolls)
  const max = Math.max(...finalBankrolls)
  const range = max - min
  const numBins = 10
  const binSize = range / numBins
  
  const distributionLabels = []
  const distributionData = Array(numBins).fill(0)
  
  for (let i = 0; i < numBins; i++) {
    const binStart = min + i * binSize
    const binEnd = binStart + binSize
    distributionLabels.push(`$${Math.round(binStart)} - $${Math.round(binEnd)}`)
    
    distributionData[i] = finalBankrolls.filter(val => val >= binStart && val < binEnd).length
  }
  
  return {
    percentiles: {
      p10: percentile10,
      p25: percentile25,
      p50: percentile50,
      p75: percentile75,
      p90: percentile90,
    },
    statistics: {
      averageFinal,
      profitPercentage,
      min: Math.min(...finalBankrolls),
      max: Math.max(...finalBankrolls),
    },
    distribution: {
      labels: distributionLabels,
      data: distributionData,
    }
  }
}

export default function MonteCarloPage() {
  const [initialBankroll, setInitialBankroll] = useState<string>('1000')
  const [betAmount, setBetAmount] = useState<string>('100')
  const [odds, setOdds] = useState<string>('2.0')
  const [probability, setProbability] = useState<string>('0.45')
  const [numBets, setNumBets] = useState<string>('20')
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [simulationResults, setSimulationResults] = useState<any>(null)
  const [showComparison, setShowComparison] = useState<boolean>(false)
  const [scenariosToCompare, setScenariosToCompare] = useState<SimulationScenarioType[]>([])
  
  const lineChartRef = useRef<any>(null)
  const distributionChartRef = useRef<any>(null)
  
  const handleRunSimulation = () => {
    setIsLoading(true)
    
    // Simulate API call with setTimeout
    setTimeout(() => {
      const results = runMonteCarloSimulation(
        parseFloat(initialBankroll),
        parseFloat(betAmount),
        parseFloat(odds),
        parseFloat(probability),
        1000, // Number of simulations
        parseInt(numBets)
      )
      
      setSimulationResults(results)
      setIsLoading(false)
    }, 1500)
  }
  
  const lineChartData = simulationResults ? {
    labels: Array.from({ length: parseInt(numBets) + 1 }, (_, i) => i),
    datasets: [
      {
        label: '90th Percentile',
        data: simulationResults.percentiles.p90,
        borderColor: 'rgba(16, 185, 129, 1)',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        borderWidth: 2,
        tension: 0.4,
        fill: '+1',
      },
      {
        label: '75th Percentile',
        data: simulationResults.percentiles.p75,
        borderColor: 'rgba(59, 130, 246, 1)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        borderWidth: 2,
        tension: 0.4,
        fill: '+1',
      },
      {
        label: 'Median (50th)',
        data: simulationResults.percentiles.p50,
        borderColor: 'rgba(107, 114, 128, 1)',
        backgroundColor: 'rgba(107, 114, 128, 0.1)',
        borderWidth: 3,
        tension: 0.4,
        fill: '+1',
      },
      {
        label: '25th Percentile',
        data: simulationResults.percentiles.p25,
        borderColor: 'rgba(245, 158, 11, 1)',
        backgroundColor: 'rgba(245, 158, 11, 0.1)',
        borderWidth: 2,
        tension: 0.4,
        fill: '+1',
      },
      {
        label: '10th Percentile',
        data: simulationResults.percentiles.p10,
        borderColor: 'rgba(239, 68, 68, 1)',
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        borderWidth: 2,
        tension: 0.4,
        fill: 'origin',
      },
    ],
  } : null
  
  const lineChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: 'rgba(255, 255, 255, 0.8)'
        }
      },
      title: {
        display: true,
        text: 'Bankroll Percentiles Over Time',
        color: 'rgba(255, 255, 255, 0.9)'
      },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            return `${context.dataset.label}: $${Math.round(context.raw)}`
          }
        }
      }
    },
    scales: {
      y: {
        title: {
          display: true,
          text: 'Bankroll ($)',
          color: 'rgba(255, 255, 255, 0.7)'
        },
        min: 0,
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        },
        ticks: {
          color: 'rgba(255, 255, 255, 0.7)'
        }
      },
      x: {
        title: {
          display: true,
          text: 'Number of Bets',
          color: 'rgba(255, 255, 255, 0.7)'
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        },
        ticks: {
          color: 'rgba(255, 255, 255, 0.7)'
        }
      },
    },
  }
  
  const distributionChartData = simulationResults ? {
    labels: simulationResults.distribution.labels,
    datasets: [
      {
        label: 'Number of Simulations',
        data: simulationResults.distribution.data,
        backgroundColor: 'rgba(59, 130, 246, 0.8)',
        borderColor: 'rgba(59, 130, 246, 1)',
        borderWidth: 1,
      },
    ],
  } : null
  
  const distributionChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: 'rgba(255, 255, 255, 0.8)'
        }
      },
      title: {
        display: true,
        text: 'Distribution of Final Bankrolls',
        color: 'rgba(255, 255, 255, 0.9)'
      },
    },
    scales: {
      y: {
        title: {
          display: true,
          text: 'Frequency',
          color: 'rgba(255, 255, 255, 0.7)'
        },
        min: 0,
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        },
        ticks: {
          color: 'rgba(255, 255, 255, 0.7)'
        }
      },
      x: {
        title: {
          display: true,
          text: 'Bankroll Range',
          color: 'rgba(255, 255, 255, 0.7)'
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        },
        ticks: {
          color: 'rgba(255, 255, 255, 0.7)'
        }
      },
    },
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-900 to-primary-950 pt-24 relative">
      {/* Sui Logo in center of page */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-0 opacity-20">
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
                🧮 Monte Carlo Simulator
              </GlowingText>
            </AnimatedText>
            <AnimatedText delay={0.1}>
              <GlowingText 
                as="p" 
                className="mt-3 max-w-2xl mx-auto text-xl text-gray-300 sm:mt-4"
                glowColor="rgba(209, 213, 219, 0.5)"
                glowIntensity="light"
              >
                Simulate thousands of bet outcomes to visualize risk and potential returns
              </GlowingText>
            </AnimatedText>
          </div>
        </AnimatedSection>
        
        <AnimatedCard delay={0.2} className="max-w-3xl mx-auto bg-primary-800/30 backdrop-blur-sm border border-primary-700/50 shadow-xl rounded-lg p-6 mb-10">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label htmlFor="initialBankroll" className="block text-sm font-medium text-white">
                Initial Bankroll ($)
              </label>
              <div className="mt-1">
                <input
                  type="number"
                  name="initialBankroll"
                  id="initialBankroll"
                  min="100"
                  className="input"
                  value={initialBankroll}
                  onChange={(e) => setInitialBankroll(e.target.value)}
                  placeholder="e.g. 1000"
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="betAmount" className="block text-sm font-medium text-white">
                Bet Amount ($)
              </label>
              <div className="mt-1">
                <input
                  type="number"
                  name="betAmount"
                  id="betAmount"
                  min="1"
                  className="input"
                  value={betAmount}
                  onChange={(e) => setBetAmount(e.target.value)}
                  placeholder="e.g. 100"
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="odds" className="block text-sm font-medium text-white">
                Odds Multiplier
              </label>
              <div className="mt-1">
                <input
                  type="number"
                  name="odds"
                  id="odds"
                  min="1.01"
                  step="0.01"
                  className="input"
                  value={odds}
                  onChange={(e) => setOdds(e.target.value)}
                  placeholder="e.g. 2.0"
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="probability" className="block text-sm font-medium text-white">
                Win Probability (0-1)
              </label>
              <div className="mt-1">
                <input
                  type="number"
                  name="probability"
                  id="probability"
                  min="0.01"
                  max="0.99"
                  step="0.01"
                  className="input"
                  value={probability}
                  onChange={(e) => setProbability(e.target.value)}
                  placeholder="e.g. 0.45"
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="numBets" className="block text-sm font-medium text-white">
                Number of Bets
              </label>
              <div className="mt-1">
                <input
                  type="number"
                  name="numBets"
                  id="numBets"
                  min="1"
                  max="100"
                  className="input"
                  value={numBets}
                  onChange={(e) => setNumBets(e.target.value)}
                  placeholder="e.g. 20"
                />
              </div>
            </div>
          </div>
          
          <div className="mt-6">
            <button
              type="button"
              className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
              onClick={handleRunSimulation}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <ArrowPathIcon className="animate-spin -ml-1 mr-2 h-4 w-4" />
                  Running Simulation...
                </>
              ) : (
                'Run Monte Carlo Simulation'
              )}
            </button>
          </div>
        </AnimatedCard>
        
        {simulationResults && (
          <FadeInView className="space-y-8">
            {/* Simulation Manager */}
            <SimulationManager 
              currentSimulation={{
                initialBankroll: parseFloat(initialBankroll),
                betAmount: parseFloat(betAmount),
                odds: parseFloat(odds),
                probability: parseFloat(probability),
                numBets: parseInt(numBets),
                averageFinal: simulationResults.statistics.averageFinal,
                profitPercentage: simulationResults.statistics.profitPercentage,
                min: simulationResults.statistics.min,
                max: simulationResults.statistics.max
              }}
              onCompare={(scenarios) => {
                setScenariosToCompare(scenarios);
                setShowComparison(true);
              }}
            />
            <div className="bg-primary-800/30 backdrop-blur-sm border border-primary-700/50 shadow-xl rounded-lg p-6">
              <GlowingText 
                as="h3" 
                className="text-lg font-medium text-white mb-4"
                glowColor="rgba(255, 255, 255, 0.6)"
                glowIntensity="light"
              >
                Simulation Results
              </GlowingText>
              
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <div className="bg-primary-700/30 border border-primary-600/30 p-4 rounded-lg">
                  <div className="flex items-center mb-1">
                    <CurrencyDollarIcon className="h-4 w-4 text-blue-400 mr-1" />
                    <p className="text-sm text-gray-300">Average Final Bankroll</p>
                  </div>
                  <p className="text-xl font-semibold text-white">
                    ${Math.round(simulationResults.statistics.averageFinal)}
                  </p>
                </div>
                
                <div className="bg-primary-700/30 border border-primary-600/30 p-4 rounded-lg">
                  <div className="flex items-center mb-1">
                    <ChartBarIcon className="h-4 w-4 text-green-400 mr-1" />
                    <p className="text-sm text-gray-300">Profit Percentage</p>
                  </div>
                  <p className="text-xl font-semibold text-white">
                    {Math.round(simulationResults.statistics.profitPercentage)}%
                  </p>
                </div>
                
                <div className="bg-primary-700/30 border border-primary-600/30 p-4 rounded-lg">
                  <div className="flex items-center mb-1">
                    <ArrowPathIcon className="h-4 w-4 text-red-400 mr-1" />
                    <p className="text-sm text-gray-300">Minimum Final Bankroll</p>
                  </div>
                  <p className="text-xl font-semibold text-white">
                    ${Math.round(simulationResults.statistics.min)}
                  </p>
                </div>
                
                <div className="bg-primary-700/30 border border-primary-600/30 p-4 rounded-lg">
                  <div className="flex items-center mb-1">
                    <ArrowsPointingOutIcon className="h-4 w-4 text-yellow-400 mr-1" />
                    <p className="text-sm text-gray-300">Maximum Final Bankroll</p>
                  </div>
                  <p className="text-xl font-semibold text-white">
                    ${Math.round(simulationResults.statistics.max)}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-primary-800/30 backdrop-blur-sm border border-primary-700/50 shadow-xl rounded-lg p-6">
              <GlowingText 
                as="h3" 
                className="text-lg font-medium text-white mb-4"
                glowColor="rgba(255, 255, 255, 0.6)"
                glowIntensity="light"
              >
                Bankroll Percentiles Over Time
              </GlowingText>
              <div className="h-80">
                {lineChartData && (
                  <Line
                    ref={lineChartRef}
                    data={lineChartData}
                    options={lineChartOptions}
                  />
                )}
              </div>
            </div>
            
            <div className="bg-primary-800/30 backdrop-blur-sm border border-primary-700/50 shadow-xl rounded-lg p-6">
              <GlowingText 
                as="h3" 
                className="text-lg font-medium text-white mb-4"
                glowColor="rgba(255, 255, 255, 0.6)"
                glowIntensity="light"
              >
                Distribution of Final Bankrolls
              </GlowingText>
              <div className="h-80">
                {distributionChartData && (
                  <Bar
                    ref={distributionChartRef}
                    data={distributionChartData}
                    options={distributionChartOptions}
                  />
                )}
              </div>
            </div>
            
            <div className="bg-primary-800/30 backdrop-blur-sm border border-primary-700/50 shadow-xl rounded-lg p-6">
              <GlowingText 
                as="h3" 
                className="text-lg font-medium text-white mb-4"
                glowColor="rgba(255, 255, 255, 0.6)"
                glowIntensity="light"
              >
                Insights
              </GlowingText>
              <div className="prose prose-invert max-w-none text-gray-300">
                <p>
                  Based on {1000} simulations with an initial bankroll of ${initialBankroll}, 
                  betting ${betAmount} per bet at {odds}x odds with a {Math.round(parseFloat(probability) * 100)}% win probability:
                </p>
                <ul>
                  <li>
                    <strong>Expected Value (EV):</strong> ${Math.round((parseFloat(odds) * parseFloat(probability) - 1) * parseFloat(betAmount))} per bet
                  </li>
                  <li>
                    <strong>Profit Chance:</strong> {Math.round(simulationResults.statistics.profitPercentage)}% of simulations ended with more money than you started with
                  </li>
                  <li>
                    <strong>Risk Assessment:</strong> {
                      simulationResults.statistics.profitPercentage > 75 ? 'Low Risk' :
                      simulationResults.statistics.profitPercentage > 50 ? 'Medium Risk' :
                      'High Risk'
                    }
                  </li>
                  <li>
                    <strong>Variance:</strong> {
                      (simulationResults.statistics.max - simulationResults.statistics.min) > parseFloat(initialBankroll) * 2 ? 'High' :
                      (simulationResults.statistics.max - simulationResults.statistics.min) > parseFloat(initialBankroll) ? 'Medium' :
                      'Low'
                    }
                  </li>
                </ul>
              </div>
            </div>
          </FadeInView>
        )}
        
        {/* Simulation Comparison Modal */}
        {showComparison && (
          <SimulationComparison 
            scenarios={scenariosToCompare}
            onClose={() => setShowComparison(false)}
          />
        )}
      </div>
    </div>
  )
}

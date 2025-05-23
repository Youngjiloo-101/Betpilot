'use client'

import { useRef, useEffect } from 'react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend } from 'chart.js'
import { Line, Bar } from 'react-chartjs-2'
import { SimulationScenarioType } from './SimulationScenario'
import GlowingText from './GlowingText'

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
)

interface SimulationComparisonProps {
  scenarios: SimulationScenarioType[]
  onClose: () => void
}

export default function SimulationComparison({ scenarios, onClose }: SimulationComparisonProps) {
  const chartRef = useRef<any>(null)
  
  // Generate random colors for each scenario
  const colors = [
    'rgba(59, 130, 246, 1)', // blue
    'rgba(16, 185, 129, 1)',  // green
    'rgba(245, 158, 11, 1)'   // amber
  ]
  
  // Prepare data for comparison chart
  const comparisonData = {
    labels: ['Initial', 'Final (Avg)', 'Min', 'Max'],
    datasets: scenarios.map((scenario, index) => ({
      label: scenario.name,
      data: [
        scenario.initialBankroll,
        scenario.averageFinal,
        scenario.min,
        scenario.max
      ],
      backgroundColor: colors[index % colors.length].replace('1)', '0.2)'),
      borderColor: colors[index % colors.length],
      borderWidth: 2,
    }))
  }
  
  const comparisonOptions = {
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
        text: 'Bankroll Comparison',
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
          text: 'Metrics',
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
  
  // Prepare data for profit percentage comparison
  const profitData = {
    labels: scenarios.map(s => s.name),
    datasets: [
      {
        label: 'Profit Percentage',
        data: scenarios.map(s => s.profitPercentage),
        backgroundColor: scenarios.map((_, index) => colors[index % colors.length].replace('1)', '0.7)')),
        borderColor: scenarios.map((_, index) => colors[index % colors.length]),
        borderWidth: 1,
      }
    ]
  }
  
  const profitOptions = {
    responsive: true,
    indexAxis: 'y' as const,
    plugins: {
      legend: {
        display: false
      },
      title: {
        display: true,
        text: 'Profit Percentage Comparison',
        color: 'rgba(255, 255, 255, 0.9)'
      },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            return `Profit %: ${Math.round(context.raw)}%`
          }
        }
      }
    },
    scales: {
      y: {
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
          text: 'Profit Percentage (%)',
          color: 'rgba(255, 255, 255, 0.7)'
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        },
        ticks: {
          color: 'rgba(255, 255, 255, 0.7)'
        },
        max: 100
      },
    },
  }
  
  // Calculate expected value for each scenario
  const expectedValues = scenarios.map(s => ({
    name: s.name,
    ev: (s.odds * s.probability - 1) * s.betAmount,
    color: scenarios.indexOf(s) % colors.length
  }))
  
  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-primary-800/90 border border-primary-700/50 rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-4 border-b border-primary-700/50">
          <GlowingText
            as="h2"
            className="text-xl font-bold text-white"
            glowColor="rgba(255, 255, 255, 0.6)"
            glowIntensity="medium"
          >
            Scenario Comparison
          </GlowingText>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-primary-700/50"
          >
            <XMarkIcon className="h-6 w-6 text-white" />
          </button>
        </div>
        
        <div className="p-6 space-y-8">
          {/* Scenario details */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {scenarios.map((scenario, index) => (
              <div 
                key={scenario.id}
                className="bg-primary-700/30 border border-primary-600/30 p-4 rounded-lg"
                style={{ borderLeftColor: colors[index % colors.length], borderLeftWidth: '4px' }}
              >
                <GlowingText
                  as="h4"
                  className="text-md font-medium text-white mb-3"
                  glowColor="rgba(255, 255, 255, 0.5)"
                  glowIntensity="light"
                >
                  {scenario.name}
                </GlowingText>
                
                <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                  <div className="text-gray-400">Initial Bankroll:</div>
                  <div className="text-white font-medium">${scenario.initialBankroll}</div>
                  
                  <div className="text-gray-400">Bet Amount:</div>
                  <div className="text-white font-medium">${scenario.betAmount}</div>
                  
                  <div className="text-gray-400">Odds:</div>
                  <div className="text-white font-medium">{scenario.odds}x</div>
                  
                  <div className="text-gray-400">Win Probability:</div>
                  <div className="text-white font-medium">{Math.round(scenario.probability * 100)}%</div>
                  
                  <div className="text-gray-400">Number of Bets:</div>
                  <div className="text-white font-medium">{scenario.numBets}</div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Bankroll comparison chart */}
          <div className="bg-primary-700/30 border border-primary-600/30 p-4 rounded-lg">
            <div className="h-80">
              <Bar
                ref={chartRef}
                data={comparisonData}
                options={comparisonOptions}
              />
            </div>
          </div>
          
          {/* Profit percentage comparison */}
          <div className="bg-primary-700/30 border border-primary-600/30 p-4 rounded-lg">
            <div className="h-60">
              <Bar
                data={profitData}
                options={profitOptions}
              />
            </div>
          </div>
          
          {/* Expected value comparison */}
          <div className="bg-primary-700/30 border border-primary-600/30 p-4 rounded-lg">
            <GlowingText
              as="h4"
              className="text-md font-medium text-white mb-3"
              glowColor="rgba(255, 255, 255, 0.5)"
              glowIntensity="light"
            >
              Expected Value Comparison
            </GlowingText>
            
            <div className="space-y-3">
              {expectedValues.map((item, index) => (
                <div key={index} className="flex items-center">
                  <div 
                    className="w-3 h-3 rounded-full mr-2" 
                    style={{ backgroundColor: colors[item.color] }}
                  />
                  <div className="flex-1 text-white">{item.name}</div>
                  <div className={`font-medium ${item.ev >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                    ${item.ev.toFixed(2)} per bet
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Analysis and insights */}
          <div className="bg-primary-700/30 border border-primary-600/30 p-4 rounded-lg">
            <GlowingText
              as="h4"
              className="text-md font-medium text-white mb-3"
              glowColor="rgba(255, 255, 255, 0.5)"
              glowIntensity="light"
            >
              Analysis & Insights
            </GlowingText>
            
            <div className="prose prose-invert max-w-none text-gray-300 text-sm">
              <p>
                Based on the comparison of these scenarios:
              </p>
              
              <ul>
                {/* Best expected value */}
                <li>
                  <strong>Best Expected Value:</strong>{' '}
                  {expectedValues.sort((a, b) => b.ev - a.ev)[0].name} with ${expectedValues.sort((a, b) => b.ev - a.ev)[0].ev.toFixed(2)} per bet
                </li>
                
                {/* Highest profit percentage */}
                <li>
                  <strong>Highest Profit Chance:</strong>{' '}
                  {scenarios.sort((a, b) => b.profitPercentage - a.profitPercentage)[0].name} with {Math.round(scenarios.sort((a, b) => b.profitPercentage - a.profitPercentage)[0].profitPercentage)}% chance
                </li>
                
                {/* Highest potential return */}
                <li>
                  <strong>Highest Potential Return:</strong>{' '}
                  {scenarios.sort((a, b) => b.max - a.max)[0].name} with maximum bankroll of ${Math.round(scenarios.sort((a, b) => b.max - a.max)[0].max)}
                </li>
                
                {/* Lowest risk */}
                <li>
                  <strong>Lowest Risk:</strong>{' '}
                  {scenarios.sort((a, b) => (a.min / a.initialBankroll) - (b.min / b.initialBankroll))[0].name} with minimum bankroll of ${Math.round(scenarios.sort((a, b) => (a.min / a.initialBankroll) - (b.min / b.initialBankroll))[0].min)}
                </li>
              </ul>
              
              <p>
                <strong>Recommendation:</strong> If you prioritize consistent returns, choose the scenario with the highest profit percentage. 
                If you're looking for the highest potential return, select the scenario with the highest maximum bankroll. 
                For the best balance of risk and reward, choose the scenario with the highest expected value.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

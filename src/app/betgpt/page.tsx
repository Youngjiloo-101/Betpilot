'use client'

import { useState, useRef, useEffect } from 'react'
import { PaperAirplaneIcon, ArrowPathIcon, LightBulbIcon } from '@heroicons/react/24/outline'

// Mock data for AI responses
const MOCK_RESPONSES = {
  betAnalysis: `
## Bet Analysis: Manchester United vs Liverpool

Based on your selection of Manchester United to win at odds of 3.5, here's my analysis:

### Historical Context
- Manchester United has won 2 of their last 5 matches against Liverpool at home
- Their current form shows 3 wins in the last 5 games across all competitions
- Key player Bruno Fernandes has scored in 4 of the last 6 home games

### Risk Assessment
- **Medium-High Risk** (Win probability approximately 28%)
- The odds of 3.5 suggest bookmakers view this as an underdog bet
- Liverpool's away form has been strong this season with only 2 losses

### Alternative Bets to Consider
- **Double Chance (Man Utd or Draw)** - Odds: 1.75, Probability: 57%
- **Both Teams to Score** - Odds: 1.65, Probability: 61%
- **Man Utd +1.5 Handicap** - Odds: 1.45, Probability: 69%

### Value Assessment
This bet has a slight positive expected value (+0.05), suggesting it may be worth considering if you're comfortable with the risk level.
  `,
  
  strategyAdvice: `
## Betting Strategy Advice

For your $100 bankroll targeting sports betting, I recommend:

### Bankroll Management
- Use the **Kelly Criterion** to determine optimal bet sizes
- Never bet more than 5% of your bankroll on a single wager
- Consider a more conservative 2-3% per bet for higher-risk bets

### Diversification Strategy
- Spread bets across different sports and leagues to reduce variance
- Mix bet types (moneyline, spreads, totals) for better risk distribution
- Consider creating a "core" portfolio of lower-risk bets (70%) and a "speculative" portfolio for higher-risk opportunities (30%)

### Value Betting Approach
- Focus on finding positive expected value rather than just picking winners
- Compare your calculated probabilities with bookmaker implied probabilities
- Target markets with higher inefficiencies (minor leagues, prop bets, etc.)

### Record Keeping
- Track all bets with detailed notes on your reasoning
- Regularly review performance to identify strengths and weaknesses
- Calculate ROI by bet type and sport to optimize your strategy
  `,
  
  marketInsight: `
## Market Insight: Premier League Betting Trends

### Current Market Inefficiencies
- **Home Underdog Value**: Teams like Brighton and Brentford are consistently undervalued when playing at home against top-6 sides
- **Under 2.5 Goals Market**: The market is currently overpricing "Over 2.5 Goals" in matches involving defensive teams like Wolves and Crystal Palace
- **Second Half Goals**: There's value in "More Goals in Second Half" markets across the league (56% of goals scored in second half this season)

### Line Movement Analysis
- Early lines for marquee matches often move 0.2-0.3 points after initial sharp money
- Injury news typically impacts totals markets more significantly than match result markets
- Late money (1-2 hours before kickoff) has been less predictive of outcomes this season

### Bookmaker Pricing Patterns
- Certain bookmakers consistently offer better odds on home favorites (Bet365, Unibet)
- Others provide better value on underdogs and Asian handicaps (Pinnacle, SBOBet)
- Shop for the best lines to gain an average of 3-5% edge over a season
  `
}

interface Message {
  role: 'user' | 'assistant'
  content: string
}

export default function BetGPTPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: 'Hello! I\'m BetGPT, your AI betting assistant. How can I help you today? You can ask me about specific bets, betting strategies, or market insights.'
    }
  ])
  const [input, setInput] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [suggestions, setSuggestions] = useState<string[]>([
    'Analyze my bet on Manchester United',
    'What betting strategy should I use?',
    'Any insights on Premier League betting?'
  ])
  
  const messagesEndRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    scrollToBottom()
  }, [messages])
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }
  
  const handleSendMessage = () => {
    if (input.trim() === '') return
    
    const userMessage: Message = {
      role: 'user',
      content: input
    }
    
    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsLoading(true)
    
    // Simulate API call with setTimeout
    setTimeout(() => {
      let responseContent = ''
      
      // Simple keyword matching for demo purposes
      if (input.toLowerCase().includes('manchester united') || input.toLowerCase().includes('analyze my bet')) {
        responseContent = MOCK_RESPONSES.betAnalysis
      } else if (input.toLowerCase().includes('strategy') || input.toLowerCase().includes('bankroll')) {
        responseContent = MOCK_RESPONSES.strategyAdvice
      } else if (input.toLowerCase().includes('premier league') || input.toLowerCase().includes('insight')) {
        responseContent = MOCK_RESPONSES.marketInsight
      } else {
        responseContent = "I understand you're asking about betting, but I need more specific information to provide a helpful response. You can ask me about specific bets, betting strategies, or market insights."
      }
      
      const assistantMessage: Message = {
        role: 'assistant',
        content: responseContent
      }
      
      setMessages(prev => [...prev, assistantMessage])
      setIsLoading(false)
      
      // Generate new suggestions based on the conversation
      setSuggestions([
        'How do I calculate expected value?',
        'What are the best betting markets for value?',
        'How should I manage my bankroll?'
      ])
    }, 1500)
  }
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }
  
  const handleSuggestionClick = (suggestion: string) => {
    setInput(suggestion)
    
    // Focus the input after setting the suggestion
    const inputElement = document.getElementById('chat-input')
    if (inputElement) {
      inputElement.focus()
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 pt-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
            🤖 BetGPT Assistant
          </h1>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 dark:text-gray-300 sm:mt-4">
            Your AI guide for betting insights, analysis, and recommendations
          </p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden flex flex-col h-[calc(100vh-300px)]">
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message, index) => (
              <div 
                key={index} 
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-[80%] rounded-lg px-4 py-2 ${
                    message.role === 'user' 
                      ? 'bg-primary-600 text-white' 
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                  }`}
                >
                  {message.role === 'assistant' ? (
                    <div className="prose dark:prose-invert prose-sm sm:prose-base max-w-none" dangerouslySetInnerHTML={{ __html: message.content.replace(/\n/g, '<br>') }} />
                  ) : (
                    <p>{message.content}</p>
                  )}
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 dark:bg-gray-700 rounded-lg px-4 py-2 max-w-[80%]">
                  <div className="flex space-x-2 items-center">
                    <ArrowPathIcon className="animate-spin h-4 w-4 text-gray-500 dark:text-gray-400" />
                    <p className="text-gray-500 dark:text-gray-400">BetGPT is thinking...</p>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
          
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex flex-wrap gap-2 mb-3">
              {suggestions.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
                >
                  <LightBulbIcon className="h-3 w-3 mr-1" />
                  {suggestion}
                </button>
              ))}
            </div>
            
            <div className="flex items-center">
              <textarea
                id="chat-input"
                className="flex-1 input min-h-[2.5rem] max-h-32 resize-none"
                placeholder="Ask BetGPT about betting strategies, odds analysis, or market insights..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                rows={1}
              />
              <button
                type="button"
                className="ml-3 inline-flex items-center p-2 rounded-full bg-primary-600 text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                onClick={handleSendMessage}
                disabled={isLoading || input.trim() === ''}
              >
                <PaperAirplaneIcon className="h-5 w-5" />
                <span className="sr-only">Send message</span>
              </button>
            </div>
          </div>
        </div>
        
        <div className="mt-8 bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
            How BetGPT Can Help You
          </h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <h4 className="font-medium text-gray-900 dark:text-white mb-2">Bet Analysis</h4>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Get detailed analysis of specific bets including historical context, risk assessment, and value evaluation.
              </p>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <h4 className="font-medium text-gray-900 dark:text-white mb-2">Strategy Advice</h4>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Receive personalized betting strategies based on your bankroll, risk tolerance, and betting goals.
              </p>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <h4 className="font-medium text-gray-900 dark:text-white mb-2">Market Insights</h4>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Access expert-level insights on betting markets, including inefficiencies, line movements, and value opportunities.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

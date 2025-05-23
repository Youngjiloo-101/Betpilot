# BetPilot - Advanced Betting Platform

BetPilot is a cutting-edge betting platform developed in Accra, Ghana that combines AI assistance, blockchain technology, and advanced statistical modeling to revolutionize the betting experience. Built by a team of talented Ghanaian engineers and data scientists, BetPilot showcases African technological innovation on the global stage.

## Features

| Feature | Description |
| --- | --- |
| 🎯 **Reverse Odds Engine** | Input target odds (e.g. 4.0x), get back a list of optimized bets that match via real-time data. |
| 📈 **Smart Bet Planner** | Input stake and desired return → receive risk-rated bets, success probabilities, and historical insights. |
| 🧮 **Monte Carlo Simulator** | Simulates thousands of bet outcomes and visualizes risk percentiles, EV, and variance. |
| 🤖 **BetGPT Assistant** | Your AI guide that explains your bet plan, recommends safer alternatives, and shares expert-level insights. |
| 🎮 **Betting Streak NFTs** | Gamified soulbound NFTs awarded for win streaks, underdog hits, or high-efficiency bets. |
| 💼 **Copy Betting Portfolios** | Follow strategies by pro users or AI agents. Earn rewards by letting others follow your portfolios. |
| 🗳️ **Live Odds Voting Room** | Host live community sessions where users vote on odds ranges, match targets, or parlay risks. Winning votes trigger the creation of a community-built betting vault, with NFTs and leaderboard rewards for participants. |

## Tech Stack

- **Frontend**: Next.js, React, TypeScript, TailwindCSS
- **Data Visualization**: Chart.js
- **Blockchain Integration**: Ethers.js
- **AI Integration**: OpenAI API

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/betpilot.git
cd betpilot
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Project Structure

```
betpilot/
├── public/             # Static assets
├── src/
│   ├── app/            # Next.js app router pages
│   │   ├── bet-planner/    # Smart Bet Planner feature
│   │   ├── betgpt/         # BetGPT Assistant feature
│   │   ├── monte-carlo/    # Monte Carlo Simulator feature
│   │   ├── nfts/           # Betting Streak NFTs feature
│   │   ├── portfolios/     # Copy Betting Portfolios feature
│   │   ├── reverse-odds/   # Reverse Odds Engine feature
│   │   ├── voting-room/    # Live Odds Voting Room feature
│   ├── components/     # Reusable React components
│   ├── lib/            # Utility libraries and API clients
│   └── utils/          # Helper functions
├── package.json        # Project dependencies and scripts
├── next.config.js      # Next.js configuration
├── tailwind.config.js  # TailwindCSS configuration
└── tsconfig.json       # TypeScript configuration
```

## Future Enhancements

- Real-time data integration with sports betting APIs
- Wallet integration for NFT minting and community vaults
- Mobile application for on-the-go betting
- Advanced AI models for more accurate predictions
- Social features for community engagement

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- OpenAI for AI assistance
- TailwindCSS for styling
- Chart.js for data visualization
- Next.js team for the amazing framework
- Ghana's growing tech ecosystem for support and inspiration

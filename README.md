# ProcureAI

An AI-powered procurement intelligence tool for European energy companies. Built with React + Vite, it lets procurement teams query suppliers, analyze contracts, review spend, and check compliance — returning structured, actionable answers powered by Claude AI.

## Features

- **Supplier search** — find and compare vendor options with recommendations
- **Contract analysis** — review clauses for risk, liability, and compliance
- **Spend analysis** — explore pricing, budgets, and cost breakdowns
- **Compliance** — check GDPR, regulatory, and certification requirements
- Query history with category filtering
- Animated results UI with executive summaries, risk flags, and next steps

## Tech Stack

- React 19 + Vite 8
- Framer Motion (animations)
- Express proxy server (CORS-safe API relay)
- Anthropic Claude API (`claude-sonnet-4-20250514`)

## Getting Started

### Prerequisites

- Node.js 18+
- An [Anthropic API key](https://console.anthropic.com/)

### Installation

```bash
npm install
```

### Configuration

Create a `.env` file in the project root:

```
ANTHROPIC_API_KEY=your_api_key_here
```

### Running the app

Start the Express proxy server (required to relay API requests):

```bash
node server.js
```

In a separate terminal, start the Vite dev server:

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Other scripts

```bash
npm run build    # Production build
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

## Architecture

The Express server at `server.js` proxies requests from the frontend to the Anthropic API on port `3001`, keeping the API key server-side. The React frontend (`src/App.jsx`) calls the local proxy at `/api/chat`.

> **Note:** ProcureAI provides AI-generated guidance for decision support only. Validate all procurement decisions with your procurement team and legal counsel.

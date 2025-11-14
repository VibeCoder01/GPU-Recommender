## ----- BUILT FOR THE FUN OF BUILDING      -----
## ----- KEEP YOUR EXPECTATIONS LOW         ----- 
## ----- ALL CODE AND PROSE IS AI GENERATED -----
## ----- USE WITH CAUTION !!!               -----
.
.
.
# GPU Recommender

This is a [Next.js](https://nextjs.org/) application built in Firebase Studio that helps users find the best Graphics Processing Unit (GPU) for their needs.

## Features

- **Dynamic Recommendations**: Get GPU suggestions based on your primary use case (Gaming, Content Creation, AI/ML), budget, minimum VRAM, and brand preference.
- **Advanced Scoring**: A scoring algorithm ranks available GPUs based on your specific requirements, considering factors like VRAM, bus width, and price-to-performance ratio for your chosen use case.
- **Live Price Scraping**: An optional feature allows the app to fetch live prices from popular UK retailers directly from the server, ensuring you get the most up-to-date information.
- **Data Provenance**: All baseline data is sourced from public UK retailer websites, with direct links provided for verification.
- **Modern UI**: Built with [ShadCN UI](httpss://ui.shadcn.com/) and [Tailwind CSS](https://tailwindcss.com/) for a clean, responsive, and dark-themed interface.

## Tech Stack

- **Framework**: Next.js (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: ShadCN UI
- **AI/Generative**: Genkit
- **Server Actions**: Used for fetching recommendations and live price scraping.

## Getting Started

First, install the dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:9002](http://localhost:9002) with your browser to see the result.

You can start editing the page by modifying `src/app/page.tsx`. The page auto-updates as you edit the file.

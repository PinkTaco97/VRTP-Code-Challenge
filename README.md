# VRTP Code Challenge

A responsive TypeScript + React web app using Next.js that displays and filters breweries from the Open Brewery DB API with autosuggest search, paginated results, and detailed brewery views with map integration. ([github.com](https://github.com/PinkTaco97/VRTP-Code-Challenge))

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Getting Started](#getting-started)
- [Configuration](#configuration)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Technologies](#technologies)
- [License](#license)
- [Contact](#contact)

## Features

- **Autosuggest Search**: Fetch suggestions as you type with debounce, for quick global search.
- **Filtering**: Filter breweries by name and city via input fields.
- **Pagination**: Paginated results with default page size of 15.
- **Detail View**: Click brewery names to view detailed information on a separate page.
- **Map Integration**: View brewery location on an interactive map.

Features are implemented as per the challenge requirements.

## Installation

### Prerequisites

- Node.js ≥ 14.x
- npm or Yarn / pnpm / bun

### Clone the repository

```bash
git clone https://github.com/PinkTaco97/VRTP-Code-Challenge.git
cd VRTP-Code-Challenge
```

### Install dependencies

```bash
npm install
# or
# yarn install
# or
# pnpm install
```

## Getting Started

### Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the app.

### Production Build

```bash
npm run build
npm run start
```

## Configuration

- **API_BASE_URL**: Base URL for the Open Brewery DB API (defined in `src/constants/constants.ts`).
- **DEFAULT_PER_PAGE**: Number of items per page (defined in `src/constants/constants.ts`).

## Usage

1. Use the global search bar to find breweries by name.
2. Apply filters for name and city using the inputs above the table, then click “Go”.
3. Navigate through pages using the pagination controls.
4. Click on a brewery name to view detailed information and location.

## Project Structure

```plaintext
.
├── public/
│   └── assets/
├── src/
│   ├── app/
│   │   ├── page.tsx          # Landing page
│   │   └── [id]/
│   │       └── page.tsx      # Brewery detail page
│   ├── components/          # Reusable UI components (Autosuggest, BreweryTable, Filters, Pagination)
│   ├── hooks/               # Custom React hooks (e.g., useFetch)
│   ├── constants/           # Application constants (API_BASE_URL, DEFAULT_PER_PAGE)
│   └── types/               # TypeScript type definitions
├── .gitignore
├── next.config.ts
├── package.json
├── tsconfig.json
└── README.md
```

## Technologies

- [Next.js](https://nextjs.org/)
- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Open Brewery DB API](https://www.openbrewerydb.org/)

## License

Distributed under the MIT License.

## Contact

Nathan Robertson - [Email](mailto:nathanrobertson1997@gmail.com)

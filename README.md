# Color Picker App

A simple and elegant color picker tool that allows you to choose, convert, and copy colors in different formats (HEX, RGB, HSL).

## Features

- Interactive color picker with real-time preview
- Support for HEX, RGB, and HSL color formats
- Copy color values to clipboard with one click
- Random color generator
- Quick color presets
- Responsive design with Tailwind CSS
- Toast notifications for user feedback

## Getting Started

First, install the dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Tech Stack

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **React Hooks** - State management and side effects

## Project Structure

```
├── app/
│   ├── api/
│   │   └── ping/
│   │       └── route.ts    # Health check endpoint
│   ├── globals.css         # Global styles
│   ├── layout.tsx          # Root layout component
│   └── page.tsx            # Main color picker page
├── components/
│   └── ui/
│       └── Toast.tsx       # Toast notification component
├── lib/
│   └── utils.ts            # Utility functions
├── public/                 # Static assets
├── .gitignore              # Git ignore rules
├── README.md               # Project documentation
├── next.config.js          # Next.js configuration
├── package.json            # Dependencies and scripts
├── postcss.config.js       # PostCSS configuration
├── tailwind.config.ts      # Tailwind CSS configuration
└── tsconfig.json           # TypeScript configuration
```

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the application for production
- `npm run start` - Start the production server
- `npm run lint` - Run ESLint to check for code issues

## API Endpoints

### GET /api/ping

Health check endpoint that returns the server status and current timestamp.

**Response:**
```json
{
  "ok": true,
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```
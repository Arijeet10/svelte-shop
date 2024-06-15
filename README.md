# Svelte Shop App

Welcome to the Svelte Shop App, a modern e-commerce application built using SvelteKit, TypeScript, and Tailwind CSS. This README will guide you through the setup, development, and deployment processes.

## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the App](#running-the-app)
- [Development](#development)
  - [Project Structure](#project-structure)
  - [Available Scripts](#available-scripts)
  - [Tailwind CSS Configuration](#tailwind-css-configuration)
- [Deployment](#deployment)

## Features

- **SvelteKit**: Utilizes the power of SvelteKit for a fast, modern, and optimized web application.
- **TypeScript**: Type safety with TypeScript for better code quality and developer experience.
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development.
- **Responsive Design**: Mobile-first approach to ensure the app looks great on all devices.
- **State Management**: Simple and effective state management using Svelte stores.

## Getting Started

### Prerequisites

Ensure you have the following installed on your machine:

- [Node.js](https://nodejs.org/en/download/) (v14 or higher)
- [npm](https://www.npmjs.com/get-npm) or [yarn](https://classic.yarnpkg.com/en/docs/install)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/Arijeet10/svelte-shop.git
cd svelte-shop-app
```
2. Install Dependencies:

```bash
npm install
# or
yarn install
```

### Running the App

To start the development server, run:

```bash
npm run dev
# or
yarn dev
```

This will start the app on http://localhost:5173

## Development

### Project Structure

```bash
svelte-shop-app/
├── src/
│   ├── lib/             # Library folder
│   │   ├── components/  # Svelte components
│   │   ├── stores/      # Svelte stores for state management
│   ├── routes/          # SvelteKit routes
│   ├── styles/          # Global styles and Tailwind CSS configurations
│   └── app.html         # Main HTML template
├── static/              # Static assets (images, fonts, etc.)
├── tailwind.config.js   # Tailwind CSS configuration
├── svelte.config.js     # SvelteKit configuration
├── tsconfig.json        # TypeScript configuration
├── package.json         # Project metadata and dependencies
└── README.md            # Project documentation
```

## Available Scripts

- npm run dev or yarn dev: Start the development server.
- npm run build or yarn build: Build the app for production.
- npm run preview or yarn preview: Preview the production build locally.

## Tailwind CSS Configuration

Tailwind CSS is configured in the `tailwind.config.js` file. You can customize the theme, variants, and plugins as needed.

```bash
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors:{
        orange:"#f96743",
        orange2:"#C04000",
        black:"#141718",
        grey:"#6C7275",
        white:"#FEFEFE"
      },
    },
  },
  plugins: [],
}
```

## Deployment

To deploy the Svelte Shop App, follow these steps:

1. Build the app for production:

```bash
npm run build
# or
yarn build
```

2. The production-ready files will be in the `build` directory. I have deployed these files to Vercel which is my preferred hosting service.

https://svelte-shop-gilt.vercel.app/




# create-svelte

Everything you need to build a Svelte project, powered by [`create-svelte`](https://github.com/sveltejs/kit/tree/main/packages/create-svelte).

## Creating a project

If you're seeing this, you've probably already done this step. Congrats!

```bash
# create a new project in the current directory
npm create svelte@latest

# create a new project in my-app
npm create svelte@latest my-app
```

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.

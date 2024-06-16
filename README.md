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
  - [GitHub Actions CI/CD with Playwright Testing](#github-actions-cicd-with-playwright-testing)
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

## GitHub Actions CI/CD with Playwright Testing

We use GitHub Actions to automate our CI/CD pipeline, ensuring code quality and seamless deployment of the Svelte Shop App.

### Setup

1. **Preview File**: Create a preview workflow file (e.g., `.github/workflows/preview.yaml`) in your repository with the following content:

```bash

name: Vercel Preview Deployment

env:
    VERCEL_ORG_ID: ${{ secrets.VERCEL_ORG_ID }}
    VERCEL_PROJECT_ID: ${{ secrets.VERCEL_PROJECT_ID }}

on:
    push:
        branches:
            - main

jobs:

    Test:
        runs-on: ubuntu-latest
        steps:

            - uses: actions/checkout@v4

            - uses: actions/setup-node@v4
              with:
                node-version: 18

            - name: Install dependencies
              run: npm ci

            - name: Install Playwright Browsers
              run: npx playwright install --with-deps

            - name: Run Playwright Tests
              run: npx playwright test

            - uses: actions/upload-artifact@v4
              if: always()
              with:
                name: playwright-report
                path: playwright-report/
                retention-days: 30

    Deploy-Preview:
        needs: [Test]
        runs-on: ubuntu-latest
        steps:

            - uses: actions/checkout@v4

            - name: Install Vercel CLI
              run: npm install --global vercel

            - name: Pull Vercel Environment Information
              run: vercel pull --yes --environment=preview --token=${{ secrets.VERCEL_TOKEN }}

            - name: Build Project Artifacts
              run: vercel build --token=${{ secrets.VERCEL_TOKEN }}

            - name: Deploy Project Artifacts
              run: vercel deploy --prebuilt --token=${{ secrets.VERCEL_TOKEN }}

```
2. Playwright Testing: Ensure your package.json includes scripts for Playwright testing (test:playwright). Adjust npm run test:playwright in the workflow file based on your actual setup.
3. Secrets: Set up GitHub repository secrets (VERCEL_TOKEN, VERCEL_ORG_ID, VERCEL_PROJECT_ID) for deployment to Vercel. Update your workflow file to reference these secrets securely.
4. Customization: Customize the workflow file to fit your specific needs, such as additional testing steps, notifications, or environment configurations.
5. I have also added Production workflow file for production deployment (e.g., `.github/workflows/production.yaml`) in the repository with the following content:

```bash
name: Vercel Production Deployment

env:
    VERCEL_ORG_ID: ${{ secrets.VERCEL_ORG_ID }}
    VERCEL_PROJECT_ID: ${{ secrets.VERCEL_PROJECT_ID }}

on:
    push:
        branches:
            - main

jobs:
    Deploy-Production:
        runs-on: ubuntu-latest
        steps:

            - uses: actions/checkout@v4

            - name: Install Vercel CLI
              run: npm install --global vercel

            - name: Pull Vercel Environment Information
              run: vercel pull --yes --environment=production --token=${{ secrets.VERCEL_TOKEN }}

            - name: Build Project Artifacts
              run: vercel build --prod --token=${{ secrets.VERCEL_TOKEN }}

            - name: Deploy Project Artifacts
              run: vercel deploy --prebuilt --prod --token=${{ secrets.VERCEL_TOKEN }}
```

This GitHub Actions setup automatically runs Playwright tests on every push to the main branch and deploys the app to Vercel upon successful build and tests.

For more details on configuring Playwright and GitHub Actions, refer to their respective documentation:

- [Playwright](https://playwright.dev/docs/intro)
- [GitHub Actions](https://docs.github.com/en/actions)


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

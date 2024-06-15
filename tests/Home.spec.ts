import { test, expect } from '@playwright/test';

// const baseUrl=process.env.NODE==='production'? process.env.DEPLOYED_URL as string : 'http://localhost:5173'
const baseUrl="https://svelte-shop-gilt.vercel.app"

test.describe('Home Page', () => {

  test.beforeEach(async ({ page }) => {
    // going to homepage before each test
    await page.goto(baseUrl);
  });

  test('should render HeroSection component', async ({ page }) => {
    // checking for HeroSection component is rendered or not
    const heroSection = await page.locator('div.w-full > div'); // Assuming HeroSection renders a single child div
    expect(heroSection).toBeDefined();
  });

  test('should render FeaturedProducts component', async ({ page }) => {
    // checking for FeaturedProducts component is rendered or not
    const featuredProducts = await page.locator('div > div'); // Assuming FeaturedProducts renders a single child div
    expect(featuredProducts).toBeDefined();
  });

});

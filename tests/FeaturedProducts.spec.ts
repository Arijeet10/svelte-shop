import { test, expect } from '@playwright/test';

const baseUrl=process.env.NODE==='production'? process.env.DEPLOYED_URL as string : 'http://localhost:5173'


test.describe('Featured Products', () => {
  test('Page should load initially with loading state', async ({ page }) => {
    await page.goto(baseUrl);
    await page.waitForSelector('.loading');
    const loadingElements = await page.$$('.loading');
    expect(loadingElements.length).toBe(2); 
  });

  test('Page should display featured products after successful fetch', async ({ page }) => {
    await page.goto(baseUrl);
    await page.waitForSelector('.featured-product');
    const featuredProducts = await page.$$('.featured-product');
    expect(featuredProducts.length).toBeGreaterThan(0);
  });
});

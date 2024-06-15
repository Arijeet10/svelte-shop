import { test, expect } from '@playwright/test';

test.describe('Featured Products', () => {
  test('Page should load initially with loading state', async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('.loading');
    const loadingElements = await page.$$('.loading');
    expect(loadingElements.length).toBe(2); 
  });

  test('Page should display featured products after successful fetch', async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('.featured-product');
    const featuredProducts = await page.$$('.featured-product');
    expect(featuredProducts.length).toBeGreaterThan(0);
  });


});

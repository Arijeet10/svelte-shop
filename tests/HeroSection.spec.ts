import { test, expect } from '@playwright/test';

const baseUrl=process.env.NODE==='production'? process.env.DEPLOYED_URL as string : 'http://localhost:5173'


test.describe('Hero Products', () => {
  test('Displays loading state initially', async ({ page }) => {
    await page.goto(baseUrl);
    
    // verify loading component
    const loadingElement = await page.waitForSelector('.loading2');
    expect(loadingElement).toBeTruthy();
  });

  test('Fetches and displays hero products', async ({ page }) => {
    await page.goto(baseUrl);
    
    // wait for the loading to finish
    await page.waitForSelector('.loading2', { state: 'detached' });
    
    // verify hero products are displayed
    const heroProducts = await page.$$('.hero-product');
    expect(heroProducts.length).toBeGreaterThan(0);
  });

  test('Navigates through hero products using left and right buttons', async ({ page }) => {
    await page.goto(baseUrl);
    
    // Wait for the loading to finish
    await page.waitForSelector('.loading2', { state: 'detached' });

    // Checking active product
    const activeProduct = await page.$('.hero-product.active');
    expect(activeProduct).toBeTruthy();

    // right button working check
    await page.click('button[data-testid="chevron-right"]');
    const nextActiveProduct = await page.$('.hero-product.active');
    expect(nextActiveProduct).not.toBe(activeProduct);

    // left button working check
    await page.click('button[data-testid="chevron-left"]');
    const previousActiveProduct = await page.$('.hero-product.active');
    expect(previousActiveProduct).not.toBe(nextActiveProduct);
  });


});

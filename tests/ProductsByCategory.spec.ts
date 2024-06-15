import { test, expect } from '@playwright/test';


test.describe('Products By Category Page', () => {
  test('Page should load initially with loading state', async ({ page }) => {
    await page.goto(`/category/all`);
    await page.waitForSelector('.loading'); 
    const loadingElement = await page.isVisible('.loading');
    expect(loadingElement).toBeTruthy();
  });

  //display products
  test('Page should display products after successful fetch', async ({ page }) => {
    await page.goto(`/category/all`);
    await page.waitForSelector('.productcard'); 
    const productCards = await page.$$('.productcard');
    expect(productCards.length).toBeGreaterThan(0);
  });

  //filter product
  test('Page should correctly filter products based on price', async ({ page }) => {
    await page.goto(`/category/all`);

    // Change price filter
    await page.selectOption('select[name="price-filter"]', { label: 'Max $200' });
    await page.waitForTimeout(1000); 

    const productCards = await page.$$('.productcard');
    const prices = await Promise.all(
      productCards.map(async (card) => {
        const priceElement = await card.$('.product-price'); 
        const priceText = priceElement ? await priceElement.textContent() : null;

        if (priceText) {
          return parseFloat(priceText.replace('$', ''));
        } else {
          throw new Error('Price text is null or undefined');
        }
      })
    );

    const filteredPrices = prices.filter((price) => price <= 50);
    expect(prices.length).toBeGreaterThan(0);
    expect(prices.length).toBeGreaterThanOrEqual(filteredPrices.length);
  });

  test('Page should navigate through pagination correctly', async ({ page }) => {
    await page.goto(`/category/all`);

    // next page button click
    await page.click('button[data-testid="next-page"]');
    await page.waitForTimeout(1000); 


    // previous page button click
    await page.click('button[data-testid="prev-page"]');
    await page.waitForTimeout(1000);

  });
});

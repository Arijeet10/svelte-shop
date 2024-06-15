import { test, expect } from '@playwright/test';

// const baseUrl=process.env.NODE==='production'? process.env.DEPLOYED_URL as string : 'http://localhost:5173'
const baseUrl="https://svelte-shop-gilt.vercel.app"

test.describe('Product Card', () => {
  test('Add product to cart', async ({ page }) => {
    // mock product data for testing
    const product = {
      id: 1,
      image: 'path/to/image.jpg',
      title: 'Test Product',
      price: 50,
    };

    // go to product detail page
    await page.goto(`${baseUrl}/category/all`);

    // check for product image
    await page.waitForSelector('img');

    // click the "Add to Cart" button
    await page.click('button[data-testid="add-to-cart"]');

    // wait for the button text to change to "Go to Cart"
    await page.waitForSelector('button[data-testid="go-to-cart"]');

    // validate that the cart state has been updated
    const cartStateString = await page.evaluate(() => {
      return localStorage.getItem('cart');
    });

    // ensure cartStateString is not null
    expect(cartStateString).not.toBeNull();

    // parse cart state from localStorage
    const cartState = JSON.parse(cartStateString!); // Use ! to assert non-null

    // check cart state contains the added product
    const addedProduct = cartState.find((item: any) => item.product.id === product.id);
    expect(addedProduct).toBeTruthy();
    expect(addedProduct.productCount).toBe(1); // Assuming initial count is 1

    // validate navigation to the cart page
    await Promise.all([
      page.waitForNavigation(), // Wait for navigation to complete
      page.click('button:has-text("Go to Cart")'),
    ]);

    // check the URL is correct after navigating to the cart
    expect(page.url()).toContain('/cart');
  });
});

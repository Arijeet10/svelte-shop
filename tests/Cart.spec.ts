import { test, expect } from '@playwright/test';

test('Cart Page', async ({ page }) => {
  // Navigate to the Cart page
  await page.goto('/cart'); // Adjust URL as per your application's setup

  // Check if "Cart" heading is rendered
  const cartHeading = await page.waitForSelector('main div.text-2xl');
  expect(await cartHeading.textContent()).toBe('Cart');

  // Check if cart is empty
  const cartEmptyMessage = await page.waitForSelector('div.text-3xl');
  const isCartEmpty = await cartEmptyMessage.isVisible();

  if (isCartEmpty) {
    // Assert that "Cart is Empty" message is displayed
    expect(await cartEmptyMessage.textContent()).toBe('Cart is Empty');
  } else {
    // Assert that flexbox elements for products are displayed
    const productFlexbox = await page.waitForSelector('div.flex.items-center.font-semibold');
    expect(await productFlexbox.isVisible()).toBeTruthy();
  }
});

import { test, expect } from '@playwright/test';

const baseUrl=process.env.NODE==='production'? process.env.DEPLOYED_URL as string : 'http://localhost:5173'



test('Cart Page', async ({ page }) => {
  // navigate to the Cart page
  await page.goto(`${baseUrl}/cart`); // Adjust URL as per your application's setup

  // check if "Cart" heading is rendered
  const cartHeading = await page.waitForSelector('main div.text-2xl');
  expect(await cartHeading.textContent()).toBe('Cart');

  // check if cart is empty
  const cartEmptyMessage = await page.waitForSelector('div.text-3xl');
  const isCartEmpty = await cartEmptyMessage.isVisible();

  if (isCartEmpty) {
    // check for "Cart is Empty" message is displayed or not
    expect(await cartEmptyMessage.textContent()).toBe('Cart is Empty');
  } else {
    // check for products are displayed
    const productFlexbox = await page.waitForSelector('div.flex.items-center.font-semibold');
    expect(await productFlexbox.isVisible()).toBeTruthy();
  }
});

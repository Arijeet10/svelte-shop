import { test, expect } from '@playwright/test';

const baseUrl=process.env.NODE==='production'? process.env.DEPLOYED_URL as string : 'http://localhost:5173'


test('Product Page', async ({ page }) => {
  // Mock product data
  const product = {
    id: 1,
    title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
    price: 109.95,
    description: "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
    category: "men's clothing",
    image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
    rating: {
      rate: 3.9,
      count: 120
    }
  };

  // Navigate to the product page with product id
  await page.goto(`${baseUrl}/product/${product.id}`); // Adjust URL and route pattern as per your application

  // Wait for the product details to load
  await page.waitForSelector('div.text-2xl.font-bold'); // Wait for the product title

  // product title matches or not
  const titleElement = await page.$('div.text-2xl.font-bold');
  expect(titleElement).not.toBeNull(); // Ensure title element exists
  const titleText = await titleElement!.textContent();
  expect(titleText).toContain(product.title);



  // product price is correct or not
  const priceElement = await page.$('div.text-xl');
  expect(priceElement).not.toBeNull(); // Ensure price element exists
  const priceText = await priceElement!.textContent();
  expect(priceText).toContain(`$${product.price}`);

  // product image is displayed or not
  const imageElement = await page.$('img');
  expect(imageElement).not.toBeNull(); // Ensure image element exists

});

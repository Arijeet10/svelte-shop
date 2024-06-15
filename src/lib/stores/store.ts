import { writable } from 'svelte/store';

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: { rate: number, count: number };
}

export interface CartProductsType {
  product: Product;
  productCount: number;
}

// Initialize cart state from local storage if available
let initialCart: CartProductsType[] = [];
if (typeof localStorage !== 'undefined') {
  const storedCart = localStorage.getItem('cart');
  if (storedCart) {
    initialCart = JSON.parse(storedCart);
  }
}

export const products = writable<Product[]>([]);
export const categories = writable<string[]>(["all"]);
export const cart = writable<CartProductsType[]>(initialCart);

// Persist cart state to local storage
cart.subscribe((value) => {
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem('cart', JSON.stringify(value));
  }
});

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




export const products = writable<Product[]>([]);
export const categories = writable<string[]>(["all"]);


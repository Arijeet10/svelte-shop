<script lang="ts">
	import { page } from "$app/stores";
	import { fetchProducts, fetchProductsByCategory } from '$lib/api';
	import { products, type Product } from "$lib/stores/store";
	import { get } from 'svelte/store';
	import { toasts } from 'svelte-toasts';
	import Loading from "$lib/components/Loading.svelte";
  
	// Dynamically imported components
	let ProductCard: typeof import("$lib/components/ProductCard.svelte").default;
	let ProductFilter: typeof import("$lib/components/ProductFilter.svelte").default;
  
	let category: string;
	let priceFilter: number = 999;
	let ratingFilter: number = 0;
	let sortFilter: string = '';
  
	let currentPage: number = 1;
	const itemsPerPage: number = 8;
	let filteredProducts: Product[] = [];
	let loading = true;
  
	// Watch for changes in category
	$: category = $page.params.productCategory;
  
	// Fetch products according to category changes
	$: if (category) {
	  fetchProductsByCurrentCategory();
	}
  
	// Fetch products according to category
	async function fetchProductsByCurrentCategory() {
	  try {
		loading = true;
		let productList: Product[];
		if (category === 'all') {
		  productList = await fetchProducts();
		} else {
		  productList = await fetchProductsByCategory(category);
		}
		toasts.success("Products successfully fetched");
		products.set(productList);
		applyFilters(); // Apply filters after fetching products
		loadComponents(); // Load components after products are fetched
	  } catch (error) {
		console.log('Failed to load products by categories:', error);
		toasts.error('Failed to load products by categories');
	  } finally {
		loading = false;
	  }
	}
  
	// Dynamically import components
	async function loadComponents() {
	  if (!ProductCard) {
		ProductCard = (await import('$lib/components/ProductCard.svelte')).default;
	  }
	  if (!ProductFilter) {
		ProductFilter = (await import('$lib/components/ProductFilter.svelte')).default;
	  }
	}
  
	// Filter function
	function applyFilters() {
	  let allProducts = get(products) as Product[];
  
	  // Price filter
	  if (priceFilter !== 999) {
		allProducts = allProducts.filter(item => item.price <= priceFilter);
	  }
  
	  // Rating filter
	  if (ratingFilter !== 0) {
		allProducts = allProducts.filter(item => item.rating.rate >= ratingFilter);
	  }
  
	  // Sort filter
	  if (sortFilter === 'price') {
		allProducts.sort((a, b) => a.price - b.price);
	  } else if (sortFilter === 'reviews') {
		allProducts.sort((a, b) => b.rating.rate - a.rating.rate);
	  }
  
	  filteredProducts = allProducts;
	  currentPage = 1;
	}
  
	// Get products to display based on current page
	$: paginatedProducts = filteredProducts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  
	// Handle price filter change
	const handlePriceFilter = (event) => {
	  priceFilter = parseFloat(event.target.value) || 999;
	  applyFilters();
	};
  
	// Handle rating filter change
	const handleRatingFilter = (event) => {
	  ratingFilter = parseFloat(event.target.value) || 0;
	  applyFilters();
	};
  
	// Handle sort filter change
	const handleSort = (event) => {
	  sortFilter = event.target.value;
	  applyFilters();
	};
  
	// Handle pagination
	const handlePreviousPage = () => {
	  if (currentPage > 1) {
		currentPage -= 1;
	  }
	};
  
	const handleNextPage = () => {
	  if (currentPage < Math.ceil(filteredProducts.length / itemsPerPage)) {
		currentPage += 1;
	  }
	};
  </script>
  
  {#if loading}
  <div class="loading">
	<Loading />
  </div>
  {:else}
	<div class="px-4 sm:px-8 py-4 flex flex-col gap-4">
	  <!--Header-->
	  <div class="py-4 font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-center">
		{category == 'all' ? 'All Products' : category.split('').map((item, i) => (i == 0 ? item.toUpperCase() : item)).join('')}
	  </div>
  
	  {#if ProductFilter}
		<svelte:component this={ProductFilter} {handlePriceFilter} {handleRatingFilter} {handleSort} />
	  {/if}
  
	  <!--Products-->
	  <section class="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 productcard">
		{#each paginatedProducts as product}
		  {#if ProductCard}
			<svelte:component this={ProductCard} {product} />
		  {/if}
		{/each}
	  </section><!--/Products-->
  
	  <!--Pagination-->
	  {#if filteredProducts.length > itemsPerPage}
		<div class="my-6 flex items-center justify-end">
		  <div class="flex items-center gap-4">
			<button on:click={handlePreviousPage} class="w-[30vw] sm:w-[12vw] px-2 py-2 font-medium rounded-md bg-black hover:bg-orange2 text-[#FEFEFE] transition-colors duration-300 ease-in-out" disabled={currentPage === 1} data-testid="prev-page">Previous</button>
			<button on:click={handleNextPage} class="w-[30vw] sm:w-[12vw] px-2 py-2 font-medium rounded-md bg-black hover:bg-orange2 text-[#FEFEFE] transition-colors duration-300 ease-in-out" disabled={currentPage >= Math.ceil(filteredProducts.length / itemsPerPage)} data-testid="next-page">Next</button>
		  </div>
		</div>
	  {/if}
	</div>
  {/if}
  
<script lang="ts">
	import { page } from "$app/stores";
	import { fetchProducts, fetchProductsByCategory } from '$lib/api';
	import { products, type Product } from "../../../stores/store";
	import ProductCard from '$lib/components/ProductCard.svelte';
	import ProductFilter from "$lib/components/ProductFilter.svelte";
	import { get } from 'svelte/store';

	let category: string;
	let priceFilter: number = 999;
	let ratingFilter: number = 0; 
	let sortFilter: string = ''; 

	let currentPage: number = 1;
	const itemsPerPage: number = 8;
	let filteredProducts: Product[] = [];
	let loading=true;

	// to watch for changes in category
	$: category = $page.params.productCategory;

	// to fetch products according to category changes
	$: if (category) {
		fetchProductsByCurrentCategory();
	}


	// fetch products according to category
	async function fetchProductsByCurrentCategory() {
		try {
			loading=true;
			let productList: Product[];
			if (category === 'all') {
				productList = await fetchProducts();
			} else {
				productList = await fetchProductsByCategory(category);
			}
			products.set(productList);
			applyFilters(); // Apply filters after fetching products
		} catch (error) {
			console.log('Failed to load products or categories:',error);
		}finally{
			loading=false;
		}
	}

	// filter function
	function applyFilters() {
		let allProducts = get(products);

		// price filter
		if (priceFilter !== 999) {
			allProducts = allProducts.filter(item => item.price <= priceFilter);
		}

		// rating filter
		if (ratingFilter !== 0) {
			allProducts = allProducts.filter(item => item.rating.rate >= ratingFilter);
		}

		// sort filter
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
<div>Loading...</div>
{:else}
<div class="px-8 py-4 flex flex-col gap-4">
	<!--Header-->
	<div class="py-4 font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-center">{category=='all'?'All Products':category.split('').map((item,i)=>(i==0?item.toUpperCase():item)).join('')}</div>
	<ProductFilter {handlePriceFilter} {handleRatingFilter} {handleSort} />
	<!--/Header-->

	<!--Products-->
	<section class="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
		{#each paginatedProducts as product}
			<ProductCard {product} />
		{/each}
	</section><!--/Products-->

	<!--Pagination-->
	{#if filteredProducts.length > itemsPerPage}
		<div class="my-6 flex items-center justify-end ">
			<div class="flex items-center gap-4">
				<button on:click={handlePreviousPage} class="w-[10vw] px-2 py-2 font-medium rounded-md bg-black hover:bg-orange2 text-[#FEFEFE]" disabled={currentPage === 1}>Previous</button>
				<button on:click={handleNextPage} class="w-[10vw] px-2 py-2 font-medium rounded-md bg-black hover:bg-orange2 text-[#FEFEFE]" disabled={currentPage >= Math.ceil(filteredProducts.length / itemsPerPage)}>Next</button>
			</div>
		</div>
	{/if}
</div>
{/if}


<script lang="ts">
	import { page } from "$app/stores";
	import { fetchProducts, fetchProductsByCategory } from '$lib/api';
	import { products, type Product } from '../../../stores/store';


	let category: string;
	let loading=true;

	// to watch category value changes
	$: category = $page.params.productCategory;

	// to fetch products according to category
	$: if (category) {
		fetchProductsByCurrentCategory();
	}


	// fetch products according category
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
		} catch (error) {
			console.log('Failed to load products:',error);
		}finally{
			loading=false;
		}
	}


</script>

{#if loading}
<div>Loading</div>
{:else}
<div class="px-8 py-4 flex flex-col gap-4">

    <!--Header-->
	<div class="py-4 font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-center">{category=='all'?'All Products':category.split('').map((item,i)=>(i==0?item.toUpperCase():item)).join('')}</div><!--/Header-->

    <!--Products-->
	<section class="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
		{#each $products as product}
			<div>
                <img 
                    src={product.image}
                    alt=""
                    class=""
                />
            </div>
		{/each}
	</section><!--/Products-->

</div>

{/if}


<script lang="ts">
	import { cart } from "$lib/stores/store";
  
	let ProductCartList: typeof import("$lib/components/ProductCartList.svelte").default;
  
	// load component when cart is not empty
	$: if ($cart.length > 0 && !ProductCartList) {
	  loadProductCartList();
	}
  
	async function loadProductCartList() {
	  ProductCartList = (await import("$lib/components/ProductCartList.svelte")).default;
	}
  </script>
  
  <main class="min-h-[100vh] px-4 sm:px-8 py-4">
	<div
	  class="py-4 font-semibold text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-center"
	>
	  Cart
	</div>
	{#if $cart.length == 0}
	  <div class="font-semibold text-3xl">Cart is Empty</div>
	{:else}
	  <div class="flex flex-col gap-4 text-xs sm:text-base">
		<div class="flex items-center font-semibold">
		  <div class="flex-1 text-center">Product</div>
		  <div class="flex-1 text-center">Quantity</div>
		  <div class="flex-1 text-center">Price</div>
		  <div class="flex-1 text-center">Subtotal</div>
		</div>
		<div class="w-full border-b border-grey" />
		<div class="flex flex-col gap-4">
		  {#each $cart as product}
			{#if ProductCartList}
			  <svelte:component this={ProductCartList} {product} />
			{/if}
		  {/each}
		</div>
	  </div>
	{/if}
  </main>
  
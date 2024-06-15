<script lang="ts">
	import { fetchHeroProducts } from '$lib/api';
	import type { Product } from '$lib/stores/store';
	import { toasts } from 'svelte-toasts';
	import { ChevronLeft, ChevronRight } from 'lucide-svelte';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
  import Loading2 from './Loading2.svelte';

	let heroProducts: Product[] = [];
	let activeProduct: number = 0;
	let loading=true;

	onMount(() => {
		setInterval(() => {
			activeProduct = activeProduct == 7 ? 0 : activeProduct + 1;
		}, 3000);
	});

	const handleLeftClick = () => {
		if (activeProduct > 0) {
			activeProduct--;
		} else {
			activeProduct = 7;
		}
	};

	const handleRightClick = () => {
		if (activeProduct < 7) {
			activeProduct++;
		} else {
			activeProduct = 0;
		}
	};

	onMount(async () => {
		try {
			loading=true
			heroProducts = await fetchHeroProducts();
			toasts.success('Hero Products fetched')
		} catch (error) {
			toasts.error('Failed to load data');
			console.error('Error fetching hero products:', error);
		}finally{
			loading=false;
		}
	});

</script>




{#if loading}
<div class="loading2">
	<Loading2 />
</div>
{:else}
<div class="h-full w-full relative grid gap-2">
	{#each heroProducts as product, i}
		<div
			class={`${activeProduct == i ? 'absolute active' : 'hidden '} hero-product top-0 w-full h-full px-10 py-4 flex items-center justify-center bg-black text-[#FEFEFE]`}
		>
			<div class="w-full h-full flex items-center justify-center gap-4">
				<div class="relative w-60 h-60 ">
					<img src={product.image} alt="" class="w-full h-full object-contain" />
					<div class="absolute inset-0 bg-gradient-to-b from-transparent to-black" />
				</div>
				<div class=" flex flex-col gap-4">
					<div class="text-lg sm:text-2xl font-medium">{product.title}</div>
					<div>
						<button
							on:click={() => goto(`product/${product.id}`)}
							class="p-2 rounded-md text-xs sm:text-base font-medium bg-orange hover:bg-orange2  transition-colors duration-300 ease-in-out">Shop Now</button
						>
					</div>
				</div>
			</div>
		</div>
	{/each}

	<button
		on:click={() => handleLeftClick()}
		class="h-20 absolute top-2/4 left-0 translate-y-[-50%] flex items-center justify-center bg-[#FEFEFE] hover:text-orange"
		data-testid="chevron-left"

	>
		<ChevronLeft />
	</button>
	<button
		on:click={() => handleRightClick()}
		class="h-20 absolute top-2/4 right-0 translate-y-[-50%] flex items-center justify-center bg-[#FEFEFE] hover:text-orange"
		data-testid="chevron-right"
	>
		<ChevronRight />
	</button>
</div>
{/if}



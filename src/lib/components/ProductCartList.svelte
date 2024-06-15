<script lang="ts">
	import { cart } from '$lib/stores/store';
	import type { CartProductsType } from '$lib/stores/store';
	import { X } from 'lucide-svelte';

	export let product;

	const handleRemoveProduct = () => {
		cart.update((currentCart) => {
			const existingProductIndex = currentCart.findIndex(
				(item: CartProductsType) => item.product.id === product.product.id
			);
			if (existingProductIndex >= 0) {
				const updatedItems = [...currentCart];
                updatedItems.splice(existingProductIndex,1)
                return updatedItems;
			}
            return currentCart
		});
	};

	const handleDecreaseCount = () => {
		cart.update((currentCart) => {
			const existingProductIndex = currentCart.findIndex(
				(item: CartProductsType) => item.product.id === product.product.id
			);
			if (existingProductIndex >= 0) {
				const updatedItems = [...currentCart];
				const updatedProduct = { ...updatedItems[existingProductIndex] };
				if (updatedProduct.productCount > 1) {
					updatedProduct.productCount -= 1;
					updatedItems[existingProductIndex] = updatedProduct;
				} else {
					updatedItems.splice(existingProductIndex, 1);
				}
				return updatedItems;
			}
			return currentCart;
		});
	};

	const handleIncreaseCount = () => {
		cart.update((currentCart) => {
			const existingProductIndex = currentCart.findIndex(
				(item: CartProductsType) => item.product.id === product.product.id
			);
			if (existingProductIndex >= 0) {
				const updatedItems = [...currentCart];
				const updatedProduct = { ...updatedItems[existingProductIndex] };
				updatedProduct.productCount += 1;
				updatedItems[existingProductIndex] = updatedProduct;
				return updatedItems;
			} else {
				const newProduct = { product: product.product, productCount: 1 };
				return [...currentCart, newProduct];
			}
		});
	};
</script>

<div class="flex items-center text-xs sm:text-base">
	<div class="flex-1 flex flex-col sm:flex-row items-center gap-2">
		<div class="flex-1 flex items-center justify-center">
			<img src={product.product.image} alt="" class="w-10 h-10 sm:w-20 sm:h-20 object-contain" />
		</div>
		<div class="flex-1 flex flex-col">
			<div class="">{product.product.title}</div>
			<button on:click={() => handleRemoveProduct()} class="flex items-center font-medium text-grey hover:text-black">
				<div><X /></div>
				<div>Remove</div>
			</button>
		</div>
	</div>
	<div class="flex-1 flex justify-center">
		<div class="w-full sm:w-[10vw] flex items-center font-medium text-xs sm:text-base lg:text-lg">
			<button
				on:click={handleDecreaseCount}
				class="p-2 w-full border border-orange rounded-l-md text-center  bg-orange hover:bg-orange2 hover:border-orange2 hover:text-[#FEFEFE]"
			>
				-
			</button>
			<div class="p-2 border-y w-full text-center ">{product.productCount}</div>
			<button
				on:click={handleIncreaseCount}
				class="p-2 w-full border border-orange rounded-r-md text-center  bg-orange hover:bg-orange2 hover:border-orange2 hover:text-[#FEFEFE]"
			>
				+
			</button>
		</div>
	</div>
	<div class="flex-1 w-full text-center">${product.product.price}</div>
	<div class="flex-1 w-full text-center font-semibold">
		${product.product.price * product.productCount}
	</div>
</div>

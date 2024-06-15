<script lang="ts">
	import { page } from '$app/stores';
	import { fetchProductById } from '$lib/api';
	import { cart, type CartProductsType, type Product } from '$lib/stores/store';
	import { get } from 'svelte/store';
	import { goto } from '$app/navigation';
	import Loading from '$lib/components/Loading.svelte';
    import {toasts} from "svelte-toasts";

	let product: Product;
	let id: string;
	let loading = true;

	// to get the id from the page store
	$: id = $page.params.id;

	// to fetch the product whenever the id changes
	$: id && fetchProduct(id);

    //decrease product count in cart
	const handleDecreaseCount = () => {
		cart.update((currentCart) => {
			const existingProductIndex = currentCart.findIndex(
				(item: CartProductsType) => item.product.id === product.id
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

    //increase product count in cart
	const handleIncreaseCount = () => {
		cart.update((currentCart) => {
			const existingProductIndex = currentCart.findIndex(
				(item: CartProductsType) => item.product.id === product.id
			);
			if (existingProductIndex >= 0) {
				const updatedItems = [...currentCart];
				const updatedProduct = { ...updatedItems[existingProductIndex] };
				updatedProduct.productCount += 1;
				updatedItems[existingProductIndex] = updatedProduct;
				return updatedItems;
			} else {
				const newProduct = { product: product, productCount: 1 };
				return [...currentCart, newProduct];
			}
		});
	};

    //fetch product details
	async function fetchProduct(productId: string) {
		if (productId) {
			try {
				loading = true;
				product = await fetchProductById(productId);
                toasts.success('Product Details fetched')
			} catch (error) {
				toasts.error('Error while fetching product details');
				console.log('Error:', error);
			} finally {
				loading = false;
			}
		}
	}

	function addToCart(product: Product) {
		const currentCart = get(cart);
		const existingProductIndex = currentCart.findIndex((item) => item.product.id === product.id);
		if (existingProductIndex >= 0) {
			const updatedItems = [...currentCart];
			const updatedProduct = { ...updatedItems[existingProductIndex] };
			updatedProduct.productCount += 1;
			updatedItems[existingProductIndex] = updatedProduct;
			cart.set(updatedItems);
		} else {
			const newProduct = { product: product, productCount: 1 };
			cart.set([...currentCart, newProduct]);
		}
	}

	function generateStars(rating: number) {
		const fullStars = Math.floor(rating);
		const halfStars = rating % 1 !== 0 ? 1 : 0;
		const emptyStars = 5 - fullStars - halfStars;

		return {
			fullStars: Array(fullStars).fill('⭐'),
			halfStars: Array(halfStars).fill('⭐️'),
			emptyStars: Array(emptyStars).fill('')
		};
	}
</script>

{#if loading}
	<Loading />
{:else}
	<div class="px-4 sm:px-8 py-8 min-h-[100vh]">
		{#if product}
			<div class="flex flex-col gap-6 sm:flex-row sm:items-start sm:gap-2 md:gap-8 lg:gap-10">
				<div class="sm:min-w-[40vw] md:min-w-[50vw] lg:min-w-[60vw] p-2 shadow-md rounded-md">
					<img
						src={product.image}
						alt={product.title}
						class="w-full h-full object-contain rounded-md"
					/>
				</div>

				<div class="flex flex-col gap-4">
					<div class="flex flex-col gap-4">
						<div class="text-2xl font-bold">
							{product.title}
						</div>

						<div class="flex items-center gap-4">
							<div class="flex items-center">
								{#each generateStars(product.rating.rate).fullStars as star}
									<span>{star}</span>
								{/each}
								{#each generateStars(product.rating.rate).halfStars as star}
									<span>{star}</span>
								{/each}
								{#each generateStars(product.rating.rate).emptyStars as star}
									<span>{star}</span>
								{/each}
							</div>

							<div class="text-grey font-semibold">({product.rating.count}) <span class="text-black font-medium">Reviews</span></div>
						</div>
						<div class="">{product.description}</div>
						<div class="text-xl">${product.price}</div>
					</div>
					<div class="border-b w-full" />
					<div class="flex items-center gap-4 font-medium">
						<div class=" flex items-center font-medium">
							<button
								on:click={handleDecreaseCount}
								class="p-2 w-full border border-orange rounded-l-md text-center bg-orange hover:bg-orange2 hover:border-orange2 hover:text-[#FEFEFE]"
							>
								-
							</button>
							<div class="p-2 border-y w-full text-center">
								{#if $cart.find((item) => item.product.id === product.id)}
									{$cart.find((item) => item.product.id === product.id)?.productCount}
								{:else}
									0
								{/if}
							</div>
							<button
								on:click={handleIncreaseCount}
								class="p-2 w-full border border-orange rounded-r-md text-center bg-orange hover:bg-orange2 hover:border-orange2 hover:text-[#FEFEFE]"
							>
								+
							</button>
						</div>
						<div class="">
							<button
								class=" px-4 py-2 border rounded-md border-orange hover:border-orange2 bg-orange hover:bg-orange2 text-[#FEFEFE]"
								on:click={() => {
									addToCart(product);
									goto(`/cart`);
								}}>Buy Now</button
							>
						</div>
					</div>
					<div class="border-b w-full" />
					<div class="flex flex-col gap-4">
						<div class="font-semibold text-xl">Additional Info:</div>
						<div class="flex flex-col gap-4">
							<div class="text-grey font-medium">Details</div>
							<div>
								Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi quis quidem laudantium
								expedita quo harum cum blanditiis, ipsam exercitationem unde ab vitae. Ut recusandae
								repellat, dolorum maxime tempore alias beatae! Corporis deleniti beatae, soluta
								similique amet quas voluptatibus iste? Atque laudantium eaque repudiandae? Quod quos
								facilis asperiores perspiciatis nesciunt laborum sed ea unde adipisci quae, impedit
								ipsum voluptatum quisquam dignissimos. Deleniti facilis tempora rerum exercitationem
								ut libero id, possimus deserunt est! Sequi accusantium iste dolore, itaque officiis
								et enim molestias maiores unde! Omnis, eaque ipsa doloribus totam possimus
								voluptatum vero..
							</div>
						</div>
						<div class="flex flex-col gap-4">
							<div class="text-grey font-medium">Packaging</div>
							<div>
								<div>Width: 20 " Height: 1 ½ " Length: 21 ½ "</div>
								<div>Weight: 7 lb 8 oz</div>
								<div>Package(s): 1</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		{/if}
	</div>
{/if}

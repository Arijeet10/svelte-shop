<script lang="ts">
	import { page } from '$app/stores';
	import { ChevronDown, ChevronUp, Search, ShoppingCart, X } from 'lucide-svelte';

    let dropdown = false;
    let url;
	$: url = $page.url.pathname;

</script>



<header class="px-8 py-2 flex items-center justify-between">
	<!--Logo-->
	<section class="text-2xl uppercase font-bold text-orange">Svelte <span class="text-black">Shop</span></section>
	<!--/Logo-->
	<!--Navigations-->
	<section class="hidden sm:flex items-center">
		<nav class="flex items-center gap-4 font-medium text-[#6C7275]">
			<a href="/" class={`p-2 ${url == '/' ? 'text-[#000000]' : ''} hover:text-[#000000]`}>Home</a>
			<div class="">
				<button
					type="button"
					on:click={() => (dropdown = !dropdown)}
					class={`p-2 flex items-center gap-1 hover:text-[#000000] ${dropdown ? 'text-[#000000]' : ''}`}
				>
					<div>Categories</div>
					<div>
						{#if dropdown}
							<ChevronUp />
						{:else}
							<ChevronDown />
						{/if}
					</div>
				</button>
			</div>

			<a href="/about" class={`p-2 ${url == '/about' ? 'text-[#000000]' : ''} hover:text-[#000000]`}>About</a>
			<a href="/contact" class={`p-2 ${url == '/contact' ? 'text-[#000000]' : ''} hover:text-[#000000]`}>Contact</a>
			<a href="/blog" class={`p-2 ${url == '/blog' ? 'text-[#000000]' : ''} hover:text-[#000000]`}>Blog</a>
		</nav>
	</section>
	<!--/Navigations-->

	<section class="hidden sm:flex items-center gap-4">
		<!--Product Search-->
		<div>
			<div class={`p-2 flex items-center border  rounded-md`}>
				<input
					type="text"
					placeholder="Search Products"
					class={`w-full focus:outline-none bg-transparent`}
				/>
				<button>
					<Search />
				</button>
			</div>
		</div>
		<!--/Product Search-->

		<!--Cart-->
		<nav class="flex items-center gap-4 font-medium text-[#6C7275]">
			<a
				href="/cart"
				class={`p-2 flex items-center gap-1 ${url == '/cart' ? 'text-[#000000]' : ''} hover:text-[#000000]`}
			>
				<div class="">
					<ShoppingCart />
				</div>
				<div class="sm:hidden md:block">Cart</div>
			</a>
		</nav>
		<!--/Cart-->
	</section>

</header>

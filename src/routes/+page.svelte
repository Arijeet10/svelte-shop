<script lang="ts">
	import FeaturedProducts from '$lib/components/FeaturedProducts.svelte';
	import HeroSection from '$lib/components/HeroSection.svelte';
</script>

<main class="px-4 py-4 sm:px-8 flex flex-col gap-4">
	<div class="w-full h-[50vh]">
		<HeroSection />
	</div>

	<div class="">
		<FeaturedProducts />
	</div>
</main>



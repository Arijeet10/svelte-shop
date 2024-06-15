<script lang="ts">
  import { fetchProductsByCategory } from "$lib/api";
  import type { Product } from "$lib/stores/store";
  import { toasts } from "svelte-toasts";
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";
  import Loading2 from "./Loading2.svelte";

  let featuredProducts: Product[] = [];
  let loading = true;

  onMount(async () => {
    try {
      loading = true;
      const productList: Product[] =
        await fetchProductsByCategory("electronics");
      featuredProducts = productList
        .filter((item, i) => i > 1 && item)
        .reverse();
      toasts.success("Featured Products fetched");
    } catch (error) {
      console.error("Error:", error);
      toasts.error("Failed to load featured products");
    } finally {
      loading = false;
    }
  });
</script>

{#if loading}
  <div
    class=" flex flex-col sm:flex-row gap-4 sm:gap-0 max-w-screen overflow-hidden"
  >
    <div class="loading flex-1 sm:min-h-[60vh]"><Loading2 /></div>
    <div class="loading flex-1 sm:min-h-[60vh]"><Loading2 /></div>
  </div>
{:else}
  <div class=" flex flex-col gap-4">
    <div class="text-3xl font-bold text-black">Featured</div>
    <div class="featured-product grid sm:grid-cols-2 gap-4">
      {#each featuredProducts as product}
        <button
          on:click={() => goto(`/product/${product.id}`)}
          class="relative w-full h-[60vh]  shadown-md"
        >
          <img
            src={product.image}
            alt=""
            class="w-full h-full object-contain"
          />
          <div
            class="absolute inset-0 bg-gradient-to-b from-transparent to-black"
          />
          <div
            class="absolute px-4 w-full bottom-10 font-bold flex items-center justify-center text-[#FEFEFE]"
          >
            <div>{product.title}</div>
          </div>
        </button>
      {/each}
    </div>
  </div>
{/if}

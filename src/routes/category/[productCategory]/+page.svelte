<script lang="ts">
  import { page } from "$app/stores";
  import { fetchProducts, fetchProductsByCategory } from "$lib/api";
  import ProductCard from "$lib/components/ProductCard.svelte";
  import ProductFilter from "$lib/components/ProductFilter.svelte";
  import { get } from "svelte/store";
  import { products, type Product } from "../../../stores/store";

  let filteredProducts: Product[] = [];
  let priceFilter: number = 999;
  let ratingFilter: number = 0;
  let sortFilter: string = "";
  let category: string;
  let loading = true;

  // to watch category value changes
  $: category = $page.params.productCategory;

  // to fetch products according to category
  $: if (category) {
    fetchProductsByCurrentCategory();
  }

  // function to apply filters
  function applyFilters() {
    let allProducts = get(products);

    // price filter
    if (priceFilter !== Infinity) {
      allProducts = allProducts.filter((item) => item.price <= priceFilter);
    }

    // rating filter
    if (ratingFilter !== 0) {
      allProducts = allProducts.filter(
        (item) => item.rating.rate >= ratingFilter
      );
    }

    // sort filter
    if (sortFilter === "price") {
      allProducts.sort((a, b) => a.price - b.price);
    } else if (sortFilter === "reviews") {
      allProducts.sort((a, b) => b.rating.rate - a.rating.rate);
    }

    filteredProducts = allProducts;
  }

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

  // fetch products according category
  async function fetchProductsByCurrentCategory() {
    try {
      loading = true;
      let productList: Product[];
      if (category === "all") {
        productList = await fetchProducts();
      } else {
        productList = await fetchProductsByCategory(category);
      }
      products.set(productList);
      applyFilters();
    } catch (error) {
      console.log("Failed to load products:", error);
    } finally {
      loading = false;
    }
  }
</script>

{#if loading}
  <div>Loading</div>
{:else}
  <div class="px-8 py-4 flex flex-col gap-4">
    <!--Header-->
    <div
      class="py-4 font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-center"
    >
      {category == "all"
        ? "All Products"
        : category
            .split("")
            .map((item, i) => (i == 0 ? item.toUpperCase() : item))
            .join("")}
    </div>
    <ProductFilter {handlePriceFilter} {handleRatingFilter} {handleSort} />
    <!--/Header-->

    <!--Products-->
    <section class="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {#each filteredProducts as product}
        <ProductCard {product} />
      {/each}
    </section>
    <!--/Products-->
  </div>
{/if}

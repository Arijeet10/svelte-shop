<script lang="ts">
  import {
    ChevronDown,
    ChevronUp,
    Menu,
    Search,
    ShoppingCart,
    X,
  } from "lucide-svelte";
  import { page } from "$app/stores";
  import { categories, cart, type Product } from "$lib/stores/store";
  import { fetchCategories, fetchProducts } from "$lib/api";
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";
  import { writable } from "svelte/store";
  import { debounce } from "lodash-es";
  import { toasts } from "svelte-toasts";
  import Sidebar from "./Sidebar.svelte";

  let sidebar = false;
  let searchResults = writable<Product[]>([]);
  let searchInput = writable("");
  let dropdown = false;
  let url;
  let isSearching = false;

  $: url = $page.url.pathname;

  const closeSidebar = () => {
    sidebar = false;
  };

  const handleResetSearch = () => {
    searchInput.set("");
    searchResults.set([]);
    isSearching = false;
  };

  const handleSearch = debounce(async () => {
    isSearching = $searchInput.trim() !== "";
    if (!isSearching) {
      searchResults.set([]);
      return;
    }

    try {
      const productList: Product[] = await fetchProducts();
      const results = productList.filter((item) => {
        const titleWords = item.title.split(" ");
        if (titleWords.length === 1) {
          return item.title.toLowerCase().includes($searchInput.toLowerCase());
        }
        return titleWords.some((word) =>
          word.toLowerCase().includes($searchInput.toLowerCase())
        );
      });
      searchResults.set(results);
    } catch (error) {
      console.log("Error in search:", error);
      toasts.error("Error in searching products");
    }
  }, 300);

  onMount(async () => {
    try {
      const categoryList: string[] = await fetchCategories();
      categories.update((items) => [...items, ...categoryList]);
    } catch (error) {
      console.log("Failed to load product categories:", error);
      toasts.error("Failed to load product categories");
    }
  });

  function handleKeydown(event: KeyboardEvent) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      dropdown = !dropdown;
    }
  }
</script>

<header class="px-4 sm:px-8 py-2 flex items-center justify-between">
  <!--Logo-->
  <section class="text-2xl uppercase font-bold text-orange">
    Svelte <span class="text-black">Shop</span>
  </section>
  <!--/Logo-->

  <!--Mobile Screen Navigations-->
  <section class="sm:hidden">
    <button on:click={() => (sidebar = true)} class="text-orange">
      <Menu />
    </button>
  </section>
  {#if sidebar}
    <Sidebar {closeSidebar} />
  {/if}
  <!--/Mobile Screen Navigations-->

  <!--Navigations-->
  <section class="hidden sm:flex items-center">
    <nav class="flex items-center gap-4 font-medium text-[#6C7275]">
      <a
        href="/"
        class={`p-2 ${url == "/" ? "text-[#000000]" : ""} hover:text-[#000000]`}
        >Home</a
      >
      <div class="relative">
        <button
          type="button"
          on:click={() => (dropdown = !dropdown)}
          on:keydown={handleKeydown}
          class={`p-2 flex items-center gap-1 hover:text-[#000000] ${dropdown ? "text-[#000000]" : ""}`}
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
        {#if dropdown}
          <div
            class="w-[30vw] absolute z-50 top-full rounded-b-md shadow-md bg-[#FEFEFE]"
          >
            {#each $categories as category}
              <button
                on:click={() => {
                  goto(`/category/${category}`);
                  dropdown = false;
                }}
                type="button"
                class="block w-full text-left p-2 hover:text-[#000000]"
              >
                {category
                  .split("")
                  .map((item, i) => (i == 0 ? item.toUpperCase() : item))
                  .join("")}
              </button>
            {/each}
          </div>
        {/if}
      </div>

      <a
        href="/about"
        class={`p-2 ${url == "/about" ? "text-[#000000]" : ""} hover:text-[#000000]`}
        >About</a
      >
      <a
        href="/contact"
        class={`p-2 ${url == "/contact" ? "text-[#000000]" : ""} hover:text-[#000000]`}
        >Contact</a
      >
      <a
        href="/blog"
        class={`p-2 ${url == "/blog" ? "text-[#000000]" : ""} hover:text-[#000000]`}
        >Blog</a
      >
    </nav>
  </section>
  <!--/Navigations-->

  <section class="hidden sm:flex items-center gap-4">
    <!--Product Search-->
    <div
      class={` ${isSearching ? "absolute w-[60vw] top-2 left-2/4 translate-x-[-50%] z-50 bg-[#FEFEFE]" : "relative"} transition-all duration-300 ease-in-out`}
    >
      <div
        class={`p-2 flex items-center ${isSearching ? "border" : "lg:border"}  rounded-md`}
      >
        <input
          type="text"
          placeholder="Search Products"
          class={`w-full focus:outline-none bg-transparent ${isSearching ? "block" : "sm:hidden lg:block"} `}
          bind:value={$searchInput}
          on:input={handleSearch}
        />
        {#if $searchInput.trim() !== ""}
          <button on:click={() => handleResetSearch()}>
            <X />
          </button>
        {:else}
          <button on:click={() => (isSearching = true)}>
            <Search />
          </button>
        {/if}
      </div>
      {#if $searchInput.trim() !== ""}
        <div
          class="absolute w-full max-h-[50vh] z-50 top-full p-2 border-x border-b rounded-b-md overflow-scroll hide-default-scrollbar flex flex-col gap-4 bg-[#FEFEFE]"
        >
          {#each $searchResults as product}
            <button
              on:click={() => {
                goto(`/product/${product.id}`);
                handleResetSearch();
              }}
              class="flex items-center gap-2"
            >
              <div class="min-w-20">
                <img
                  src={product.image}
                  alt=""
                  class="w-20 h-20 object-contain"
                />
              </div>
              <div class="">
                {product.title}
              </div>
            </button>
          {/each}
        </div>
      {/if}
    </div>
    <!--/Product Search-->

    <!--Cart-->
    <nav class="flex items-center gap-4 font-medium text-[#6C7275]">
      <a
        href="/cart"
        class={`p-2 flex items-center gap-1 ${url == "/cart" ? "text-[#000000]" : ""} hover:text-[#000000]`}
      >
        <div class="relative">
          <div
            class={`${$cart.length == 0 ? "hidden" : "absolute"} p-1 w-3 h-3 -top-1 right-0 rounded-full flex items-center justify-center bg-orange2 text-[#FEFEFE]`}
          >
            <div class="w-auto h-auto text-xs font-medium">
              {$cart.length}
            </div>
          </div>
          <ShoppingCart />
        </div>
        <div class="sm:hidden md:block">Cart</div>
      </a>
    </nav>
    <!--/Cart-->
  </section>
  {#if isSearching}
    <button
      on:click={() => handleResetSearch()}
      class="absolute z-40 inset-0 bg-[rgba(0,0,0,0.7)]"
    />
  {/if}
</header>

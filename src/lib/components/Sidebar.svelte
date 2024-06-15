<script lang="ts">
  import {
    ChevronDown,
    ChevronUp,
    ShoppingCart,
    X,
  } from "lucide-svelte";
  import { cart, categories } from "$lib/stores/store";
  import { goto } from "$app/navigation";

  export let closeSidebar;
  let dropdown = false;

  function handleKeydown(event: KeyboardEvent) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      dropdown = !dropdown;
    }
  }
</script>

<nav
  class="sm:hidden fixed w-[60vw] h-full z-50 p-2 top-0 right-0 bg-white text-grey "
>
  <div class="flex justify-end">
    <button on:click={closeSidebar} class="text-orange">
      <X />
    </button>
  </div>
  <section
    class="pl-10 flex flex-col items-start justify-between gap-8 text-lg font-medium"
  >
    <button
      on:click={() => {
        goto(`/`);
        closeSidebar();
      }}
      class="hover:text-black">Home</button
    >
    <div class="relative ">
      <button
        type="button"
        on:click={() => (dropdown = !dropdown)}
        on:keydown={handleKeydown}
        class={` flex items-center gap-1 hover:text-black ${dropdown ? "text-black" : ""}`}
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
          class="w-[40vw] absolute z-50 top-full rounded-b-md shadow-md bg-white"
        >
          {#each $categories as category}
            <button
              on:click={() => {
                goto(`/category/${category}`);
                dropdown = false;
                closeSidebar();
              }}
              type="button"
              class="block w-full text-left p-2 hover:text-black"
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
    <button
      on:click={() => {
        goto(`/about`);
        closeSidebar;
      }}
      class="hover:text-black">About</button
    >
    <button
      on:click={() => {
        goto(`/contact`);
        closeSidebar();
      }}
      class="hover:text-black">Contact</button
    >
    <button
      on:click={() => {
        goto(`/blog`);
        closeSidebar();
      }}
      class="hover:text-black">Blog</button
    >
    <button
      on:click={() => {
        goto(`/cart`);
        closeSidebar();
      }}
      class="flex items-center gap-1"
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
      <div>Cart</div>
    </button>
  </section>
</nav>

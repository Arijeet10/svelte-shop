<script lang="ts">
  import { goto } from "$app/navigation";
  import { cart, type Product } from "$lib/stores/store";

  export let product;

  function addToCart(product: Product) {
    const existingProductIndex = $cart.findIndex(
      (item) => item.product.id == product.id
    );
    if (existingProductIndex >= 0) {
      const updatedItems = [...$cart];
      const updatedProduct = { ...updatedItems[existingProductIndex] };
      updatedProduct.productCount += 1;
      updatedItems[existingProductIndex] = updatedProduct;
      cart.update(() => updatedItems);
    } else {
      const newProduct = { product: product, productCount: 1 };
      cart.update(() => [...$cart, newProduct]);
    }
  }
</script>

<div class="p-4 h-[50vh] shadow-lg rounded-md overflow-hidden flex flex-col">
  <button
    on:click={() => goto(`/product/${product.id}`)}
    class="flex-1 relative"
  >
    <img
      src={product.image}
      alt={product.title}
      class="absolute inset-0 w-full h-full object-contain"
    />
  </button>
  <div class=" flex flex-col items-start">
    <button
      on:click={() => goto(`/product/${product.id}`)}
      class="text-lg font-bold line-clamp-2">{product.title}</button
    >
    <p class="text-grey font-medium product-price">${product.price}</p>
    {#if $cart.find((item) => item.product.id == product.id)}
      <button
        on:click={() => goto(`/cart`)}
        class="px-4 py-2 mt-2 rounded-md font-medium bg-black hover:bg-orange2 text-white transition-colors duration-300 ease-in-out"
        >Go to Cart</button
      >
    {:else}
      <button
        class="px-4 py-2 mt-2 rounded-md font-medium bg-orange hover:bg-orange2 text-white transition-colors duration-300 ease-in-out"
        on:click={() => addToCart(product)}>Add to Cart</button
      >
    {/if}
  </div>
</div>

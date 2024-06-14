<script lang="ts">
	import {goto} from "$app/navigation";

    export let product;


</script>

<div class="p-4 h-[50vh] border rounded-md overflow-hidden flex flex-col">
    <button on:click={()=>goto(`/product/${product.id}`)} class="flex-1 relative">
        <img src={product.image} alt={product.title} class="absolute inset-0 w-full h-full object-contain"/>
    </button>
    <div class=" flex flex-col items-start">
        <button on:click={()=>goto(`/product/${product.id}`)} class="text-lg font-bold line-clamp-2">{product.title}</button>
        <p class="text-grey font-medium">${product.price}</p>
        <button class="px-4 py-2 mt-2 rounded-md font-medium bg-orange hover:bg-orange2 text-white" on:click={() => {}}>Add to Cart</button>
    </div>
</div>
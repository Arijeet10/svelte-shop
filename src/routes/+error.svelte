<script lang="ts">
    import {page} from "$app/stores"
</script>

<div class="min-h-[100vh] flex items-center justify-center">
    <div class="flex items-center gap-2 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold">
        <div class="text-orange2">{$page.status}:</div>
        <div>{$page.error?.message}</div>
    </div>
</div>
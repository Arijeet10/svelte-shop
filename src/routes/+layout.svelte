
<script lang="ts">
  import "../app.css";
  import Footer from "$lib/components/Footer.svelte";
  import Header from "$lib/components/Header.svelte";
  import { toasts, ToastContainer, FlatToast }  from "svelte-toasts";
  import { browser } from "$app/environment";


const showToast = () => {
  const toast = toasts.add({
    title: 'Message title',
    description: 'Message body',
    duration: 10000, // 0 or negative to avoid auto-remove
    placement: 'bottom-right',
    type: 'info',
    theme: 'dark',
    onClick: () => {},
    onRemove: () => {},
    // component: BootstrapToast, // allows to override toast component/template per toast
  });

  // toast.remove()

};
</script>

<Header />
{#if browser}
<ToastContainer placement="top-right" let:data={data}>
  <FlatToast {data} /> <!-- Provider template for toasts -->
</ToastContainer>
{/if}
<slot />
<Footer />
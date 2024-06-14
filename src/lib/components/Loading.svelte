<script lang="ts">

    let animate=false;
    setInterval(()=>{
        animate=!animate
    },500)


</script>

<div class=" min-h-[100vh] flex items-center justify-center">
    <div class={`font-bold transition-all duration-300 ease-in-out ${animate?'text-orange scale-150':'text-black'}`}>
        Loading
    </div>
</div>
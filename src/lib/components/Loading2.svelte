<script lang="ts">
    let animate=false;
setInterval(()=>{
    animate=!animate
},500)
</script>

<div class="w-full h-full py-4 pl-4 shadow-lg flex flex-col items-start justify-center gap-8 bg-[#FEFEFE]">
<div class={`border-4 rounded-md border-slate-200 ${animate ? 'w-[5vw]' : 'w-[10vw]'}`} />
<div class={`border-4 rounded-md border-slate-200 ${animate ? 'w-[15vw]' : 'w-[20vw]'}`} />
<div class={`border-4 rounded-md border-slate-200 ${animate ? 'w-[30vw]' : 'w-[50vw]'}`} />
</div>
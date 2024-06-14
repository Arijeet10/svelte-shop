<script lang="ts">
	import { Facebook, Instagram, Youtube } from "lucide-svelte";
</script>

<footer class="h-[40vh] p-2 sm:px-8 sm:py-6  flex items-center  bg-[#141718] text-[#FEFEFE]">
    <div class="w-full flex flex-col gap-4 sm:gap-10 ">
        <section class="w-full flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-0">
            <div class="flex items-center gap-4">
                <div class="text-lg sm:text-2xl font-semibold text-orange">Svelte <span class="text-[#FEFEFE]">Shop</span></div>
                <div class=" h-4 sm:h-8">
                    <div class="w-full h-full border-r border-grey" />
                </div>
                <div class="text-sm sm:text-base">
                    Fake Ecommerce Store
                </div>
            </div>
            <div class="flex items-center gap-4 font-medium text-xs sm:text-base">
                <div class="cursor-pointer hover:text-orange">Home</div>
                <div class="cursor-pointer hover:text-orange">Shop</div>
                <div class="cursor-pointer hover:text-orange">Product</div>
                <div class="cursor-pointer hover:text-orange">Blog</div>
                <div class="cursor-pointer hover:text-orange">Contact Us</div>
            </div>
        </section>
        <section class="w-full flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-0">
            <div class="flex flex-col sm:flex-row items-center gap-4 text-sm sm:text-base">
                <div>
                    Copyright © 2024 Arijeet. All rights reserved
                </div>
                <div>
                    Privacy Policy
                </div>
                <div>
                    Terms of Use
                </div>
            </div>
            <div class="flex items-center gap-4">
                <Facebook class="hover:text-orange" />
                <Instagram class="hover:text-orange" />
                <Youtube class="hover:text-orange" />
            </div>
        </section>
    </div>

</footer>
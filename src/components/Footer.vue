<template>
    <footer class="text-center py-3 mt-5">
        <div class="d-flex flex-row-reverse px-4 mt-2 mb-5">
            <Logo />
        </div>
        <div class="d-flex justify-content-between px-4">
            <div class="d-flex flex-column" >
                <span class="text-white  text-left" style="font-size: 10px">
                    © 2025 goodmoov 
                </span>
                <span class="text-white  text-left" style="font-size: 10px">
                    All right reserved
                </span>
            </div>
            <div class="d-flex flex-column">
                <span class="text-white d-flex flex-row-reverse" style="font-size: 12px">Privacy Policy</span>
                <span class="text-white d-flex flex-row-reverse" style="font-size: 12px">Legal Information</span>
                <span class="text-white d-flex flex-row-reverse" style="font-size: 12px">About</span>
            </div>

        </div>
    </footer>
</template>

<script>
import Logo from '@/components/Logo.vue'
export default {
    
    name: 'app',
     components: {
        Logo,
    },

}
</script>

<style scoped>
    footer {
        background-color: #21252B;
    }
</style>
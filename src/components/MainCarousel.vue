<template>
<div class="w-100">
    <swiper :options="swiperOptions">
        <swiper-slide v-for="(image, index) in movies" :key="index">
            <a href="#" @click.prevent="$router.push(`/detail/${image.imdbID}`)" class="slide-content" :style="{ 'background-image': 'url(' + image.image + ')' }">
            
            </a>
        </swiper-slide>
        <!-- Pagination -->
        <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
</div>
</template>

<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'// Pastikan ini ada jika menggunakan versi 5.x


export default {
    props: ["movies"],
    data() {
        return {
                swiperOptions: {
                    loop: true,
                    slidesPerView: 1.5, // Menampilkan bagian dari slide berikutnya
                    centeredSlides: true,
                    spaceBetween: 10,
                    pagination: {
                    el: '.swiper-pagination',
                    clickable: true
                }
            }
        }
    },
    components: {
        Swiper,
        SwiperSlide
    },
}
</script>

<style scoped>
.swiper-container {
  width: 100%;
  height: 300px;
}

.slide-content {
  background-size: cover;
  background-position: center;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

</style>
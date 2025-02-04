<template>
    <a style="text-decoration: none" href="#" @click.prevent="$router.push(`/detail/${movie.imdbID}`)">
        <div class="image-container bg-dark text-light" :style="{ 'background-image': 'url(' + movie.image + ')' }" >
            <div class="text-overlay">
                {{movie.rating}} 
            </div>
        </div>
        <div class="mt-2">
        <div class="text-white">
            <h6  style="font-size:14px">{{ movie.title }}</h6>
            <p  style="font-size:12px">{{ movie.year }}</p>
        </div>
        </div>
    </a>
</template>

<script>
export default {
    props: ['movie'],
}
</script>

<style scoped>

.image-container {
  position: relative;
  width: 160px;
  height: 224px;
  max-width: 100vw; /* contoh ukuran */
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
.text-overlay {
  position: absolute;
  bottom: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.6); /* opsional untuk background gelap */
  color: white;
  padding: 5px 10px;
}
</style>
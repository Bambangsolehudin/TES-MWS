<template>
  <div class="text-light overflow-hidden" style="background-color: #292E36">
    <Navbar />
    <div v-if="load" class="d-flex justify-content-center" style="height:100vh;">
      <div class="text-center mt-5">Loading.....</div>
    </div>
    <div v-else class="container">

      <MainCarousel :movies="movies" />
      
      
      <carousel :per-page="3" :navigation-enabled="true" class="my-3 category-carousel">
        <slide v-for="(category, index) in categories" :key="index">
          <div class="d-flex  flex-column-reverse category-button px-2">
            <a style="text-decoration:none" href="#" class="d-flex flex-row-reverse"  @click.prevent="$router.push(`/type/${category}`)">
              <h6 class="text-white">{{ category }}</h6>
            </a>
          </div>
        </slide>
      </carousel>

      <h5 class="text-border-wrapper text-light"> Popular </h5>
      <div class="row justify-content-center">
        <div class="col-sm-12 col-md-12 col-lg-10 col-xl-6">
          <carousel :per-page="3" :navigation-enabled="true">
            <slide v-for="(movie, index) in movies" :key="index">
              <div class="slide-content"> 
                <ImgCarouselVue :movie="movie" />
              </div>
            </slide>
          </carousel>
        </div>
      </div>

      <h5 class="text-border-wrapper text-light"> Latest </h5>
      <div class="row justify-content-center">
      <div class="col-sm-8 col-md-12 col-lg-10 col-xl-6">
        <carousel :per-page="3" :navigation-enabled="true">
          <slide v-for="(movie, index) in movies" :key="index">
            <div class="slide-content ">
              <ImgCarouselVue :movie="movie" />
            </div>
          </slide>
        </carousel>
      </div>
      </div>



    </div>


    <Footer />
  </div>
</template>

<script>
import axios from 'axios'
import { Carousel, Slide } from 'vue-carousel';
import ImgCarouselVue from '@/components/ImgCarousel.vue';
import Navbar from '@/components/Navbar.vue';
import Footer from '@/components/Footer.vue';
import MainCarousel from '@/components/MainCarousel.vue'




export default {
  name: 'app',
  components: {
    Carousel,
    Slide,
    ImgCarouselVue,
    Navbar,
    Footer,
    MainCarousel,
  },
  data() {
    return {
      apiKey: 'de4e8896',
      carouselImages: [],
      categories: ['movie', 'series', 'episode'],
      movies: [],
      load: false,
    };
  },
  methods: {


    async fetchMovies() {
      try {
        this.load = true
        const response = await axios.get(
          `https://www.omdbapi.com/?s=movie&type=movie&apikey=${this.apiKey}`
        );
        if (response.data.Search) {
          this.movies = response.data.Search.map((movie) => ({
            title: movie.Title,
            image: movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/150",
            year: movie.Year,
            imdbID: movie.imdbID,
            rating: Math.floor(Math.random() * 3) + 7, // Rating random karena API tidak menyediakannya
          }));
        }
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        this.load = false;
      }
    },
  },
  mounted() {
    
    this.fetchMovies();
  },
};
</script>

<style scoped>
.swiper-container {
  width: 100%;
  height: 300px;
}

.slide-content1 {
  background: lightblue;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
  .slide-content {
    padding: 0 4px;
  }
  .btn-primary {
    background-color: #6a0dad;
    border: none;
  }
  .card {
    width: 100%;
    margin: auto;
  }
  .overflow-hidden {
    overflow-x: hidden;
  }
  .category-carousel {
    padding: 10px;
  }
  .category-button {
    background-color: #563d7c;
    color: white;
    font-size: 14;
    font-weight: 400;
    border: none;
    height: 56px;
    margin-right: 4px;
  }
  .image-container {
    position: relative;
    height: 260px;
    max-width: 80vw; /* contoh ukuran */
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
  }

  .text-border-wrapper {
      display: inline-block;
      position: relative;
  }

  .text-border-wrapper::before {
    content: '';
    position: absolute;
    top: -5px; /* Sesuaikan jarak border dari teks */
    /* left: 10%; */
    width: 80%;
    height: 2px; /* Ketebalan border */
    background-color: purple;
  }

</style>

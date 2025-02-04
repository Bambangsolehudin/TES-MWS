<template>
  <div class="text-light overflow-hidden" style="background-color: #292E36">
    <Navbar />
    <div class="container">
      <carousel :per-page="1" :navigation-enabled="true" class="my-3 category-carousel">
        <slide v-for="(image, index) in movies" :key="index">
          <a href="#" @click.prevent="$router.push(`/detail/${image.imdbID}`)">
            <div class="rounded image-container bg-dark text-light" :style="{ 'background-image': 'url(' + image.image + ')' }" > </div>
          </a>
        </slide>
      </carousel>
      
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
          <carousel :per-page="2" :navigation-enabled="true">
            <slide v-for="(movie, index) in movies" :key="index">
              <ImgCarouselVue :movie="movie" />
            </slide>
          </carousel>
        </div>
      </div>

      <h5 class="text-border-wrapper text-light"> Latest </h5>
      <div class="row justify-content-center">
      <div class="col-sm-12 col-md-12 col-lg-10 col-xl-6">
        <carousel :per-page="2" :navigation-enabled="true">
          <slide v-for="(movie, index) in movies" :key="index">
            <ImgCarouselVue :movie="movie" />
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


export default {
  name: 'app',
  components: {
    Carousel,
    Slide,
    ImgCarouselVue,
    Navbar,
    Footer,
  },
  data() {
    return {
      apiKey: 'de4e8896',
      carouselImages: [],
      categories: ['movie', 'series', 'episode'],
      movies: [],
    };
  },
  methods: {


    async fetchMovies() {
      try {
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
      }
    },
  },
  mounted() {
    this.fetchMovies();
  },
};
</script>

<style scoped>

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

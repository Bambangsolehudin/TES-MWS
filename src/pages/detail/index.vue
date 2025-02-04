<template>
  <div class=" text-light overflow-hidden" style="background-color: #292E36">
    <Navbar />

    <div class="container">
        <div class="row mt-4">
            <div class="col-12">
            <a style="text-decoration: none" href="#" @click.prevent="$router.go(-1)">
                <img class="img-fluid" src="/left-arrow.svg" alt="">
            </a>
            </div>
        </div>
        <div class="row mt-4">
            <div class="col-6">
                <img :src="detail.Poster" class="img-fluid" alt="">
            </div>
            <div class="col-6">
                <p style="font-size:12px">
                    {{ detail.Year }}
                </p>

                <p style="font-size:20px">
                {{ detail.Title }} 
                </p>

                <p style="font-size:10px">
                    {{ detail.Genre}}
                </p>

                <p style="font-size:10px">
                    {{detail.Runtime}}
                </p>
            </div>

            <div class="col-12">
                <h6 style="font-size:16px" class="text-border-wrapper text-light mt-4 mb-2"> Overview </h6>
                <p style="font-size:16px">{{ detail?.Plot }}</p>

            </div>
        </div>

    <!-- cast -->
    <h6 style="font-size:16px" class="text-border-wrapper text-light mt-4 mb-2"> Cast </h6>
    <div class="row justify-content-center">
    <div class="col-sm-12 col-md-12 col-lg-10 col-xl-6">
    <carousel :per-page="3" :navigation-enabled="true">
        <slide v-for="(name, index) in detail?.Actors?.split(',')" :key="index">
            <ImgUser :name="name" />
        </slide>
    </carousel>
    </div>
    </div>

    <!-- Section Terbaru -->
    <h6 style="font-size:16px" class="text-border-wrapper text-light mt-4 mb-2"> Recomended </h6>
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
import ImgUser from '@/components/imgUser.vue';


export default {
  name: 'app',
  components: {
    Carousel,
    Slide,
    ImgCarouselVue,
    Navbar,
    Footer,
    ImgUser,
  },

  data() {
    return {
      apiKey: 'de4e8896',
      movies: [],
      detail: {},
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

    async fetchDetail() {
      try {
        const response = await axios.get(
          `https://www.omdbapi.com/?i=${this.$route.params.id}&apikey=${this.apiKey}`
        );
        if (response.data) {
            console.log(response.data);
            
          this.detail = response.data
        }
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    },
  },

  mounted() {
    console.log(this.$route.params.id);
    this.fetchMovies();
    this.fetchDetail();
  },
};
</script>

<style scoped>
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

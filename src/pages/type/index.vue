<template>
  <div class=" text-light overflow-hidden" style="background-color: #292E36">
    <Navbar />

    <div class="container">
        <div class="row mt-4">
            <div class="col-12 d-flex justify-content-between">
              <a style="text-decoration: none" href="#" @click.prevent="$router.go(-1)">
                  <img class="img-fluid" src="/left-arrow.svg" alt="">
              </a>
              <span style="font-size:24px">
                {{$route?.params?.type}}
              </span>
            </div>
        </div>
        <!-- Section Terbaru -->
        
        <div v-if="movies.length > 0" class="row justify-content-center mt-5">
            <div class="col-6 col-xl-3 " v-for="(movie, index) in movies" :key="index">
              <ImgCarouselVue :movie="movie" />
            </div>

            <div class="col-12 text-center my-5">
              <button @click.prevent="() => {
                page+=1;
                fetchMovies()
              }" class="btn text-white px-5 py-2" style="background-color: #543B85;">Load More</button>
            </div>
        </div>
        <div v-else class="h-60vh pt-5">
          <h4 class="text-center">Tidak Ada data</h4>
        </div>
        </div>

        <Footer />

    </div>
</template>

<script>
import axios from 'axios'
import ImgCarouselVue from '@/components/ImgCarousel.vue';
import Navbar from '@/components/Navbar.vue';
import Footer from '@/components/Footer.vue';


export default {
  name: 'app',
  components: {
    ImgCarouselVue,
    Navbar,
    Footer,
  },
  data() {
    return {
      apiKey: 'de4e8896',
      carouselImages: [],
      categories: ["Action", "Adventure", "Animation", "Drama", "Horror"],
      movies: [],
      page: 1,
    };
  },
  methods: {
    async fetchMovies() {
      try {
        const response = await axios.get(
          `https://www.omdbapi.com/?s=${this.$route?.params?.type}&type=${this.$route?.params?.type}&page=${this.page}&apikey=${this.apiKey}`
        );
        if (response.data.Search) {
          let dt = response.data.Search.map((movie) => ({
            title: movie.Title,
            image: movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/150",
            year: movie.Year,
            imdbID: movie.imdbID,
            rating: Math.floor(Math.random() * 3) + 7,
          }));

          this.movies = [...this.movies, ...dt]
        }
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    },

  },

  mounted() {
    console.log(this.$route.params.type);
    this.fetchMovies();
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
    .h-60vh {
      height: 60vh;
    }
</style>

<template>
  <div class="home">
    <slider-news></slider-news>
    <v-container>
      <v-row class="home-grid">
        <v-col cols="9" class="home-news">
          <news-snippet></news-snippet>
        </v-col>
        <v-col cols="3" class="home-links">
          <home-side></home-side>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import SliderNews from "@/components/SliderNews";
import NewsSnippet from "@/components/NewsSnippet";
import HomeSide from "@/components/HomeSide";
export default {
  name: "Home",
  components: {SliderNews, NewsSnippet, HomeSide},
  data: () => ({
    
  })
};
</script>

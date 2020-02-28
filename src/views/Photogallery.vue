<template>
  <v-container>
    <h1><router-link to="/photogallery">Фотогалерея</router-link></h1>
    <v-row>
      <v-col cols="2">
        <h2 style="margin-bottom:12px;">Альбомы</h2>
        <photo-gallery-preview v-for="(album, index) in albums" :key="index" :album="album" aspect-ratio="1.7" />
      </v-col>
      <v-col cols="10">
        <router-view></router-view>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import PhotoService from "@/services/PhotoService";
import { mapState } from "vuex";

export default {
  components: {
    PhotoGalleryPreview: () => import("../components/PhotoGalleryPreview")
  },
  computed: {
    ...mapState({
      albums: state => state.albums,
    })
  },  
  methods: {
    getAlbumsPreviews() {
      PhotoService.getAlbumsPreviews().then(response => {
        if (response.data.success) {
          this.$store.commit('SET_albums', response.data.albums)
        }
      });
    }
  },
  created() {
    this.getAlbumsPreviews();
  }
};
</script>

<style>
</style>
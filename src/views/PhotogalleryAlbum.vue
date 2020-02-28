<template>
  <div>
    <h2>Фотоальбом</h2>
    <!-- <v-row class="photo-grid" style="margin-top:-12px;">
      <v-col v-for="(photo, index) in photos" :key="index" cols="4">
        <v-img :src="`${SERVER}${photo.path}`" aspect-ratio="1.7"></v-img>
      </v-col>
    </v-row>-->

    <see-image-viewer :images="photos" />
  </div>
</template>

<script>
import PhotoService from "@/services/PhotoService";
import { mapState } from "vuex";

export default {
  components: {
    SeeImageViewer: () => import("../components/SeeImageViewer"),
  },
  data: () => ({
    photos: []
  }),
  computed: {
    ...mapState({
      albums: state => state.cms_albums
    }),
    album() {
      return this.albums.find(item => item._id === this.$route.params.album);
    }
  },
  methods: {
    getPhotos() {
      PhotoService.getAlbumPhotos(this.$route.params.album).then(response => {
        if (response.data.success) {
          this.photos = response.data.photos;
        }
      });
    }
  },
  watch: {
    $route: {
      handler(value) {
        this.getPhotos();
      },
      immediate: true
    }
  }
};
</script>
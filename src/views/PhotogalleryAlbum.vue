<template>
  <div>
    <h2>Фотоальбом <span v-if="album">«{{album.name}}»</span></h2>
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
      albums: state => state.albums
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
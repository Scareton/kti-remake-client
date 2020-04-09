<template>
  <div class="photobase-snippet">
    <v-subheader class="title"><router-link to="/photogallery">Фотогалерея</router-link></v-subheader>
    <div style="padding: 0 16px;">
      <swiper class="photobase-snippet-items">
        <swiper-slide class="photobase-snippet-item" v-for="(item, index) in albums" :key="index">
          <photo-gallery-preview :album="item" />
        </swiper-slide>
      </swiper>
    </div>
  </div>
</template>

<script>
import PhotoService from "@/services/PhotoService";
import "swiper/dist/css/swiper.css";
import { swiper, swiperSlide } from "vue-awesome-swiper";
import PhotoGalleryPreview from "../components/PhotoGalleryPreview";
export default {
  name: "photobase",
  components: { swiper, swiperSlide, PhotoGalleryPreview },
  data: () => ({
    albums: []
  }),
  methods: {
    getAlbumsPreviews() {
      PhotoService.getAlbumsPreviews().then(response => {
        this.albums = response.data.albums;
      });
    }
  },
  created() {
    this.getAlbumsPreviews();
  }
};
</script>
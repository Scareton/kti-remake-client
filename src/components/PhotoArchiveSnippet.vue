<template>
  <div class="photobase-snippet">
    <v-subheader class="title">Фотоархив</v-subheader>
    <div style="padding: 0 16px;">
      <swiper class="photobase-snippet-items">
        <swiper-slide class="photobase-snippet-item" v-for="(item, index) in photos" :key="index">
          <v-img :src="item.url">
            <div class="photobase-snippet-item-overlay">
              <div class="photobase-snippet-item-text caption">{{item.title}}</div>
            </div>
          </v-img>
        </swiper-slide>
      </swiper>
    </div>
  </div>
</template>

<script>
import "swiper/dist/css/swiper.css";
import { swiper, swiperSlide } from "vue-awesome-swiper";
export default {
  name: "photobase",
  components: { swiper, swiperSlide },
  data: () => ({
    photos: [
      { url: "test/photo_1.jpg", title: "Зимний киберспортивный турнир КТИ" },
      { url: "test/photo_2.jpg", title: "День программиста на кафедре АСОИУ" }
    ]
  })
};
</script>

<style scoped>
.photobase-snippet-item-overlay {
  display: flex;
  height: 100%;
}
.photobase-snippet-item-text {
  align-self: flex-end;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  color: #fff;
  padding: 6px 12px;
}
</style>
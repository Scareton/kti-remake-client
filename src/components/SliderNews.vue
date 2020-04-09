<template>
  <div class="slider-news">
    <swiper :options="swiperOptions">
      <swiper-slide>
        <v-img src="test/slide_1.jpg">
          <div class="slide-wrapper">
            <div class="slide-description">
              <v-container>
                <div class="title">IT-школа «Камышонок» ведет набор детей разных возрастов для обучения знаниям в области информационных технологий.</div>
                <div class="body-1">Школа создана на базе Камышинского технологического института (филиала) Волгоградского государственного технического университета, а значит это высококлассные преподаватели, новейшее оборудование, удобные помещения.</div>
              </v-container>
            </div>
          </div>
        </v-img>
      </swiper-slide>

      <div class="swiper-pagination" slot="pagination"></div>
      <div class="swiper-button-prev" slot="button-prev"></div>
      <div class="swiper-button-next" slot="button-next"></div>
    </swiper>
  </div>
</template>

<script>
import "swiper/dist/css/swiper.css";
import { swiper, swiperSlide } from "vue-awesome-swiper";

export default {
  name: "SliderNews",
  components: { swiper, swiperSlide },
  data: () => ({
    swiperOptions: {
      height: "400px"
    }
  })
};
</script>

<style scoped>
.slider-news {
  /* max-height: 400px; */
  overflow: hidden;
}
.swiper-container .swiper-slide,
.swiper-container .swiper-slide .v-image {
  height: 600px;
}

.slide-wrapper {
  width:100%;
  height:100%;
  display: flex;
  align-items: flex-end;
}
.slide-description {
  background-color: rgba(42, 40, 40, 0.95);
  color:#fff;
  width:100%;
}
.slide-description .title {
  border-bottom: 2px solid #d4ae08;
  margin-bottom:6px;
}

@media (max-width: 959px) {
  .slide-description > .container {
    padding: 0;
  }
  .slide-description .title,
  .slide-description .body-1 {
    padding: 12px;
  }
}
@media (max-width: 425px) {
  .slide-description .title {
    font-size: 1rem !important;
    line-height: 1.2;
  }
  .slide-description .body-1 {
    font-size: 0.9rem !important;
    line-height: 1.2;
  }
}
</style>
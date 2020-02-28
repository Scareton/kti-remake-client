<template>
  <div class="homeside">
    <div class="homeside-resources">
      <v-list>
        <v-subheader class="title">Ресурсы</v-subheader>
        <v-list-item dense active-class=" " to=" ">Сведения об образовательной организации</v-list-item>
        <v-list-item dense active-class=" " to=" ">Нормативные документы</v-list-item>
        <v-list-item dense active-class=" " to=" ">Расписание занятий</v-list-item>
        <v-list-item dense active-class=" " to=" ">Библиотека</v-list-item>
        <v-list-item dense active-class=" " to=" ">Конференции</v-list-item>
        <v-list-item dense active-class=" " to=" ">Виртуальная приемная</v-list-item>
        <v-list-item dense active-class=" " to=" ">Видеоархив института</v-list-item>
        <v-list-item dense active-class=" " to=" ">Электронные сервисы</v-list-item>
        <v-list-item dense active-class=" " to=" ">ЭИОС</v-list-item>
        <v-list-item dense active-class=" " to=" ">СДО-КТИ</v-list-item>
      </v-list>
    </div>

    <photo-gallery-albums-slider></photo-gallery-albums-slider>
  </div>
</template>

<script>
import PhotoGalleryAlbumsSlider from "@/components/PhotoGalleryAlbumsSlider"
export default {
  name: "HomeSide",
  components: {PhotoGalleryAlbumsSlider}
};
</script>
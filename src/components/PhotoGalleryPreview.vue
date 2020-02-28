<template>
  <router-link :to="`/photogallery/${album._id}`" style="text-decoration: none;" class="album-preview">
    <v-img :src="`${SERVER}${album.cover}`" :aspect-ratio="aspectRatio">
      <div class="album-preview-item-overlay">
        <div class="album-preview-item-text caption">{{album.name}}&nbsp;({{album.count}} фото)</div>
      </div>
    </v-img>
  </router-link>
</template>

<script>
export default {
  props: {
    album: {
      type: Object
    },
    aspectRatio: {
      type: String,
      default: ""
    }
  }
};
</script>


<style scoped>
.album-preview-item-overlay {
  display: flex;
  height: 100%;
}
.album-preview-item-text {
  align-self: flex-end;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  color: #fff;
  padding: 6px 12px;
}
</style>
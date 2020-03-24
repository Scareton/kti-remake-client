<template>
  <div>
    <v-card v-if="album">
      <v-card-title>
        <h3 v-if="album">Альбом «{{album.name}}»</h3>
      </v-card-title>
    </v-card>
    <v-expansion-panels multiple accordion style="margin-bottom:12px;margin-top:12px;">
      <photo-archive-load />
    </v-expansion-panels>
    <v-card>
      <v-card-title>
        Фотографии в альбоме
        <span v-if="album">({{album.count}})</span>
      </v-card-title>
      <v-divider/>
      <v-row style="padding:16px;">
        <v-col cols="4" v-for="(item, index) in photos" :key="index">
          <v-img :src="`${SERVER}${item.path}`" aspect-ratio="1.7" />
          <div class="image-data">
            <v-text-field label="Название" hide-details v-model="item.title"></v-text-field>
            <v-text-field label="Автор" hide-details v-model="item.author"></v-text-field>
            <v-text-field label="Место" hide-details v-model="item.place"></v-text-field>
            <div style="margin-top:14px; font-size:11px; color: #648e69;">{{item.path}}</div>
          </div>
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>

<script>
import PhotoService from "@/services/PhotoService";
import { mapState } from "vuex";
export default {
  components: {
    PhotoArchiveLoad: () => import("./PhotoArchiveLoad")
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
    getAlbumPhotos() {
      PhotoService.getAlbumPhotos(this.$route.params.album).then(response => {
        if (response) {
          this.photos = response.data.photos;
        }
      });
    }
  },
  watch: {
    $route: {
      handler(value) {
        this.getAlbumPhotos();
      },
      immediate: true
    }
  }
};
</script>
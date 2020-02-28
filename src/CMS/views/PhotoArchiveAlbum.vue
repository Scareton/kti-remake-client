<template>
  <div v-if="album">
    <div style="margin-bottom:18px;">
      <h3 v-if="album">Альбом «{{album.name}}»</h3>
    </div>
    <div class="archive-photos">
      <v-expansion-panels multiple accordion style="margin-bottom:18px;">
        <photo-archive-load />
      </v-expansion-panels>
      <v-card>
        <v-card-text>
          <h4>Фотографии в альбоме <span v-if="album">({{album.count}})</span></h4>
          <v-row>
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
        </v-card-text>
      </v-card>
    </div>
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
    photos: [],
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
    '$route': {
      handler(value) {
        this.getAlbumPhotos();
      },
      immediate: true
    }
  }
};
</script>
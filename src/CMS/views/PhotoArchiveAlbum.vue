<template>
  <div>
    <v-card v-if="album">
      <v-card-title>
        <h3 v-if="album">Альбом «{{album.name}}»</h3>
      </v-card-title>
    </v-card>
    <v-expansion-panels multiple accordion style="margin-bottom:12px;margin-top:12px;">
      <photo-archive-load @loaded="getAlbumPhotos()" />
    </v-expansion-panels>
    <v-card>
      <v-card-title>
        Фотографии в альбоме
        <span v-if="album">({{album.count}})</span>
      </v-card-title>
      <v-divider />
      <v-row style="padding:16px;">
        <v-col cols="4" v-for="(item, index) in photos" :key="index">
          <v-img :src="`${SERVER}${item.path}`" aspect-ratio="1.7" />
          <div class="image-data">
            <v-text-field label="Название" hide-details v-model="item.local.title"></v-text-field>
            <v-text-field label="Автор" hide-details v-model="item.local.author"></v-text-field>
            <v-text-field label="Место" hide-details v-model="item.local.place"></v-text-field>
            <div style="display:flex;margin:14px 0;">
              <v-btn text @click="removePhotoCheck(item)">Удалить</v-btn>
              <v-btn :disabled="item.local.title === item.title && item.local.author === item.author && item.local.place === item.place" text color="primary" @click="updatePhoto(item)">Изменить</v-btn>
            </div>
            <div style="font-size:11px; color: #648e69;">{{item.path}}</div>
          </div>
        </v-col>
      </v-row>
    </v-card>

    <!-- Подтвердить удаление фото -->
    <v-dialog width="unset" v-model="isPhotoRemove">
      <v-card>
        <v-card-title>Удалить фото?</v-card-title>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn text color="primary" @click="removePhoto(photoToRemove)">Удалить</v-btn>
          <v-btn text @click="photoToRemove = null;isPhotoRemove = false;">Отмена</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
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
    isPhotoRemove: false,
    photoToRemove: null,
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
          response.data.photos.forEach(item => {
            item.local = {};
            item.local.title = item.title;
            item.local.author = item.author;
            item.local.place = item.place;
          });
          this.photos = response.data.photos;
        }
      });
    },
    removePhotoCheck(item) {
      this.isPhotoRemove = true;
      this.photoToRemove = item;
    },
    removePhoto(item) {
      PhotoService.removeAlbumPhoto(item._id).then(response => {
        this.getAlbumPhotos();
        this.isPhotoRemove = false;
        this.photoToRemove = null;
      });
    },
    updatePhoto(item) {
      PhotoService.updateAlbumPhoto(item._id, {
        title: item.local.title,
        author: item.local.author,
        place: item.local.place
      }).then(response => {
        item.title = item.local.title;
        item.author = item.local.author;
        item.place = item.local.place;
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
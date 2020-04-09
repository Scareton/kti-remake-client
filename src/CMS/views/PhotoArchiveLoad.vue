<template>
  <v-expansion-panel class="photos-load">
    <v-expansion-panel-header>
      <h4>Загрузить фото</h4>
    </v-expansion-panel-header>
    <v-expansion-panel-content>
      <v-file-input ref="loadButton" multiple show-size counter accept="image/png, image/jpeg, image/bmp" v-model="uploadedValue" @change="uploadedChanged" label="Выберите фотографии">
        <template v-slot:selection="{ text }">
          <v-chip small label color="primary">{{ text }}</v-chip>
        </template>
      </v-file-input>
      <template v-if="previews[0]">
        <h4>Предпросмотр загруженных фото</h4>
        <div class="photos-grid">
          <v-row>
            <v-col v-for="(item, index) in previews" :key="index" cols="4">
              <v-img :src="item" aspect-ratio="1.7" />
              <div class="image-data">
                <v-text-field label="Название" hide-details v-model="imagesData[index].title"></v-text-field>
                <v-text-field label="Автор" hide-details v-model="imagesData[index].author"></v-text-field>
                <v-text-field label="Место" hide-details v-model="imagesData[index].place"></v-text-field>
                <div style="text-align:center; margin-top:14px; font-size:11px; color: #648e69;">{{imagesData[index].photo}}</div>
              </div>
            </v-col>
          </v-row>
        </div>
        <div>
          <!-- TODO Позиционирование справа -->
          <v-btn color="primary" @click="savePhotos(uploadedValue)">Отправить</v-btn>
        </div>
      </template>
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>

<script>
import PhotoService from "@/services/PhotoService";
import { mapState } from "vuex";
export default {
  props: {
    newAlbumName: {
      type: String
    },
    newAlbumAlias: {
      type: String
    }
  },
  data: () => ({
    photos: [],
    uploadedValue: null,
    previews: [],
    imagesData: []
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
    uploadedChanged(files) {
      this.previews.length = 0;
      this.imagesData.length = 0;
      if (files) {
        files.forEach(file => {
          this.previews.push(URL.createObjectURL(file));
          this.imagesData.push({
            photo: file.name
          });
        });
      }
    },
    savePhotos(files) {
      // Если альбом доступен
      if (this.album || (this.newAlbumName && this.newAlbumAlias)) {
        // Записываем его alias и name
        let name, alias;

        // Если нужно создать новый альбом
        if (this.newAlbumName && this.newAlbumAlias) {
          name = this.newAlbumName;
          alias = this.newAlbumAlias;
        } else {
          name = this.album.name;
          alias = this.album._id;
        }

        // Создаём объект formdata
        let formdata = new FormData();

        // Добавляем поле с названием альбома
        formdata.append("albumname", name);

        // Перебираем файлы и добавляем их к formdata вместе с данными фотографий (По индексу)
        files.forEach((file, index) => {
          formdata.append("photos", file);
          formdata.append("photosData", JSON.stringify(this.imagesData[index]));
        });

        // Делаем запрос на сохранение файлов
        PhotoService.uploadAlbumPhotos(alias, formdata).then(response => {
          if (response.data.success) {
            this.$router.replace(`/cms/photoarchive/${alias}`);
            this.$set(this.$refs.loadButton, "initialValue", []);
            this.$set(this.$refs.loadButton, "lazyValue", []);
            this.uploadedValue = [];
            this.previews = []
            this.$emit("loaded");
          }
        });
      }
    }
  },
  watch: {
    $route: {
      handler(value) {
        this.previews.length = 0;
        this.imagesData.length = 0;
        this.uploadedValue = null;
      }
    }
  }
};
</script>
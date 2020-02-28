<template>
  <div>
    <router-link to="/cms/">Назад</router-link>
    <v-row>
      <v-col cols="2">
        <h3>Альбомы</h3>
        <router-link v-for="(item, index) in albums" :key="index" :to="item.path">{{item.name}} ({{item.count}})</router-link>
      </v-col>
      <v-col cols="10">
        <router-view></router-view>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import PhotoService from "@/services/PhotoService";
import { mapState } from "vuex";
export default {
  data: () => ({}),
  computed: {
    ...mapState({
      albums: state => state.cms_albums
    })
  },
  methods: {
    getAlbums() {
      PhotoService.getAlbums().then(response => {
        if (response) {
          // Получаем альбомы и создаём для них cms-ссылки
          let albums = response.data.albums;
          albums.forEach(item => {
            item.path = `/cms/photoarchive/${item._id}`;
          });
          this.$store.commit('SET_cms_albums', albums)
        }
      });
    }
  },
  created() {
    this.getAlbums();
  }
};
</script>

<style>
.image-data {
  border: 1px solid #eee;
  padding: 6px 12px 12px 12px;
}
.image-data .v-text-field {
  
}
</style>
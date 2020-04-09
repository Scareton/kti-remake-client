<template>
  <div class="cms">
    <v-container>
      <!-- <v-card style="padding:16px;"> -->
        <h1>Система управления контентом КТИ</h1>
      <!-- </v-card> -->
      <v-row>
        <v-col cols="3" class="">
          <sections-list cms />

          <v-card style="margin-top:16px;">
            <div style="padding:16px;">
              <h3>Фотоархив</h3>
              <!-- <router-link v-for="(item, index) in albums" :key="index" :to="item.path" style="display:block;">{{item.name}} ({{item.count}})</router-link> -->
              <v-list>
                <v-list-item v-for="(item, index) in albums" :key="index" :to="item.path">{{item.name}} ({{item.count}})</v-list-item>
              </v-list>
              <div class="albums-list-buttons">
                <v-btn small color="primary" @click="createAlbum">Создать альбом</v-btn>
              </div>
            </div>
          </v-card>

          <v-card style="margin-top:16px;">
            <div style="padding:16px;">
              <router-link to="/cms/links"><h3>Управление ссылками</h3></router-link>
            </div>
          </v-card>
        </v-col>
        <v-col cols="9">
          <router-view></router-view>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import PhotoService from "@/services/PhotoService";
import { mapState } from "vuex";
export default {
  components: {
    SectionsList: () => import("@/components/SectionsList")
  },
  computed: {
    ...mapState({
      albums: state => state.cms_albums
    })
  },
  methods: {
    createAlbum() {
      let path = "/cms/photoarchive";
      this.$router
        .push({ path: path, query: { mode: "create" } })
        .catch(err => {
          console.log(err);
        });
    },
    getAlbums() {
      PhotoService.getAlbums().then(response => {
        if (response) {
          // Получаем альбомы и создаём для них cms-ссылки
          let albums = response.data.albums;
          albums.forEach(item => {
            item.path = `/cms/photoarchive/${item._id}`;
          });
          this.$store.commit("SET_cms_albums", albums);
        }
      });
    }
  },
  watch: {
    $route: {
      handler(value) {
        this.mode = null;
        this.getAlbums();
        if (value.query && value.query.mode) this.mode = "create";
      },
      immediate: true
    }
  }
};
</script>

<style>
.albums-list-buttons {
  margin-top: 12px;
}
</style>
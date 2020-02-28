<template>
  <div>
    <router-link to="/cms/">Назад</router-link>
    <v-row>
      <v-col cols="2">
        <h3>Альбомы</h3>
        <router-link v-for="(item, index) in albums" :key="index" :to="item.path">{{item.name}} ({{item.count}})</router-link>
        <div class="albums-list-buttons">
          <v-btn small color="primary" @click="createAlbum">Создать альбом</v-btn>
        </div>
      </v-col>
      <v-col cols="10">
        <template v-if="mode === 'create'">
          <h3>Создать новый альбом</h3>
          <v-row>
            <alias-field :title.sync="title" :alias.sync="alias" label="Alias альбома"></alias-field>
          </v-row>
          <v-expansion-panels multiple accordion style="margin-bottom:18px;margin-top:6px;" :v-model="[0]">
            <photo-archive-load />
          </v-expansion-panels>
        </template>
        <router-view></router-view>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import PhotoService from "@/services/PhotoService";
import { mapState } from "vuex";
export default {
  data: () => ({
    mode: null,
    title: "Тут название",
    alias: ""
  }),
  components: {
    PhotoArchiveLoad: () => import("./PhotoArchiveLoad"),
    AliasField: () => import("../components/AliasField")
  },
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
          this.$store.commit("SET_cms_albums", albums);
        }
      });
    },
    createAlbum() {
      let path = "/cms/photoarchive";
      this.$router
        .push({ path: path, query: { mode: "create" } })
        .catch(err => {
          console.log(err);
        });
    }
  },
  watch: {
    $route: {
      handler(value) {
        this.mode = null;
        if (value.query && value.query.mode) this.mode = "create";
      },
      immediate: true
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
.albums-list-buttons {
  margin-top: 12px;
}
</style>
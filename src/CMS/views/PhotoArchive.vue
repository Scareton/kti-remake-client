<template>
  <div>
    <v-card v-if="mode === 'create'">
      <v-card-title>Создать новый альбом</v-card-title>
      <v-divider />
      <div style="padding:16px;">
        <alias-field :title.sync="title" :alias.sync="alias" label="Alias альбома"></alias-field>
      </div>
    </v-card>
    <transition name="fade">
      <v-expansion-panels accordion style="margin-bottom:18px;margin-top:6px;" v-model="panels" v-show="title && alias">
        <photo-archive-load :newAlbumName="title" :newAlbumAlias="alias" />
      </v-expansion-panels>
    </transition>
    <router-view></router-view>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data: () => ({
    mode: null,
    title: "",
    alias: "",
    panels: 0
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
  watch: {
    $route: {
      handler(value) {
        this.mode = value.query.mode;
      },
      immediate: TextTrackCueList
    }
  }
};
</script>

<style>
.image-data {
  border: 1px solid #eee;
  padding: 6px 12px 12px 12px;
}
</style>
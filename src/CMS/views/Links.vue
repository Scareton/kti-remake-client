<template>
  <div>
    <v-row>
      <v-col style="padding-top:0;" v-if="navigations[0]">
        <v-card v-for="(nav, i) in navigations" :key="i">
          <v-card-title style="">Управление ссылками и навигацией</v-card-title>
          <v-divider />
          <div style="padding: 16px;">
            <div class="title">{{nav.title}}</div>
            <div class="body-2">{{nav.description}}</div>
            <v-row>
              <v-col cols="8">
                <v-treeview :items="sectionsTree" v-model="nav.items" selectable return-object selection-type="independent"></v-treeview>
              </v-col>
              <v-col cols="4">
                <div class="body-2" style="margin-bottom:16px;">Предпросмотр:</div>
                <div v-for="item in nav.items" :key="item._id">{{item.name}}</div>
              </v-col>
            </v-row>
            <transition name="fade">
              <v-card-actions v-if="!isSame(nav.items.map(item => item.id), nav.base_items.map(item => item.id))">
                <v-btn color="primary" @click="saveLinks(nav)">Сохранить изменения</v-btn>
              </v-card-actions>
            </transition>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import NavigationsService from "@/services/NavigationsService.js";
export default {
  data: () => ({
    navigations: []
  }),
  computed: {
    sectionsTree() {
      return this.$store.getters.sectionsTree;
    }
  },
  methods: {
    getNavigations() {
      NavigationsService.getNavigations().then(response => {
        if (response.data.success) {
          response.data.navigations.forEach(nav => {
            nav.base_items = nav.items;
          });

          this.navigations = response.data.navigations;
        }
      });
    },
    isSame(array1, array2) {
      return (
        array1.length == array2.length &&
        array1.every(function(element, index) {
          return array2.indexOf(element) !== -1;
        })
      );
    },
    saveLinks(nav) {
      this.$store.commit("OPEN_loader");
      let links = nav.items.map(item => item.id);
      NavigationsService.saveLinks(nav._id, links).then(response => {
        this.$store.commit("CLOSE_loader");
        if (response.data.success) {
          this.$store.commit("OPEN_snackbar_success", response.data.info);
          nav.base_items = nav.items;
        } else {
          this.$store.commit("OPEN_snackbar_error", response.data.info);
        }
      });
    }
  },
  created() {
    this.getNavigations();
  }
};
</script>
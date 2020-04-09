<template>
  <div class="sections-list">
    <v-card>
      <v-sheet class="pa-4 primary">
        <v-text-field v-model="search" label="Поиск..." dark flat solo-inverted hide-details clearable clear-icon="mdi-close-circle-outline"></v-text-field>
      </v-sheet>
      <v-treeview :items="items ? parentsTreeItems : parentsTree" :open="open" :active.sync="selected" :filter="filter" :search="search" hoverable activatable return-object @update:active="resourceChanged">
        <template v-slot:prepend="{ item, open }">
          <v-icon v-if="item.children[0]">{{ open ? 'mdi-folder-open' : 'mdi-folder' }}</v-icon>
          <v-icon v-else>mdi-file</v-icon>
        </template>
        <template v-slot:append="{ item }" v-if="cms">
          <v-icon class="resource-add" @click.stop="createResource(item)">mdi-plus</v-icon>
        </template>
      </v-treeview>
      <v-list dense v-if="cms">
        <v-list-item @click="createResource()">
          <v-list-item-icon>
            <v-icon>mdi-plus</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Добавить раздел</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-card>
  </div>
</template>

<script>
function compare(a, b) {
  if (a.fullpath < b.fullpath) {
    return -1;
  }
  if (a.fullpath > b.fullpath) {
    return 1;
  }
  return 0;
}

import { mapState } from "vuex";
export default {
  props: {
    cms: {
      type: Boolean,
      default: false
    },
    items: {
      type: Array
    }
  },
  data: () => ({
    search: null,
    caseSensitive: false,
    selected: [],
    open: []
  }),
  computed: {
    ...mapState({
      sections: state => state.sections
    }),
    parentsTreeItems() {
      if (this.$store.getters.itemsTree(this.items)[0].children)
        return this.$store.getters.itemsTree(this.items)[0].children;
      else return null;
    },
    parentsTree() {
      return this.$store.getters.sectionsTree;
      // if (!this.items) return this.$store.getters.sectionsTree;
      // else return this.$store.getters.itemsTree(this.items)[0].children
    },
    filter() {
      return this.caseSensitive
        ? (item, search, textKey) => item[textKey].indexOf(search) > -1
        : undefined;
    }
  },
  methods: {
    resourceChanged(item) {
      if (item[0]) {
        item = item[0];
        let path;
        if (this.cms) path = `/cms-post${item.fullpath}`;
        else path = item.fullpath;
        this.$router.push(path);
      }
    },
    createResource(item) {
      this.selected = [];
      let path;
      if (!item) path = "/cms-post/";
      else path = `/cms-post${item.fullpath}`;

      this.$router
        .push({ path: path, query: { mode: "create" } })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style scoped>
.sections-list {
  flex-direction: column;
  display: flex;
  margin-bottom: 16px;
}
.sections-item {
  flex: 0;
}
.sections-list-buttons {
  margin-top: 12px;
}
/* TODO .v-treeview-node__level уменьшить размер на маленьких экранах */
</style>

<style>
.v-treeview-node {
  cursor: pointer;
}
.v-treeview-node__root .resource-add {
  opacity: 0;
  transition: opacity 0.2s ease-in-out;
}
.v-treeview-node__root:hover .resource-add {
  opacity: 1;
}
</style>
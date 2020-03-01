<template>
  <div class="sections-list">
    <v-card>
      <v-sheet class="pa-4 primary">
        <v-text-field v-model="search" label="Поиск..." dark flat solo-inverted hide-details clearable clear-icon="mdi-close-circle-outline"></v-text-field>
      </v-sheet>
      <v-treeview :items="parentsTree" :filter="filter" :search="search" hoverable activatable return-object @update:active="resourceChanged">
        <template v-slot:prepend="{ item, open }">
          <v-icon v-if="item.children[0]">{{ open ? 'mdi-folder-open' : 'mdi-folder' }}</v-icon>
          <v-icon v-else>mdi-file</v-icon>
        </template>
        <template v-slot:append="{ item }">
          <v-icon class="resource-add" @click.stop="createResource(item)">mdi-plus</v-icon>
        </template>
      </v-treeview>
    </v-card>

    <v-card style="margin-top:16px;">
      <v-card-text>
        <h3>Особые разделы</h3>
        <div>
          <router-link to="/cms/photoarchive">Фотоархив</router-link>
        </div>
      </v-card-text>
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
  data: () => ({
    search: null,
    caseSensitive: false
  }),
  computed: {
    ...mapState({
      sections: state => state.sections
    }),
    parentsTree() {
      // Копируем секции в отдельный объект
      let data = JSON.parse(JSON.stringify(this.sections));

      // Сортируем секции по названию
      data.sort(compare);

      let tree = (function(array) {
        let result = [];
        let o = { _: result }; // Объект, используемый в качестве первого аргумента при первом вызове функции callback в reduce

        array
          .filter(item => item.fullpath)
          .forEach(function(a) {
            // Разделяем текстовый путь секции на части
            let splitted = a.fullpath.split("/");

            // Обработка случая, когда последний элемент - слеш. Нужно для корректного отображения родительских страниц
            // Удаляется лишний элемент массива
            splitted.forEach((node, n) => {
              if (n > 0 && node === "") splitted.splice(n, 1);
            });

            let max = splitted.length - 1;

            // Собираем древовидный объект
            splitted.reduce(function(r, b, index) {
              if (!r[b]) {
                r[b] = { _: [] };

                let obj = { name: b, children: r[b]._ };

                if (max === index) {
                  obj.id = a._id; // Уникальный идентификатор
                  obj.name = a.title; // Название раздела
                  obj.fullpath = a.fullpath; // Ссылка на раздел
                }

                r._.push(obj);
              }
              return r[b];
            }, o);
          });
        return result;
      })(data);

      // Удаляем первый (пустой) элемент и возвращаем древовидный объект
      return tree[0].children;
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
        this.$router.push(`/cms/${item.fullpath}`);
      }
    },
    createResource(item) {
      let path = `/cms${item.fullpath}`;
      console.log(path);
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
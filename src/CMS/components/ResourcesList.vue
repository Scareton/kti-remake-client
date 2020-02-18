<template>
  <div>
    <h3>Список ресурсов</h3>
    <div class="resources-list">
      <router-link class="resources-item" v-for="item in items" :key="item._id" :to="`/cms${item.fullpath}`">{{item.title}}</router-link>
    </div>
    <div class="resources-list-buttons">
      <v-btn small color="primary" @click="createResource">Создать ресурс</v-btn>
    </div>
  </div>
</template>

<script>
export default {
  name: "ResourcesList",
  props: ["items", "section"],
  data: () => ({}),
  methods: {
    createResource() {
      // Для создания ресурса переходим к текущему разделу (Убираем выбранный пост из пути)
      // TODO Учитывать слеш в конце пути
      let path = this.$route.path.replace(/(\w+)$/, "");
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
.resources-list {
  display: flex;
  flex-direction: column;
}
.resources-item {
  flex: 1;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.resources-list-buttons {
  margin-top: 12px;
}
</style>
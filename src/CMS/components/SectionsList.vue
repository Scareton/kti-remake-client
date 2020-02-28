<template>
  <div class="sections-list">
    <h3>Особые разделы</h3>
    <div>
      <router-link to="/cms/photoarchive">Фотоархив</router-link>
    </div>
    <h3>Список разделов</h3>
    <div v-for="(item, index) in sections" :key="index">
      <router-link :to="`/cms${item}`">{{item}}</router-link>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState({
      sections: state => state.sections
    })
  },
  filters: {
    cmsPath(path) {
      return `/cms/${path}`;
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
</style>
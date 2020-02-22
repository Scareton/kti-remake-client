<template>
  <div class="posts">
    <v-container>
      <v-row>
        <v-col cols="2">
          <navigation-menu :items="siblings"></navigation-menu>
        </v-col>
        <v-col cols="10">
          <div class="article" v-if="post" v-html="post.content"></div>
          <div class="post-forms" v-if="post && post.forms">
            <div class="post-form" v-for="(form, index) in post.forms" :key="index">
              <template v-if="form === 'CallbackForm'">
                <callback-form></callback-form>
              </template>
            </div>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
// TODO Добавить фотогалерею в cms
import PostsService from "@/services/PostsService";
export default {
  components: {
    NavigationMenu: () => import("../components/navigation/NavigationMenu"),
    CallbackForm: () => import("../components/forms/CallbackForm")
  },
  data: () => ({
    post: null,
    siblings: null
  }),
  methods: {
    /**
     * Запросить пост и его соседние посты с сервера
     */
    getPost() {
      let path = this.$route.path;
      // TODO Есть неожиданная реакция на наличие\отсутствие слеша в конце строки
      PostsService.getPost(path).then(response => {
        // Полученная страница
        this.post = response.data.post;
        // Полученные соседи
        this.siblings = response.data.posts;
      });
    }
  },
  watch: {
    $route: {
      handler() {
        // При изменении адреса запрашиваем посты заново
        this.getPost();
      },
      // Запросить посты при первом открытии страницы
      immediate: true
    }
  }
};
</script>

<style>
.article img {
  max-width: 100%;
  width:100%;
  height: 100%;
  object-fit: contain;
  padding: 12px;
}
.post-forms {
  margin-top: 32px;
}
.post-form {
  padding: 16px;
  box-shadow: 0 0 4px 1px rgba(0, 0, 0, 0.12);
}
</style>
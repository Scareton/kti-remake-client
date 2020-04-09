<template>
  <div class="posts">
    <v-container>
      <v-row>
        <v-col cols="2" style="min-width:324px;">
          <!-- <navigation-menu :items="siblings"></navigation-menu> -->
          <sections-list :items="siblings"></sections-list>
        </v-col>
        <v-col>
          <v-card style="padding: 16px;" v-if="post">
            <h1 style="line-height:1.2;font-size:1.8em">{{post.title}}</h1>

            <!-- <v-divider style="margin:12px 0;" /> -->
            <img v-if="post.cover" :src="`${SERVER}${post.cover}`" style="margin-bottom:12px;margin-top:12px;" />
            <div class="article" v-html="post.content"></div>
            <div class="post-forms" v-if="post && post.forms && post.forms[0]">
              <div class="post-form" v-for="(form, index) in post.forms" :key="index">
                <template v-if="form === 'CallbackForm'">
                  <callback-form></callback-form>
                </template>
              </div>
            </div>
          </v-card>
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
    CallbackForm: () => import("../components/forms/CallbackForm"),
    SectionsList: () => import("../components/SectionsList")
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
        this.post = response.data.post[0];
        document.title = this.post.title;
      });
    },
    getChilds() {
      let path = this.GlobalMethods.url_dirName(this.$route.path);

      PostsService.getChilds(path).then(response => {
        this.siblings = response.data.posts;
      });
    }
  },
  watch: {
    $route: {
      handler() {
        // При изменении адреса запрашиваем посты заново
        this.getPost();
        this.getChilds();
      },
      // Запросить посты при первом открытии страницы
      immediate: true
    }
  }
};
</script>

<style>
img {
  max-width: 100%;
}
iframe {
  max-width: 100%;
  width: 100%;
  border: none;
}
.article img {
  max-width: 100%;
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

@media (max-width: 768px) {
  .col {
    flex: 1 1 100%;
    max-width: 100%;
  }
  .row {
    flex-direction: row-reverse;
  }
  .row .col:last-child {
    order: 1;
  }
  .row .col:first-child {
    order: 2;
  }
}
</style>
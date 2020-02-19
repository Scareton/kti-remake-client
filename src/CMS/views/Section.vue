<template>
  <div>
    <v-row>
      <v-col cols="2">
        <sections-list />
        <resources-list :items="siblings" />
      </v-col>
      <v-col cols="10">
        <div v-if="post" class="cms_post">
          <v-text-field label="Заголовок документа" v-model="post.title"></v-text-field>
          <v-text-field label="Alias документа" v-model="post.alias"></v-text-field>
          <v-text-field label="Родитель документа" v-model="post.path"></v-text-field>
          <v-text-field label="Ссылка на документ" v-model="post.fullpath" readonly></v-text-field>
          <v-text-field label="Раздел новости" v-model="post.tag"></v-text-field>
          <v-textarea label="Описание документа (Краткое превью)" v-model="post.description"></v-textarea>
          <div style="color: rgba(0, 0, 0, 0.6); font-size: 13px;">Содержание документа:</div>
          <editor
            :init="{
              height: 500,
              language: 'ru', language_url: '/tinymce/langs/ru.js',
              external_plugins: {
                'code': '/tinymce/plugins/code/plugin.min.js'
              },
           }"
            v-model="post.content"
          ></editor>
          <div class="cms_post-actions">
            <v-btn v-if="mode === 'create'" @click="(e) => createResource(e, post)">Создать ресурс</v-btn>
            <v-btn v-if="mode === 'edit'" @click="(e) => updateResource(e, post)">Сохранить ресурс</v-btn>
          </div>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
// TODO Добавить функцию транслитезации названия статьи для генерации alias
import PostsService from "@/services/PostsService";
import "tinymce/tinymce";
import "tinymce/themes/silver";
export default {
  components: {
    SectionsList: () => import("@/CMS/components/SectionsList"),
    ResourcesList: () => import("@/CMS/components/ResourcesList"),
    Editor: () => import("@tinymce/tinymce-vue")
  },
  data: () => ({
    posts: Array,
    post: null,
    siblings: null,
    mode: null
  }),
  methods: {
    createResource(e, doc) {
      // Получаем путь к странице без префикса cms
      let path = this.$route.path.replace(/^(\/cms\/)/, "");
      PostsService.createPost(path, this.post).then(response => {
        // Если ответ положительный
        if (response.data.success) {
          // Переходим по ссылке на созданный документ в cms
          this.$router.replace({path: `/cms${this.post.fullpath}`})
        }
      });
    },
    updateResource(e, doc) {
      // Получаем путь к странице без префикса cms
      let path = this.$route.path.replace(/^(\/cms\/)/, "");

      // Запрашиваем обновление документа у сервера 
      PostsService.updatePost(path, this.post).then(response => {
        // Если в ответе есть обновлённый документ
        if (response.data.post) {
          // Если адрес документа изменился, переходим по новой ссылке
          if (response.data.post.fullpath !== path) this.$router.replace({path: `/cms${response.data.post.fullpath}`})
        }
      });
    }
  },
  watch: {
    $route: {
      handler(value) {
        // Получаем путь к странице без префикса cms
        let path = value.path.replace(/^(\/cms\/)/, "");
        // Если true - обновляем состояние на выбранный пост из базы
        let needToSetPost = true;

        // Обработка параметров url
        if (value.query) {
          // Обработка создания документа
          if (value.query.mode === "create") {
            this.mode = "create";
            this.post = new Object({
              title: "",
              content: ""
            });

            // Помечаем, что документ, полученный из бызы, не нужно помечать активным 
            needToSetPost = false;
          }
        }

        // Получаем документы из базы
        PostsService.getPost(path).then(response => {
          // Обнуляем массив соседей
          this.siblings = null;
          this.siblings = response.data.posts;

          // Если флаг активен, помечаем документ, полученный из базы, активным
          if (needToSetPost) {
            this.mode = null;
            this.post = null;
            if (response.data.post) {
              this.post = response.data.post;
              // И отмечаем, что документ редактируется
              this.mode = "edit";
            }
          }
        });
      },
      immediate: true
    },
    'post': {
      // Отслеживаем изменения в документе и обновляем поля
      handler(value) {
        // Полный путь к документу вычисляется при сложении пути к родителю и alias
        this.$set(this.post, 'fullpath', value.path + value.alias);
      },
      deep: true
    }
  }
};
</script>

<style>
@import url("/tinymce/skins/ui/oxide/skin.min.css");
@import url("/tinymce/skins/ui/oxide/content.min.css");
@import url("/tinymce/skins/content/default/content.min.css");

.cms_post-actions {
  margin: 12px -6px;
}
.cms_post-actions .v-btn {
  margin: 0 6px;
}
.cms_post .v-textarea textarea {
  height: 50px;
}
</style>
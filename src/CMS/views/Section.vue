<template>
  <div>
    <v-row>
      <v-col cols="2">
        <sections-list />
        <resources-list :items="siblings" />
      </v-col>
      <v-col cols="10">
        <div v-if="post" class="cms_post">
          <v-text-field label="Заголовок документа" v-model="post.title" :counter="80"></v-text-field>

          <v-row>
            <v-col>
              <v-text-field label="Alias документа" v-model="post.alias" :rules="[rules.aliasCounter, rules.alias]">
                <template v-slot:append>
                  <v-tooltip bottom>
                    <template v-slot:activator="{on}">
                      <v-icon v-on="on" @click="reloadAlias">mdi-reload</v-icon>
                    </template>
                    <span>Сгенерировать alias</span>
                  </v-tooltip>
                </template>
              </v-text-field>
            </v-col>

            <v-col>
              <v-select :items="sections" label="Родитель документа" v-model="post.path"></v-select>
            </v-col>

            <v-col>
              <v-tooltip bottom>
                <template v-slot:activator="{on}">
                  <v-text-field v-on="on" label="Ссылка на документ" v-model="post.fullpath" readonly></v-text-field>
                </template>
                <div>
                  <span>Формируется на основе полей&nbsp;</span>
                  <strong>alias</strong> и
                  <strong>родитель</strong>
                </div>
                <div>
                  <i>Не изменяется вручную</i>
                </div>
              </v-tooltip>
            </v-col>
          </v-row>

          <div v-if="post.path === '/news/'">
            <v-row>
              <v-col>
                <v-file-input @change="postCoverLoaded" v-model="uploadedCoverFile" :rules="rules.image" accept="image/png, image/jpeg, image/bmp" placeholder="Загрузите обложку для новости" prepend-icon="mdi-camera" label="Обложка"></v-file-input>
                <div v-if="postCover" style="max-width:260px;">
                  <v-img :src="postCover" />
                </div>
              </v-col>
              <v-col>
                <v-select :items="tags" label="Раздел новости" v-model="post.tag"></v-select>
              </v-col>
              <v-col v-if="post.tag">
                <v-combobox :items="subtags" label="Подраздел новости" :search-input.sync="post.subtag"></v-combobox>
              </v-col>
            </v-row>
            <v-textarea label="Описание документа (Краткое превью)" v-model="post.description"></v-textarea>
          </div>

          <div style="color: rgba(0, 0, 0, 0.6); font-size: 13px;">Содержание документа:</div>

          <editor :init="tinymceinit" v-model="post.content"></editor>

          <div class="d-flex systemButtons">
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <v-checkbox v-on="on" v-model="post.visible" label="Видимость в меню"></v-checkbox>
              </template>
              <span>Видимость документа в меню (Например, в подвале сайта)</span>
            </v-tooltip>

            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <v-checkbox v-on="on" v-model="post.published" label="Опубликовано"></v-checkbox>
              </template>
              <span>Неопубликованные ресурсы не видны обычным пользователям, но доступны для просмотра и редактирования в CMS</span>
            </v-tooltip>
          </div>

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
// TODO Проверка длины title и alias на сервере
import PostsService from "@/services/PostsService";
import { transliterate as tr, slugify } from "transliteration";
import "tinymce/tinymce";
import "tinymce/themes/silver";
import { mapState } from "vuex";
export default {
  components: {
    SectionsList: () => import("@/CMS/components/SectionsList"),
    ResourcesList: () => import("@/CMS/components/ResourcesList"),
    Editor: () => import("@tinymce/tinymce-vue")
  },
  data: () => ({
    posts: Array,
    post: null,
    postCover: null,
    uploadedCoverFile: null,
    siblings: null,
    mode: null,
    tags: [
      "Институт",
      "Студенческая жизнь",
      "Спорт",
      "Наука",
      "Трудоустройство"
    ], // TODO Получать теги с сервера?
    subtags: [
      "Информация профбюро студентов",
      "Информация",
      "КВН",
      "Важная информация",
      "Праздник",
      "Конкурс",
      "Наши достижения",
      "Культура",
      "Мероприятие",
      "Волонтёры победы",
      "Студенческое телевидение",
      "Молодёжная политика"
    ],
    rules: {
      alias: value => {
        const pattern = /^(?! )(?!.* $)[a-z0-9 -]*/;
        return pattern.test(value) || "Неверный формат";
      },
      aliasCounter: value => value.length <= 80 || "Максимум 80 символов",
      image: [
        value =>
          !value ||
          value.size < 2097152 ||
          "Изображение должно быть меньше 2 мегабайт!"
      ]
    }
  }),
  computed: {
    ...mapState({
      sections: state => state.sections
    }),
    tinymceinit() {
      return {
        height: 500,
        browser_spellcheck: true,
        language: "ru",
        language_url: "/tinymce/langs/ru.js",
        external_plugins: {
          code: "/tinymce/plugins/code/plugin.min.js",
          image: "/tinymce/plugins/image/plugin.min.js",
          media: "/tinymce/plugins/media/plugin.min.js",
        },
        media_live_embeds: true,
        style_formats: [
          {
            title: "Изображение слева 40%",
            selector: "img",
            styles: {
              float: "left",
              padding: "0 10px 0 0",
              width: '40%',
            }
          },
          {
            title: "Изображение справа 40%",
            selector: "img",
            styles: {
              float: "right",
              padding: "0 0 0 10px",
              width: '40%',
            }
          },
          {
            title: "Изображение слева 50%",
            selector: "img",
            styles: {
              float: "left",
              padding: "0 10px 0 0",
              width: '50%',
            }
          },
          {
            title: "Изображение справа 50%",
            selector: "img",
            styles: {
              float: "right",
              padding: "0 0 0 10px",
              width: '50%',
            }
          }
        ],
        content_style: '*, ::before, ::after {-webkit-box-sizing: inherit;box-sizing: inherit;} html {box-sizing: border-box;} img {max-width: 100%; height: 100%; object-fit: cover;}',
        // toolbar: 'undo redo | link image | code',
        images_upload_handler: (blobInfo, success, failure) => {
          var xhr, formData;

          xhr = new XMLHttpRequest();
          xhr.withCredentials = false;
          xhr.open("POST", "http://localhost:8081/loadimage");

          xhr.onload = () => {
            var json;

            if (xhr.status != 200) {
              failure("HTTP Error: " + xhr.status);
              return;
            }

            json = JSON.parse(xhr.responseText);

            if (!json || typeof json.location != "string") {
              failure("Invalid JSON: " + xhr.responseText);
              return;
            }

            success("http:\\\\localhost:8081\\" + json.location);
            // success(json.location);
            this.post.images.push(json.location);
          };

          formData = new FormData();
          formData.append("file", blobInfo.blob(), blobInfo.filename());

          xhr.send(formData);
        }
      };
    }
  },
  methods: {
    createResource(e, doc) {
      let formdata = new FormData();
      for (var key in doc) {
        formdata.append(key, doc[key]);
      }
      // Получаем путь к странице без префикса cms
      let path = this.$route.path.replace(/^(\/cms\/)/, "");
      PostsService.createPost(path, formdata).then(response => {
        // Если ответ положительный
        if (response.data.success) {
          // Переходим по ссылке на созданный документ в cms
          this.$router.replace({ path: `/cms${response.data.post.fullpath}` });
        }
      });
    },
    updateResource(e, doc) {
      let formdata = new FormData();
      for (var key in doc) {
        formdata.append(key, doc[key]);
      }
      // Получаем путь к странице без префикса cms
      let path = this.$route.path.replace(/^(\/cms\/)/, "");

      // Запрашиваем обновление документа у сервера
      PostsService.updatePost(path, formdata).then(response => {
        // Если в ответе есть обновлённый документ
        if (response.data.post) {
          // Если адрес документа изменился, переходим по новой ссылке
          if (response.data.post.fullpath !== path)
            this.$router.replace({
              path: `/cms${response.data.post.fullpath}`
            });
        }
      });
    },
    postCoverLoaded(file) {
      this.post.cover = file;
      if (FileReader && file) {
        var fr = new FileReader();
        fr.onload = () => {
          this.postCover = fr.result;
        };
        fr.readAsDataURL(file);
      }
    },
    /**
     * Сгенерировать alias на основе title
     */
    reloadAlias() {
      this.$set(this.post, "alias", slugify(this.post.title));
    }
  },
  watch: {
    $route: {
      handler(value) {
        // Обнуляем обложку
        this.uploadedCoverFile = null;
        this.postCover = null;
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
              content: "",
              path: "/" + path,
              alias: "",
              aliasGen: false,
              visible: false,
              published: true,
              subtag: null,
              images: []
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
              this.post.images = [];

              if (response.data.post.cover) {
                // Получаем обложку новости и добавляем к ней адрес сервера
                this.postCover = `${this.SERVER}${response.data.post.cover}`;
              }
              // И отмечаем, что документ редактируется
              this.mode = "edit";
            }
          }
        });
      },
      immediate: true
    },
    post: {
      // Отслеживаем изменения в документе и обновляем поля
      handler(value) {
        // Полный путь к документу вычисляется при сложении пути к родителю и alias
        this.$set(this.post, "fullpath", value.path + value.alias);
        // Alias заполняется транслитизированным title
        if (this.mode === "create") {
          this.$set(this.post, "alias", slugify(this.post.title));
        }
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
.cms_post .systemButtons {
  margin: 16px -12px 0 -12px;
}
.cms_post .systemButtons > .v-input {
  margin: 0 12px;
}
</style>
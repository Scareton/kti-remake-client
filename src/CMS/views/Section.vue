<template>
  <div>
    <v-card v-if="post" class="cms-post_post">
      <v-card-title>
        <template v-if="mode === 'create'">Создание документа</template>
        <template v-else>Редактирование документа</template>
      </v-card-title>
      <v-divider />
      <v-card-text>
        <v-row>
          <v-col>
            <v-text-field label="Заголовок документа" v-model="post.title" @input="titleChanged" :counter="80"></v-text-field>
          </v-col>
          <v-col>
            <v-text-field label="Alias документа" v-model="post.alias" @input="aliasChanged" :rules="[rules.aliasCounter, rules.alias]">
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
        </v-row>
        <v-row>
          <v-col>
            <v-text-field :items="sections" disabled label="Родитель документа" v-model="post.path"></v-text-field>
            <!-- <v-treeview :items="parentsTree"></v-treeview> -->
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
            <span>Неопубликованные ресурсы не видны обычным пользователям, но доступны для просмотра и редактирования в cms-post</span>
          </v-tooltip>
        </div>

        <div class="cms-post_post-actions">
          <v-btn v-if="mode === 'create'" @click="(e) => createResource(e, post)">Создать ресурс</v-btn>
          <v-btn v-if="mode === 'edit'" @click="(e) => updateResource(e, post)">Сохранить ресурс</v-btn>
          <v-btn v-if="mode === 'edit'" @click="postToRemove = post; removePost = true;" color="red darken-1" style="color:#fff">Удалить ресурс</v-btn>
        </div>
      </v-card-text>
    </v-card>

    <!-- Диалог удаления документа -->
    <v-dialog width="unset" v-model="removePost">
      <v-card>
        <v-card-title>Удаление документа</v-card-title>
        <v-divider />
        <div style="padding:16px;">Вы действительно хотите удалить документ?</div>
        <v-divider />
        <v-card-actions>
          <v-btn text color="red darken-1" style="color:#fff;" @click="removeResource(postToRemove)">Удалить</v-btn>
          <v-btn text @click="removePost = false">Отмена</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
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
    Editor: () => import("@tinymce/tinymce-vue")
    // AliasField: () => import("../components/AliasField")
  },
  data: () => ({
    removePost: false,
    postToRemove: null,
    posts: Array,
    post: null,
    postCover: null,
    uploadedCoverFile: null,
    siblings: null,
    parentsTree: [],
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
          media: "/tinymce/plugins/media/plugin.min.js"
        },
        media_live_embeds: true,
        style_formats: [
          {
            title: "Изображение слева 40%",
            selector: "img",
            styles: {
              float: "left",
              padding: "0 10px 0 0",
              width: "40%"
            }
          },
          {
            title: "Изображение справа 40%",
            selector: "img",
            styles: {
              float: "right",
              padding: "0 0 0 10px",
              width: "40%"
            }
          },
          {
            title: "Изображение слева 50%",
            selector: "img",
            styles: {
              float: "left",
              padding: "0 10px 0 0",
              width: "50%"
            }
          },
          {
            title: "Изображение справа 50%",
            selector: "img",
            styles: {
              float: "right",
              padding: "0 0 0 10px",
              width: "50%"
            }
          }
        ],
        content_style:
          "*, ::before, ::after {-webkit-box-sizing: inherit;box-sizing: inherit;} html {box-sizing: border-box;} img {max-width: 100%; height: 100%; object-fit: cover;}",
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
      this.$store.commit("OPEN_loader");
      let formdata = new FormData();
      for (var key in doc) {
        formdata.append(key, doc[key]);
      }
      let path = this.post.fullpath;
      PostsService.createPost(path, formdata)
        .then(response => {
          this.$store.commit("CLOSE_loader");
          // Если ответ положительный
          // Обновляем дерево документов
          this.$store.dispatch("SET_sections");
          // Переходим по ссылке на созданный документ в cms-post
          this.$router.replace({
            path: `/cms-post${response.data.fullpath}`
          });
          this.$store.commit(
            "OPEN_snackbar_success",
            "Документ успешно создан"
          );
        })
        .catch(err => {
          this.$store.commit("CLOSE_loader");
          this.$store.commit("OPEN_snackbar_error", err);
        });
    },
    updateResource(e, doc) {
      let formdata = new FormData();
      for (var key in doc) {
        formdata.append(key, doc[key]);
      }

      // Запрашиваем обновление документа у сервера
      PostsService.updatePost(formdata).then(response => {
        // Если в ответе есть обновлённый документ
        if (response.data.post) {
          // Обновляем дерево документов
          this.$store.dispatch("SET_sections");
          // Если адрес документа изменился, переходим по новой ссылке
          if (response.data.post.fullpath !== path)
            this.$router.replace({
              path: `/cms-post${response.data.post.fullpath}`
            });
        }
      });
    },
    removeResource(doc) {
      // Получаем путь к странице без префикса cms-post
      let _id = this.post._id;
      this.$store.commit("OPEN_loader");
      PostsService.removePost(_id).then(response => {
        this.$store.commit("CLOSE_loader");
        if (response.data.success) {
          this.$router.push("/cms");
          this.postToRemove = null;
          this.removePost = false;
          this.$store.commit(
            "OPEN_snackbar_success",
            "Документ успешно перемещён в архив"
          );
        } else {
          this.$store.commit(
            "OPEN_snackbar_error",
            "Произошла ошибка при удалении документа"
          );
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
    },
    titleChanged(value) {
      this.$set(this.post, "alias", slugify(this.post.title));
    },
    aliasChanged(value) {
      this.$set(this.post, "alias", slugify(value));
    }
  },
  watch: {
    $route: {
      handler(value) {
        // Обнуляем обложку
        this.uploadedCoverFile = null;
        this.postCover = null;
        // Получаем путь к странице без префикса cms-post
        let path = value.path.replace(/^(\/cms-post\/)/, "/");
        // Если true - обновляем состояние на выбранный пост из базы
        let needToSetPost = true;

        // Обработка параметров url
        if (value.query) {
          // Обработка создания документа
          if (value.query.mode === "create") {
            this.mode = "create";
            if (path !== "/") path = "/" + path;
            this.post = new Object({
              title: "",
              content: "",
              path: path,
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
              this.post = response.data.post[0];
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
        console.log(value._id);
        // Полный путь к документу вычисляется при сложении пути к родителю и alias
        if (value.path[value.path.length - 1] !== "/") value.path += "/";

        this.$set(
          this.post,
          "fullpath",
          this.GlobalMethods.url_checkSlash(value.path + value.alias)
        );
        // Alias заполняется транслитизированным title
        if (this.mode === "create") {
          // this.$set(this.post, "alias", slugify(this.post.title));
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

.cms-post_post-actions {
  margin: 12px -6px;
}
.cms-post_post-actions .v-btn {
  margin: 0 6px;
}
.cms-post_post .v-textarea textarea {
  height: 50px;
}
.cms-post_post .systemButtons {
  margin: 16px -12px 0 -12px;
}
.cms-post_post .systemButtons > .v-input {
  margin: 0 12px;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.1s ease;
}
.fade-enter, .fade-leave-to
/* .component-fade-leave-active до версии 2.1.8 */ {
  opacity: 0;
}
</style>
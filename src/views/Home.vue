<template>
  <div class="home">
    <slider-news></slider-news>
    <v-container>
      <v-row class="home-grid">
        <v-col :cols="width < 769 ? (width < 600 ? '12' : '8') : '9'" class="home-news">
          <news-snippet></news-snippet>
        </v-col>
        <v-col :cols="width < 769 ? (width < 600 ? '12' : '4') : '3'" class="home-links">
          <home-side></home-side>
        </v-col>
      </v-row>
    </v-container>

    <v-dialog max-width="1000px" v-model="homeDialog">
      <v-card>
        <v-card-title>Информация о сайте</v-card-title>

        <v-divider />

        <v-row class="ma-0 hello-dialog--row">
          <v-col class="pa-0">
            <v-list>
              <v-subheader class="title">Технологии</v-subheader>
              <v-list-item @click="openLink('https://ru.vuejs.org/')">
                <v-list-item-icon>
                  <img src="icons/vue.png" />
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>Vue.js</v-list-item-title>
                  <v-list-item-subtitle>JavaScript фреймворк</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>

              <v-list-item @click="openLink('https://vuetifyjs.com/ru/')">
                <v-list-item-icon>
                  <img src="icons/vuetify.png" />
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>Vuetify</v-list-item-title>
                  <v-list-item-subtitle>Material Design дизайн-система для vue.js приложений</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>

              <v-list-item @click="openLink('https://nodejs.org/en/')">
                <v-list-item-icon>
                  <img src="icons/node.png" />
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>Node.js</v-list-item-title>
                  <v-list-item-subtitle>Среда выполнения JavaScript на стороне сервера</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>

              <v-list-item @click="openLink('https://expressjs.com/ru/')">
                <v-list-item-icon>
                  <img src="icons/express.png" />
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>Express</v-list-item-title>
                  <v-list-item-subtitle>Фреймворк для приложений Node.js</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>

              <v-list-item @click="openLink('https://www.mongodb.com/')">
                <v-list-item-icon>
                  <img src="icons/mongo.png" />
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>MongoDB</v-list-item-title>
                  <v-list-item-subtitle>NoSQL система управления базами данных</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-list>
            <v-divider />
            <v-list>
              <v-subheader class="title">GitHub репозитории</v-subheader>
              <v-list-item @click="openLink('https://github.com/Scareton/kti-remake-client')">
                <v-list-item-icon>
                  <img src="icons/github32.png" />
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>Клиент</v-list-item-title>
                  <v-list-item-subtitle>Scareton/kti-remake-client</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>

              <v-list-item @click="openLink('https://github.com/Scareton/kti-remake-server')">
                <v-list-item-icon>
                  <img src="icons/github32.png" />
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>Сервер</v-list-item-title>
                  <v-list-item-subtitle>Scareton/kti-remake-server</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-col>
          <v-divider vertical />
          <v-col class="pa-0 pt-2">
            <v-subheader class="title">Описание</v-subheader>
            <div class="pa-4 pt-0">
              <p>Проект представляет из себя сайт КТИ, воссозданный с использованием современных технологий веб-разработки.</p>
              <p>
                Основной особенностью проекта является раздел
                <router-link to="/cms">/cms.&nbsp;</router-link>По данному адресу находится самописный компонент для управления контентом сайта.
              </p>
              <p>CMS позволяет создавать, редактировать и обновлять страницы и разделы сайта, а также управлять изображениями в альбомах и навигацией на главной странице.</p>
            </div>
          </v-col>
        </v-row>

        <v-divider />

        <v-card-actions style="justify-content: flex-end;">
          <v-btn text color="primary" @click="homeDialog = false;">Продолжить</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import SliderNews from "@/components/SliderNews";
import NewsSnippet from "@/components/NewsSnippet";
import HomeSide from "@/components/HomeSide";
export default {
  name: "Home",
  components: { SliderNews, NewsSnippet, HomeSide },
  data: () => ({
    width: window.innerWidth
  }),
  computed: {
    homeDialog: {
      get() {
        return this.$store.state.homeDialog;
      },
      set() {
        this.$store.commit("CHECK_homeDialog");
      }
    }
  },
  methods: {
    openLink(path) {
      window.open(path, "_blank");
    },
    updateWidth() {
      this.width = window.innerWidth;
    }
  },
  created() {
    window.addEventListener("resize", this.updateWidth);
  }
};
</script>

<style>
.hello-dialog--row .col {
  min-width: 470px;
}
@media (max-width: 959px) {
  .home-grid {
    margin: 0;
  }
}
@media (max-width: 768px) {
  .hello-dialog--row .col {
    min-width: unset;
    width: 100%;
  }
}
</style>

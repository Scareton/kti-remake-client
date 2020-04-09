<template>
  <div class="footer">
    <v-container>
      <v-row class="caption">
        <v-col :cols="width < 769 ? '12' : '3'" class>
          <p class="title">© 2004 — 2020</p>
          <p class="overline">403874 Волгоградская обл., г. Камышин, ул. Ленина 6а</p>
          <p>
            <span class>Информационное наполнение:</span>
            <br />
            <span class="overline">пресс–центр института</span>
          </p>
          <p>
            <span class>Информационное сопровождение:</span>
            <br />
            <span class="overline">информационный вычислительный центр</span>
          </p>
          <p>
            <router-link to>О сайте</router-link>
            <br />
            <router-link to>Карта сайта</router-link>
          </p>
          <p>
            По вопросам работы сайта обращайтесь:
            <br />
            <a href="mailto:webmaster@kti.ru" target="_blank">webmaster@kti.ru</a>
          </p>
          <p>
            Официальный почтовый адрес института:
            <br />
            <a href="mailto:kti@kti.ru">kti@kti.ru</a>
          </p>
        </v-col>
        <v-col :cols="width < 769 ? '12' : '9'">
          <v-row>
            <!-- Динамический вывод разделов. Разделы определяются в переменной sections -->
            <v-col class="psmallmg" v-for="(section, index) in sections" :key="index" :cols="width < 426 ? '12' : ''">
              <p class="title">{{section.name}}</p>
              <p v-for="(post, key) in section.posts" :key="key">
                <router-link :to="post.fullpath">{{post.title}}</router-link>
              </p>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import PostsService from "@/services/PostsService";
export default {
  data: () => ({
    sections: {
      education: {
        name: "Образование",
        path: "/education/",
        posts: []
      },
      about: {
        name: "Об институте",
        path: "/about/",
        posts: []
      },
      science: {
        name: "Наука",
        path: "/science/",
        posts: []
      }
    },
    width: window.innerWidth
  }),
  methods: {
    getPosts() {
      let sections = this.sections;
      for (const i in sections) {
        PostsService.getChilds(sections[i].path)
          .then(response => {
            this.$set(this.sections[i], "posts", response.data.posts);
          })
          .catch(err => {
            this.$store.commit(
              "OPEN_snackbar_error",
              "Произошла ошибка во время получения разделов. Попробуйте обновить страницу"
            );
          });
      }
    },
    updateWidth() {
      this.width = window.innerWidth;
    }
  },
  created() {
    this.getPosts();
    window.addEventListener("resize", this.updateWidth);
  }
};
</script>

<style>
.footer {
  background-color: #1976d2;
  color: #fff;
}
.v-application .footer a {
  color: #fff;
}
.v-application .psmallmg p {
  margin-bottom: 8px;
}
@media (max-width: 768px) {
}
</style>
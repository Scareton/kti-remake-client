<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-container class="container-header">
        <div class="d-flex align-center header-block" style="max-height:100%; height:100%;">
          <v-img alt="Логотип КТИ" class="shrink mr-2 logo" src="/logo.png" contain transition="scale-transition" max-height="100%" />
          <div class="brand">
            <div class="title" style="line-height: 1.5rem;">
              <router-link to="/">Камышинский технологический институт</router-link>
            </div>
            <div>
              <div class style="font-size:9px; color:rgba(255, 255, 255, 0.65);">
                (филиал) федерального государственного бюджетного
                образовательного учреждения высшего образования «Волгоградский
                государственный технический университет»
              </div>
            </div>
          </div>
        </div>

        <div class="d-flex align-center header-block">
          <div class="navigation">
            <router-link class="nav-link" to="/education/">Образование</router-link>
            <router-link class="nav-link" to="/about/">Об институте</router-link>
            <router-link class="nav-link" to="/science/">Наука</router-link>
          </div>
        </div>

        <div class="d-flex align-center header-block">
          <!-- TODO Рабочий поиск -->
          <v-text-field hide-details append-icon="mdi-magnify" single-line placeholder="Поиск..."></v-text-field>
        </div>
      </v-container>
    </v-app-bar>

    <v-content>
      <div class="app-body">
        <div class="app-content">
          <router-view></router-view>
        </div>
        <Footer></Footer>
      </div>
    </v-content>
  </v-app>
</template>

<script>
import Footer from "@/components/Footer";
export default {
  name: "App",
  components: { Footer },
  data: () => ({
    //
  }),
  methods: {},
  created() {
    this.$store.dispatch("SET_sections");
  }
};
</script>

<style>
body {
  margin:0 !important;
}
.app-body {
  height: 100%;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
}
.app-content {
  flex: 1;
}

.v-application header a {
  color: #fff;
  text-decoration: none;
}
.navigation .nav-link {
  padding: 0 6px;
  color: #fff;
  text-decoration: none;
}
.container.container-header {
  display: flex;
  padding: 0;
  max-height: 100%;
  height: 100%;
  justify-content: center;
}
.header-block {
  margin: auto 16px;
}
/* main page */
.brand {
  max-width: 500px;
}
.brand .caption {
  line-height: 12px;
}
/*  */

/* inner pages */
.router-block {
}
/*  */
</style>

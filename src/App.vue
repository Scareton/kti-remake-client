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
              <div class="slogan" style="font-size:9px; color:rgba(255, 255, 255, 0.65);">
                (филиал) федерального государственного бюджетного
                образовательного учреждения высшего образования «Волгоградский
                государственный технический университет»
              </div>
            </div>
          </div>
        </div>

        <div class="d-flex align-center header-block navigation-wrapper">
          <div class="navigation">
            <router-link class="nav-link" to="/education/">Образование</router-link>
            <router-link class="nav-link" to="/about/">Об институте</router-link>
            <router-link class="nav-link" to="/science/">Наука</router-link>
          </div>
        </div>

        <div class="d-flex align-center header-block search-block">
          <v-autocomplete v-model="select" @change="searchSelected" :loading="loading" :items="items" :search-input.sync="search" cache-items single-line hide-no-data hide-details label="Поиск..."></v-autocomplete>
          <!-- <v-text-field hide-details append-icon="mdi-magnify" single-line placeholder="Поиск..."></v-text-field> -->
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

    <!-- Всплывающее окно для ошибок -->
    <v-snackbar v-model="snackbar.display" :color="snackbar.color">
      <span :class="snackbar.textColor">
        <template v-if="snackbar.message">{{snackbar.message}}</template>
        <template v-else>Неизвестная ошибка</template>
      </span>
      <v-btn text dark @click="snackbar = false">Закрыть</v-btn>
    </v-snackbar>

    <!-- Глобальный лоадер -->
    <v-overlay :value="loader" z-index="2000">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
  </v-app>
</template>

<script>
import PostsService from "./services/PostsService";
import Footer from "@/components/Footer";
export default {
  name: "App",
  components: { Footer },
  data: () => ({
    loading: false,
    items: [],
    search: null,
    select: null
  }),
  computed: {
    snackbar: {
      get() {
        return this.$store.state.system.snackbar;
      },
      set() {
        this.$store.commit("CLOSE_snackbar");
      }
    },
    loader: {
      get() {
        return this.$store.state.system.loader;
      },
      set() {
        this.$store.commit("CLOSE_loader");
      }
    }
  },
  methods: {
    querySelections(v) {
      this.loading = true;
      PostsService.search(v).then(response => {
        if (response.data.posts) {
          this.loading = false;
          this.items = response.data.posts.map(item => {
            return {value: item.fullpath, text: item.title}
          });
        } else {
          this.loading = false;
          this.items = [];
        }
      });
    },
    searchSelected(path) {
      this.$router.push(path)
    }
  },
  watch: {
    search(val) {
      val && val !== this.select && this.querySelections(val);
    }
  },
  created() {
    this.$store.dispatch("SET_sections");
  }
};
</script>

<style>
/* Transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
/*  */
body {
  margin: 0 !important;
}
.app-body {
  height: 100%;
  display: flex;
  flex-direction: column;
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

.v-application h1 > a,
.v-application .v-subheader > a {
  color: inherit;
  text-decoration: none;
}
.v-application h1 > a:hover,
.v-application .v-subheader > a:hover {
  text-decoration: underline;
}

@media (max-width: 1263px) {
  .navigation {
    display: none;
  }
}
@media (max-width: 768px) {
  .brand .slogan {
    display: none;
  }
}
@media (max-width: 599px) {
  .container.container-header {
    flex-wrap: wrap;
  }
  .v-app-bar.v-app-bar--fixed {
    height: 96px !important;
  }
  .v-content {
    padding: 96px 0px 0px !important;
  }
}
@media (max-width: 425px) {
  .navigation-wrapper {
    margin: 0;
  }
  .search-block {
    width: 100%;
    margin-top: 11px;
  }
  .v-application .brand .title {
    font-size: 0.95rem !important;
    line-height: 1.2 !important;
  }
}
</style>

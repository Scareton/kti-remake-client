import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Камышинский технологический институт",
    component: Home
  },
  {
    path: "/about",
    name: "Об институте",
    component: () => import("../views/About.vue")
  },
  {
    path: "/news",
    name: "Новости",
    component: () => import("../views/News.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;

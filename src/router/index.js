import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: () => import("../views/EmptyRouterView.vue"),
    meta: { visible: false },
    children: [
      // Главная -----
      {
        path: "",
        name: "Камышинский технологический институт",
        component: () => import("../views/Home.vue"),
        meta: { visible: true }
      },
      // CMS
      {
        path: "/cms",
        name: "Система управления контентом КТИ",
        component: () => import("../CMS/views/CmsPage.vue"),
        meta: { visible: false, parent: true },
        children: [
          {
            path: "/cms",
            component: () => import("../CMS/views/Section.vue"),
          },
          {
            path: "/cms/create",
            name: "Создать ресурс",
            component: () => import("../CMS/views/Section.vue"),
            meta: {mode: "create"}
          },
          {
            path: "/cms/*",
            name: "Раздел",
            component: () => import("../CMS/views/Section.vue"),
          }
        ]
      },
      // Посты и статьи
      {
        path: "/*",
        component: () => import("../views/Post.vue"),
      },
      // Об институте -----
      // {
      //   path: "/about",
      //   name: "Об институте",
      //   component: () => import("../views/system/InnerPage.vue"),
      //   meta: { visible: true, parent: true },
      //   children: [
      //     {
      //       path: "/about",
      //       name: "Об институте",
      //       component: () => import("../views/about/about"),
      //     }
      //   ]
      // },
      // Новости -----
      // {
      //   path: "/news",
      //   name: "Новости",
      //   component: () => import("../views/News.vue"),
      //   meta: { visible: true },
      // },
      // Образование -----
      // {
      //   path: "/education",
      //   component: () => import("../views/system/InnerPage.vue"),
      //   meta: { visible: true, parent: true },
      //   name: "Образование",
      //   children: [
      //     {
      //       path: "/education",
      //       component: () => import("../views/education/Education.vue"),
      //       meta: { visible: true },
      //       name: "Образование",
      //     },
      //     {
      //       path: '/education/higher',
      //       name: "Высшее образование",
      //       meta: { visible: true },
      //       component: () => import("../views/education/Highter.vue"),
      //     },
      //     {
      //       path: '/education/secondary-professional',
      //       name: "Среднее профессиональное образование",
      //       meta: { visible: true },
      //       component: () => import("../views/education/SecondaryProfessional.vue"),
      //     },
      //     {
      //       path: '/education/second-higher',
      //       name: "Второе высшее образование",
      //       meta: { visible: true },
      //       component: () => import("../views/education/SecondHigher.vue"),
      //     },
      //     {
      //       path: '/education/recovery-and-translation',
      //       name: "Восстановление и перевод",
      //       meta: { visible: true },
      //       component: () => import("../views/education/RecoveryAndTranslation.vue"),
      //     },
      //     {
      //       path: '/education/it-school',
      //       name: "IT школа «Камышонок»",
      //       meta: { visible: true },
      //       component: () => import("../views/education/ItSchool.vue"),
      //     }
      //   ]
      // },
    ]
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
  scrollBehavior(to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
});

export default router;

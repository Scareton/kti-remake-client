import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: () => import("../views/EmptyRouterView.vue"),
    meta: { visible: false },
    children: [
      {
        // Главная 
        path: "",
        name: "Камышинский технологический институт",
        component: () => import("../views/Home.vue"),
        meta: { visible: true }
      },
      {
        // CMS
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
            path: "/cms/photoarchive",
            name: "Управление фотоархивом",
            component: () => import("../CMS/views/PhotoArchive.vue"),
            children: [
              {
                path: "/cms/photoarchive/:album",
                name: "Управление альбомом",
                component: () => import("../CMS/views/PhotoArchiveAlbum.vue"),
              },
            ]
          },
          {
            path: "/cms/links",
            name: "Управление ссылками",
            component: () => import("../CMS/views/Links.vue")
          },
          {
            path: "/cms-post/*",
            name: "Раздел",
            component: () => import("../CMS/views/Section.vue"),
          }
        ]
      },
      {
        // Фотогалерея
        path: "/photogallery",
        name: "Фотогалерея",
        component: () => import("../views/Photogallery.vue"),
        children: [
          {
            path: "/photogallery/:album",
            name: "Альбом",
            component: () => import("../views/PhotogalleryAlbum.vue")
          }
        ]
      },
      {
        // Посты и статьи
        path: "/*",
        component: () => import("../views/Post.vue"),
      },
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

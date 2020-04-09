import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
Vue.config.productionTip = false;

Vue.prototype.SERVER = 'http://23.111.202.163:8081/api/';

const GlobalMethods = {
  /**
   * Добавить слеш в конце строки, если его нет
   */
  url_checkSlash(path) {
    if (path[path.length - 1] !== "/") path += "/";
    return path;
  },  
  /**
   * Получить путь к родительской странице
   */
  url_dirName(path) {
    path = this.url_checkSlash(path);
    path = path.replace(/[^\/]*\/$/, "")
    return path;
  },
  install: function (Vue) {
    Object.defineProperty(Vue.prototype, 'GlobalMethods', {
      get() { return GlobalMethods }
    })
  }
}
Vue.use(GlobalMethods)

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
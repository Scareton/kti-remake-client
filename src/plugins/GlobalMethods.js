import Vue from 'vue'
export const GlobalMethods = {
  url_dirName(path) {
    if (path[path.length - 1] === "/") path.slice(0, -1);

  },
  install: function (Vue) {
    Object.defineProperty(Vue.prototype, 'GlobalMethods', {
      get() { return GlobalMethods }
    })
  }
}
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

function compare(a, b) {
  if (a.fullpath < b.fullpath) {
    return -1;
  }
  if (a.fullpath > b.fullpath) {
    return 1;
  }
  return 0;
}

/**
 * Построить древовидный объект из массива ссылок
 */
function buildTree(data) {
  // Сортируем секции по названию
  data.sort(compare);

  let tree = (function (array) {
    let result = [];
    let o = { _: result }; // Объект, используемый в качестве первого аргумента при первом вызове функции callback в reduce

    array
      .filter(item => item.fullpath)
      .forEach(function (a) {
        // Разделяем текстовый путь секции на части
        let splitted = a.fullpath.split("/");

        // Обработка случая, когда последний элемент - слеш. Нужно для корректного отображения родительских страниц
        // Удаляется лишний элемент массива
        splitted.forEach((node, n) => {
          if (n > 0 && node === "") splitted.splice(n, 1);
        });

        let max = splitted.length - 1;

        // Собираем древовидный объект
        splitted.reduce(function (r, b, index) {
          if (!r[b]) {
            r[b] = { _: [] };

            let obj = { name: b, children: r[b]._ };

            if (max === index) {
              obj.id = a._id; // Уникальный идентификатор
              obj.name = a.title; // Название раздела
              obj.fullpath = a.fullpath; // Ссылка на раздел
            }

            r._.push(obj);
          }
          return r[b];
        }, o);
      });
    return result;
  })(data);

  // Удаляем первый (пустой) элемент и возвращаем древовидный объект
  tree = tree[0].children;
  return tree;
}

// Работа с постами
import PostsService from "../services/PostsService";
async function getPosts() {
  const response = await PostsService.fetchPosts();
  if (response.data.posts) return response.data.posts;
}

function setFullPath(item) {
  let path = item.path;
  item.children.forEach(child => {
    child.path = `${path}/${child.path}`
    if (child.children && child.children.length > 0) {
      setFullPath(child);
    }
  });
}

export default new Vuex.Store({
  state: {
    posts: null,
    sections: null,
    sectionsTree: [],
    albums: [],

    // cms
    cms_albums: [],

    // global
    system: {
      snackbar: {
        display: false,
        message: null,
        color: "info",
        textClass: "white",
      },
      loader: false
    },

  },
  getters: {
    posts: state => {
      return posts.filter(post => post.section)
    },
    sectionsTree: state => {
      let data = JSON.parse(JSON.stringify(state.sections));
      return buildTree(data)
    },
    itemsTree: state => items => {
      let data = JSON.parse(JSON.stringify(items));
      return buildTree(data)
    }
  },
  mutations: {
    // Системные мутации
    OPEN_snackbar_error: (state, payload) => {
      // Сообщение с отрицательным сигналом \ ошибка
      state.system.snackbar = {
        message: payload,
        color: "red darken-4",
        textColor: "white--text",
        display: true,
      }
    },
    OPEN_snackbar_success: (state, payload) => {
      // Сообщение с положительным сигналом
      state.system.snackbar = {
        message: payload,
        color: "green darken-3",
        textColor: "white--text",
        display: true,
      }
    },
    OPEN_snackbar: (state, payload) => {
      // Сообщение с обычной информацией
      state.system.snackbar = {
        message: payload,
        color: "",
        textColor: "",
        display: true,
      }
    },
    CLOSE_snackbar: (state) => {
      // Закрыть сообщение
      state.system.snackbar = {
        message: null,
        color: "",
        textColor: "",
        display: false,
      }
    },
    OPEN_loader: (state) => {
      state.system.loader = true;
    },
    CLOSE_loader: (state) => {
      state.system.loader = false;
    },
    // ----- Системные мутации
    
    SET_sections(state, payload) {
      state.sections = payload;
    },
    SET_albums(state, payload) {
      state.albums = payload;
    },
    SET_cms_albums(state, payload) {
      state.cms_albums = payload;
    },
  },
  actions: {
    ADD_posts(context, path) {
      getPosts(path).then(posts => {
        console.log(posts)
      });
    },
    SET_sections(context) {
      PostsService.getSections().then(response => {
        context.commit('SET_sections', response.data.sections)
      })
    }
  },
  modules: {}
});

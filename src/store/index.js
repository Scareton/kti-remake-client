import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

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
    albums: [],

    // cms
    cms_albums: [],
  },
  getters: {
    posts: state => {
      return posts.filter(post => post.section)
    }
  },
  mutations: {
    SET_sections(state, payload) {
      state.sections = payload;
    },
    SET_albums(state, payload) {
      state.albums = payload;
    },
    SET_cms_albums(state, payload) {
      state.cms_albums = payload;
    }
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

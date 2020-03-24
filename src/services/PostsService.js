import api from "@/services/api";
export default {
  getPost(path) {
    return api().get(`${path}`)
  },
  getPostsOffset(path, offset, limit) {
    return api().get(`${path}?offset=${offset}&limit=${limit}`);
  },
  getPostsCount(path) {
    return api().get(`${path}?count=true`)
  },
  createPost(path, post) {
    return api().post(path, post);
  },
  updatePost(path, post) {
    return api().put(path, post);
  },
  removePost(path) {
    return api().delete(path)
  },
  getSections() {
    return api().get("sections")
  },
  getNavigation(sections) {
    return api().get(`/navigation?sections=${sections}`)
  }
};

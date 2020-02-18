import api from "@/services/api";
export default {
  fetchPosts() {
    return api().get("posts/");
  },
  getPost(path) {
    return api().get(`${path}`)
  },
  getPostsOffset(path, offset, limit) {
    return api().get(`${path}?offset=${offset}&limit=${limit}`);
  },
  createPost(path, post) {
    return api().post(path, post);
  },
  updatePost(path, post) {
    return api().put(path, post);
  },
  getSections() {
    return api().get("sections")
  }
};

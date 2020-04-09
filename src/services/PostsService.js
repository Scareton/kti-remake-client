import api from "@/services/api";
export default {
  getChilds(path, offset, limit) {
    return api().get(`post/childs?path=${path}&offset=${offset}&limit=${limit}`)
  },
  getPost(path) {
    return api().get(`post/get?path=${path}`)
  },
  getSections() {
    return api().get("sections")
  },
  updatePost(post) {
    return api().put("post/update/", post);
  },
  createPost(path, post) {
    return api().post(`post/create?path=${path}`, post);
  },
  removePost(_id) {
    return api().delete(`post/remove?_id=${_id}`)
  },
  search(search) {
    return api().get(`search?search=${search}`)
  },


  getPostsOffset(path, offset, limit) {
    return api().get(`${path}?offset=${offset}&limit=${limit}`);
  },
  getPostsCount(path) {
    return api().get(`${path}?count=true`)
  }, 

  getNavigation(sections) {
    return api().get(`/navigation?sections=${sections}`)
  }
};

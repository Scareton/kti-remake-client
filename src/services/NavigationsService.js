import api from "@/services/api";
export default {
  getNavigations() {
    return api().get('navigations')
  },
  getLinks(id) {
    return api().get(`navigations/${id}`)
  },
  saveLinks(id, links) {
    return api().post(`navigations/${id}`, links)
  }
};

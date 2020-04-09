import api from "@/services/api";
export default {
  getAlbums() {
    return api().get('photo/albums/')
  },
  getAlbumsPreviews() {
    return api().get('photo/albums-previews/')
  },
  getAlbumPhotos(path) {
    return api().get(`photo/albums/${path}`)
  },
  uploadAlbumPhotos(path, body) {
    return api().post(`photo/albums/${path}`, body)
  },
  removeAlbumPhoto(_id) {
    return api().delete(`photo/${_id}`)
  },
  updateAlbumPhoto(_id, data) {
    return api().put(`photo/${_id}`, data)    
  }
};

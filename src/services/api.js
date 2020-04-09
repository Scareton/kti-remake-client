import axios from "axios";
export default () => {
  return axios.create({
    baseURL: "http://23.111.202.163:8081/api"
  });
};

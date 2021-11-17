import axios from "axios";
const API = axios.create({
  baseURL: "https://api-find-talyer.herokuapp.com",
});

export default API
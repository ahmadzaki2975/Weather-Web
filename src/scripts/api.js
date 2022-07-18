import axios from "axios";

const baseURL = "https://ibnux.github.io/BMKG-importer/"

const weatherAPI = axios.create({
  baseURL: baseURL
});

export default weatherAPI;
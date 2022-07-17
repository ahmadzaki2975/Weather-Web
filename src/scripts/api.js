import axios from "axios";

const baseURL = "https://ibnux.github.io/BMKG-importer/"

export const weatherAPI = axios.create({
  baseURL: baseURL
});
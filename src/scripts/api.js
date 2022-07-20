import axios from "axios";

const baseUrlImporter = "https://ibnux.github.io/BMKG-importer/"

const weatherAPI = axios.create({
  baseURL: baseUrlImporter
});

export default weatherAPI;
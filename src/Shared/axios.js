import axios from "axios";

const config = {
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "text/plain",
  },
};

const initAxios = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  https: config,
  params: {
    api_key: "0b6263c836d6c7e96ad240968f0ad8ea",
  },
});

export default initAxios;

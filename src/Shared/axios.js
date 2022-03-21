import axios from "axios";

const initAxios = axios.create({
  baseURL: "https://ga-mobile-api.loklok.tv/cms/app",
  headers: {
    lang: "en",
    versioncode: "11",
    clienttype: "ios_jike_default",
  },
});

export default initAxios;

import axios from "axios";

class AxiosService {
  axios;
  axiosConfig;
  constructor() {
    this.axios = axios.create({
      baseURL: this.getBaseUrl(),
      https: this.getHttpsConfig(),
      params: {
        api_key: "0b6263c836d6c7e96ad240968f0ad8ea",
        language: "en-US",
      },
    });
  }

  getBaseUrl() {
    return "https://api.themoviedb.org/3";
  }

  getHttpsConfig() {
    return {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "text/plain",
      },
    };
  }

  addOption(config) {
    this.axiosConfig = {
      ...config,
    };
  }

  getMethod(uri, loading = true) {
    return this.handleFlow(this.axios.get(uri, this.axiosConfig), loading);
  }
  postMethod(uri, data, loading = true) {
    return this.handleFlow(
      this.axios.post(uri, this.axiosConfig, data),
      loading
    );
  }
  deleteMethod(uri, loading = true) {
    return this.handleFlow(this.axios.delete(uri, this.axiosConfig), loading);
  }
  putMethod(uri, data, loading = true) {
    return this.handleFlow(
      this.axios.put(uri, this.axiosConfig, data),
      loading
    );
  }

  handleFlow(method, loading = true) {
    return new Promise((resolve, reject) => {
      method
        .then((res) => {
          resolve({
            data: res.data,
            status: res.status,
            isSuccess: true,
          });
        })
        .catch((err) => {
          this.handleError(err);
          reject({
            err: err,
          });
        });
    });
  }
  handleError(err) {
    const status = err?.response?.status;
    switch (status) {
      case 404:
        window.location.assign("/error");
        break;
      default:
        window.location.assign("/error");
        break;
    }
  }
}

export default new AxiosService();

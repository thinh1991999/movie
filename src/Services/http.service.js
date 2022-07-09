import axios from "axios";
import axiosService from "./axios.service";

class HttpService {
  constructor() {}
  getWeekTrending() {
    return axiosService.getMethod("trending/all/week", true);
  }
  getTodayTrending() {
    return axiosService.getMethod("trending/all/day", true);
  }
  getPopular(type, page) {
    axiosService.addOption({
      params: {
        page,
      },
    });
    return axiosService.getMethod(`/${type}/popular`, true);
  }
  getTopRated(type, page) {
    axiosService.addOption({
      params: {
        page,
      },
    });
    return axiosService.getMethod(`/${type}/top_rated`, true);
  }
  getMovieNowPlaying(page) {
    axiosService.addOption({
      params: {
        page,
      },
    });
    return axiosService.getMethod(`/movie/now_playing`, true);
  }
  getMovieUpComing(page) {
    axiosService.addOption({
      params: {
        page,
      },
    });
    return axiosService.getMethod(`/movie/upcoming`, true);
  }
  getTvAiringToday(page) {
    axiosService.addOption({
      params: {
        page,
      },
    });
    return axiosService.getMethod(`/tv/airing_today`, true);
  }
  getTvOnTheAir(page) {
    axiosService.addOption({
      params: {
        page,
      },
    });
    return axiosService.getMethod(`/tv/on_the_air`, true);
  }
  // DetailPage
  getDetail(id, type) {
    return axiosService.getMethod(`/${type}/${id}`, true);
  }
  getSmilar(id, type, page = 1) {
    axiosService.addOption({
      params: {
        page,
      },
    });
    return axiosService.getMethod(`/${type}/${id}/similar`, true);
  }
  getVideos(movie_id, type) {
    return axiosService.getMethod(`/${type}/${movie_id}/videos`, true);
  }
  getCredits(id, type) {
    return axiosService.getMethod(`/${type}/${id}/credits`, true);
  }
  // People Page
  getPeopleDetail(id) {
    return axiosService.getMethod(`/person/${id}`, true);
  }
  getPeopleCredits(id) {
    return axiosService.getMethod(`/person/${id}/combined_credits`, true);
  }
  getPeopleExternal(id) {
    return axiosService.getMethod(`/person/${id}/external_ids`, true);
  }
  // Player page
  getTvSession(id, seasonNb) {
    return axiosService.getMethod(`/tv/${id}/season/${seasonNb}`, true);
  }
  // Search page
  getDataSearch(query, page, type) {
    axiosService.addOption({
      params: {
        page,
        query,
      },
    });
    return axiosService.getMethod(`/search/${type}`, true);
  }
  // Explore page
  getGenres(type) {
    return axiosService.getMethod(`/genre/${type}/list`, true);
  }
  getLanguages() {
    return axiosService.getMethod(`/configuration/languages`, true);
  }
  getDiscover(type, searchInfo = {}, page = 1) {
    axiosService.addOption({
      params: {
        ...searchInfo,
        page,
      },
    });
    return axiosService.getMethod(`/discover/${type}`, true);
  }
  // Global
  getMutilSearch(query, page) {
    axiosService.addOption({
      params: {
        query,
        page,
      },
    });
    return axiosService.getMethod(`/search/multi`, true);
  }
}

export default new HttpService();

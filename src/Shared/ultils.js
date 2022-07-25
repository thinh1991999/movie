import { createPopper } from "@popperjs/core";
import { English, VietNam } from "../Lanuages";

export const showPopper = (reference, popper) => {
  createPopper(reference, popper, {
    placement: "top",
    modifiers: [
      {
        name: "offset",
        options: {
          offset: [10, 20],
        },
      },
    ],
  });
};

export const resizeImage = (url = "", width = "", height = "") =>
  url.startsWith("https://graph.facebook.com/")
    ? url
    : `https://images.weserv.nl/?url=${encodeURIComponent(
        url
      )}&w=${width}&h=${height}&fit=outside`;

export const getImageUrl = (url = "", width = "") => {
  return `https://image.tmdb.org/t/p/${width}${url}`;
};

export const getTimeMovie = (duration) => {
  let hour = Math.floor(duration / 60);
  let minute = duration - hour * 60;
  if (hour < 10) {
    hour = `0${hour}`;
  }
  if (minute < 10) {
    minute = `0${minute}`;
  }
  return `${hour}h ${minute}m`;
};

export const getLanguage = (type) => {
  if (type === "US") {
    return English;
  } else {
    return VietNam;
  }
};

export const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export const getMovieUrl = (id) => {
  return "https://2embed.org//embed/movie?tmdb=" + id;
};

export const getTvUrl = (id, session, episode) => {
  return `https://2embed.org//embed/series?tmdb=${id}&sea=${session}&epi=${episode}`;
};

export const getErrorMessFirebase = (code) => {
  let mess = "Có lỗi xảy ra,vui lòng thử lại";
  switch (code) {
    case "auth/wrong-password":
      mess = "Mật khẩu không chính xác";
      break;
    case "auth/too-many-requests":
      mess = "Quá nhiều request,vui lòng thử lại sau";
      break;
    default:
      break;
  }
  return mess;
};

export const checkImage = (path) => {
  if (path.match(/.(jpg|jpeg|png|gif)$/i)) {
    return true;
  } else {
    return false;
  }
};

import { createPopper } from "@popperjs/core";

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

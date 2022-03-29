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

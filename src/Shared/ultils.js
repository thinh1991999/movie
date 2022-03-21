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

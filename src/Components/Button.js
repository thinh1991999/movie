import { memo } from "react";

function Button({ children, size, bg, header }) {
  return (
    <div
      className={`${size} ${
        bg && `rounded-full bg-gray-200 dark:bg-gray-500/[0.4] `
      }  
      ${!header && bg && `bg-gray-200/[0.2]`}
      p-2 hover:opacity-50 transition-all duration-500 ease-linear dark:text-gray-200`}
    >
      {children}
    </div>
  );
}

export default memo(Button);

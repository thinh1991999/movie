import { memo } from "react";

function SquareButton({
  children,
  msg,
  bg,
  color = "text-gray-800 dark:text-white",
  bd,
  detail,
  border = false,
}) {
  return (
    <div
      className={`px-2 py-1 capitalize ${
        bg ? `${bg}` : `bg-gray-300 dark:bg-gray-500/[0.8] `
      } ${bd ? `border border-gray-400 dark:border-white` : ``}   
      ${detail && `bg-gray-300/[0.3] dark:bg-gray-500/[0.2]`}
      ${border && `border`}
      ${color} rounded-md hover:opacity-50 transition-all duration-300 ease-linear`}
    >
      {children} <span className="block h-full">{msg}</span>
    </div>
  );
}

export default memo(SquareButton);

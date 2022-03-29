function SquareButton({ children, msg, bg, bd, detail }) {
  return (
    <div
      className={`px-2 py-1 capitalize ${
        bg ? `${bg}` : `bg-gray-300 dark:bg-gray-500/[0.8] `
      } ${bd ? `border border-gray-400 dark:border-white` : ``}   
      ${detail && `bg-gray-300/[0.3] dark:bg-gray-500/[0.2]`}
      dark:text-white rounded-2xl hover:opacity-50 transition-all duration-300 ease-linear`}
    >
      {children} <span className="block h-full">{msg}</span>
    </div>
  );
}

export default SquareButton;

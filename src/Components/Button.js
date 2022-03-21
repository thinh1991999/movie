function Button({ children, size, bg }) {
  return (
    <div
      className={`${size} ${
        bg && `rounded-full bg-gray-200 dark:bg-gray-500/[0.4] `
      }  p-2 hover:opacity-50 transition-all duration-500 ease-linear dark:text-gray-200`}
    >
      {children}
    </div>
  );
}

export default Button;

function ButtonText({ children }) {
  return (
    <button className="text-brand-600 font-medium text-center transition-all duration-300 bg-transparent border-none rounded-(--border-radius-sm) hover:text-brand-700">
      {children}
    </button>
  );
}

export default ButtonText;

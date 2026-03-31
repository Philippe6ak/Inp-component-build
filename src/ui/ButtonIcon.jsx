function ButtonIcon({ onClick, disabled = false, children, ...props }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="bg-transparent border-none p-[0.6rem] rounded-(--border-radius-sm) transition-all duration-200 hover:bg-grey-100 [&_svg]:w-[22px] [&_svg]:h-[22px] [&_svg]:text-brand-600"
      {...props}
    >
      {children}
    </button>
  );
}

export default ButtonIcon;

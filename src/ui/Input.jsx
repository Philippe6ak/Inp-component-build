function Input({ ...props }) {
  return (
    <input
      className="border-0 border-grey-300 bg-grey-0 rounded-radius-sm px-[1.2rem] py-[0.8rem] shadow-sm focus:outline-none disabled:bg-grey-100 disabled:text-grey-500 disabled:cursor-not-allowed"
      {...props}
    />
  );
}

export default Input;

function Textarea({ ...props }) {
  return (
    <textarea
      className="px-[1.2rem] py-[0.8rem] border border-grey-300 rounded-sm bg-grey-50 shadow-sm w-full h-[8rem] "
      {...props}
    />
  );
}

export default Textarea;

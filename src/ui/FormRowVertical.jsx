function FormRowVertical({ label, error, children }) {
  return (
    <div className="flex flex-col gap-[0.8rem] py-[1.2rem]">
      {label && (
        <label className="font-medium" htmlFor={children.props.id}>
          {label}
        </label>
      )}
      {children}
      {error && <span className="text-red-700 text-[1.4rem]">{error}</span>}
    </div>
  );
}

export default FormRowVertical;

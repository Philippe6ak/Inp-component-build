function FormRow({ label, error, children }) {
  return (
    <div className="grid items-center grid-cols-[24rem_1fr_1.2fr] gap-[2.4rem] px-0 py-[1.2rem] first:pt-0 last:pb-0 not-last:border-b not-last:border-grey-100 [&:has(button)]:flex [&:has(button)]:justify-end [&:has(button)]:gap-[1.2rem]">
      {label && (
        <label htmlFor={children.props.id} className="font-medium">
          {label}
        </label>
      )}
      {children}
      {error && <span className="text-red-700 text-[1.4rem]">{error}</span>}
    </div>
  );
}

export default FormRow;

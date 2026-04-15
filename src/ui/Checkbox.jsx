function Checkbox({ checked, onChange, disabled = false, id, children }) {
  return (
    <div className="flex gap-[1.6rem]">
      <input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        className="h-[2.4rem] w-[2.4rem] outline-offset-2 origin-left accent-brand-600 disabled:accent-brand-600"
      />
      <label
        htmlFor={!disabled ? id : ''}
        className="flex flex-1 items-center gap-[0.8rem]"
      >
        {children}
      </label>
    </div>
  );
}

export default Checkbox;

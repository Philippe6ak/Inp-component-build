import clsx from 'clsx';

function Select({ options, type = 'default', value, onChange, ...props }) {
  return (
    <select
      className={clsx(
        'text-[1.4rem] text-grey-300 px-[1.2rem] py-[0.8rem] rounded-(--border-radius-sm) bg-grey-0 font-medium shadow-(--shadow-sm)',
        { 'text-grey-100': type === 'white' }
      )}
      value={value}
      onChange={onChange}
      {...props}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}

export default Select;

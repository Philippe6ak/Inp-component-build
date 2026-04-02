import clsx from 'clsx';

function TableFilter({ options, value, onChange }) {
  const isActive = options.value === value;
  return (
    <div className="border border-grey-100 bg-grey-0 shadow-sm rounded-sm p-[0.4rem] flex gap-[0.4rem]">
      {options.map((option) => (
        <button
          className={clsx(
            'bg-grey-0 border-0 rounded-sm text-[1.4rem] px-[0.8rem] py-[0.44rem] transition-all duration-200',
            'bg-brand-600 text-brand-50' && isActive,
            'hover:bg-brand-600 hover:text-brand-50' && !isActive
          )}
          key={option.value}
          onClick={() => onChange(option.value)}
          disabled={isActive}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}

export default TableFilter;

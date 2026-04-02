import { useSearchParams } from 'react-router-dom';
import clsx from 'clsx';

function Filter({ filterField, options }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentValue = searchParams.get(filterField) || options.at(0).value;

  function handleClick(value) {
    searchParams.set(filterField, value);
    if (searchParams.get('page')) searchParams.set('page', '1');
    setSearchParams(searchParams);
  }

  return (
    <div className="border border-grey-100 rounded-(--border-radius-sm) bg-grey-0 shadow-sm p-[0.4rem] flex gap-[0.4rem]">
      {options.map((option) => {
        const isActive = currentValue === option.value;
        return (
          <button
            key={option.value}
            onClick={() => handleClick(option.value)}
            disabled={isActive}
            className={clsx(
              // Base styles
              'border-none rounded-(--border-radius-sm) font-medium text-[14px] px-[0.8rem] py-[0.44rem] transition-all duration-300',
              // Active state
              isActive
                ? 'bg-brand-600 text-brand-50'
                : 'bg-grey-0 hover:bg-brand-600 hover:text-brand-50'
            )}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}

export default Filter;

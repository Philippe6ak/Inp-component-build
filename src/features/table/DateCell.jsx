import { format, isValid } from 'date-fns';
import { useRef } from 'react';
import { HiOutlineCalendar, HiX } from 'react-icons/hi';

function DateCell({ getValue, row, column, table }) {
  const date = getValue();
  const { updateData } = table.options.meta;
  const inputRef = useRef(null);

  const displayValue =
    date && isValid(new Date(date)) ? format(new Date(date), 'MMM d') : null;

  function handleDateChange(e) {
    const newDate = e.target.value;
    if (newDate) {
      updateData(row.original.id, column.id, new Date(newDate));
    }
  }

  function handleClear(e) {
    e.stopPropagation();
    updateData(row.original.id, column.id, null);
  }

  function openPicker() {
    inputRef.current?.showPicker();
  }

  return (
    <div
      className="relative w-full cursor-pointer flex items-center min-h-[36px]"
      onClick={openPicker}
    >
      <input
        className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
        ref={inputRef}
        type="date"
        onChange={handleDateChange}
        value={displayValue ? format(new Date(date), 'yyyy-MM-dd') : ''}
      />

      {displayValue ? (
        <>
          <div className="flex items-center gap-[0.5rem] text-grey-600">
            <span>{displayValue}</span>
          </div>
          <div
            className="absolute right-0 text-red-400 cursor-pointer text-[2rem] leading-none p-[0_0.5rem] hover:text-danger-800"
            onClick={handleClear}
          >
            <HiX />
          </div>
        </>
      ) : (
        <div className="flex items-center gap-[0.5rem] text-grey-600">
          <HiOutlineCalendar className="text-[1.8rem] text-grey-500" />
        </div>
      )}
    </div>
  );
}

export default DateCell;

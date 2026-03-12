import { useRef } from "react";
import { format, isValid } from "date-fns";
import styled from "styled-components";
import { HiOutlineCalendar, HiX } from "react-icons/hi";

const Container = styled.div`
  position: relative;
  width: 100%;
  cursor: pointer;
  display: flex;
  align-items: center;
  min-height: 36px;
`;

const DisplayBox = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--color-grey-600);

  svg {
    font-size: 1.8rem;
    color: var(--color-grey-500);
  }
`;

const ClearBox = styled.div`
  position: absolute;
  right: 0;
  color: var(--color-red-400);
  cursor: pointer;
  font-size: 2rem;
  line-height: 1;
  padding: 0 0.5rem;

  &:hover {
    color: var(--color-red-600);
  }
`;

const HiddenInput = styled.input`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
`;

function DateCell({ getValue, row, column, table }) {
  const date = getValue();
  const { updateData } = table.options.meta;
  const inputRef = useRef(null);

  const displayValue =
    date && isValid(new Date(date)) ? format(new Date(date), "MMM d") : null;

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
    <Container onClick={openPicker}>
      <HiddenInput
        ref={inputRef}
        type="date"
        onChange={handleDateChange}
        value={displayValue ? format(new Date(date), "yyyy-MM-dd") : ""}
      />

      {displayValue ? (
        <>
          <DisplayBox>
            <span>{displayValue}</span>
          </DisplayBox>
          <ClearBox onClick={handleClear}>
            <HiX />
          </ClearBox>
        </>
      ) : (
        <DisplayBox>
          <HiOutlineCalendar />
        </DisplayBox>
      )}
    </Container>
  );
}

export default DateCell;

import { useEffect, useState } from "react";
import TableInput from "../../ui/TableInput";

function EditableCell({ getValue, row, column, table }) {
  const initialValue = getValue();
  const [value, setValue] = useState(initialValue);

  useEffect(
    function () {
      setValue(initialValue);
    },
    [initialValue],
  );

  function onBlur() {
    table.options.meta?.updateData(row.index, column.id, value);
  }

  return (
    <TableInput
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onBlur={onBlur}
    />
  );
}

export default EditableCell;

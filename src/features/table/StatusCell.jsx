import { useEffect, useState } from "react";
import Select from "../../ui/Select";
import { STATUSES } from "./tableData";

function StatusCell({ getValue, row, column, table }) {
  const initialStatus = getValue();
  const [value, setValue] = useState("");

  const options = [
    { value: "", label: "No Status" },
    ...STATUSES.map((status) => ({
      value: status.id,
      label: status.name,
      color: status.color,
    })),
  ];

  useEffect(() => {
    if (initialStatus?.id) {
      setValue(initialStatus.id);
    } else {
      setValue("");
    }
  }, [initialStatus]);

  function onChange(e) {
    const newValue = e.target.value;
    setValue(newValue);
  }

  function onBlur() {
    if (value === "") {
      table.options.meta?.updateData(row.original.id, column.id, null);
    } else {
      const selectedStatus = STATUSES.find((status) => status.id === value);
      if (selectedStatus) {
        table.options.meta?.updateData(
          row.original.id,
          column.id,
          selectedStatus,
        );
      }
    }
  }

  return (
    <Select
      options={options}
      value={value}
      type="white"
      onChange={onChange}
      onBlur={onBlur}
    />
  );
}

export default StatusCell;

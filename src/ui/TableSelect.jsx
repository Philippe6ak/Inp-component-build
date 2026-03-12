import { useState } from "react";
import Select from "./Select";

function TableSelect({ options }) {
  const [value, setValue] = useState("");

  function handleChange(e) {
    setValue(e.target.value);
  }

  return (
    <Select
      options={options}
      value={value}
      type="white"
      onChange={handleChange}
    />
  );
}

export default TableSelect;

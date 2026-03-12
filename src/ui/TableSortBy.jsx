// SortBy.jsx
import Select from "./Select";

function SortBy({ options, value, onChange }) {
  return (
    <Select
      options={options}
      value={value}
      type="white"
      onChange={(e) => onChange(e.target.value)}
    />
  );
}

export default SortBy;

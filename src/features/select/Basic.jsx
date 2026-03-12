import Select from "react-select";
import { groupedOptions } from "../../utils/constants";

function formatGroupLabel(data) {
  return (
    <div>
      <span>{data.label}</span>
    </div>
  );
}

function Basic() {
  return (
    <Select
      options={groupedOptions}
      defaultValue={groupedOptions[0].options[0]}
      formatGroupLabel={formatGroupLabel}
      menuPosition="fixed"
      menuShouldScrollIntoView={false}
    />
  );
}

export default Basic;

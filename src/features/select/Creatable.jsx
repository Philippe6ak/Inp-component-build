import CreatableSelect from "react-select/creatable";
import { colourOptions } from "../../utils/constants";

function Creatable() {
  return (
    <CreatableSelect
      isClearable
      options={colourOptions}
      menuPosition="fixed"
      menuShouldScrollIntoView={false}
    />
  );
}

export default Creatable;

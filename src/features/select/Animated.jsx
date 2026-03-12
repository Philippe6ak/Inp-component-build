import Select from "react-select";
import makeAnimated from "react-select/animated";
import { colourOptions } from "../../utils/constants";

const animatedComponents = makeAnimated();

function Animated() {
  return (
    <Select
      closeMenuOnSelect={false}
      components={animatedComponents}
      defaultValue={[colourOptions[4], colourOptions[5]]}
      isMulti
      options={colourOptions}
      menuPosition="fixed"
      menuShouldScrollIntoView={false}
    />
  );
}

export default Animated;

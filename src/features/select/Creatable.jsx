import { useState } from 'react';
import CreatableSelect from 'react-select/creatable';
import { colourOptions } from '../../utils/constants';

function Creatable() {
  const [options, setOptions] = useState(colourOptions);
  const [value, setValue] = useState(null);

  function handleCreateOption(inputValue) {
    const newOption = {
      value: inputValue.toLowerCase().trim().replace(/\s+/g, '-'),
      label: inputValue.trim(),
    };

    setOptions((currentOptions) => [...currentOptions, newOption]);
    setValue(newOption);
  }

  return (
    <CreatableSelect
      isClearable
      options={options}
      value={value}
      onChange={setValue}
      onCreateOption={handleCreateOption}
      menuPosition="fixed"
      menuShouldScrollIntoView={false}
    />
  );
}

export default Creatable;

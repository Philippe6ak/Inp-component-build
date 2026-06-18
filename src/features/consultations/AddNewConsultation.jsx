import { useState } from 'react';
import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';
import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import Spinner from '../../ui/Spinner';
import { useSettings } from './useSettings';
import { useUpdateSetting } from './useUpdateSetting';

const patientTypeOptions = [
  { value: 'etudiant', label: 'Étudiant' },
  { value: 'fonctionnaire', label: 'Fonctionnaire' },
  { value: 'autre', label: 'Autre' },
];

function AddNewConsultation() {
  const {
    isLoading,
    settings: {
      minBookingLength,
      maxBookingLength,
      maxGuestsPerBooking,
      breakfastPrice,
    } = {},
  } = useSettings();

  const { isUpdating, updateSetting } = useUpdateSetting();

  const [patientType, setPatientType] = useState(null);
  const [matriculeOptions, setMatriculeOptions] = useState([]);
  const [matricule, setMatricule] = useState(null);

  if (isLoading) return <Spinner />;

  function handleUpdate(e, field) {
    const { value } = e.target;

    if (!value) return;
    updateSetting({ [field]: value });
    console.log(value);
  }

  function handleCreateMatricule(inputValue) {
    const newOption = {
      value: inputValue.toLowerCase().trim().replace(/\s+/g, '-'),
      label: inputValue.trim(),
    };

    setMatriculeOptions((current) => [...current, newOption]);
    setMatricule(newOption);
  }

  function handlePatientTypeChange(selected) {
    setPatientType(selected);
    setMatricule(null);
  }

  const needsMatricule =
    patientType?.value === 'etudiant' || patientType?.value === 'fonctionnaire';

  const showRestOfForm =
    patientType?.value === 'autre' || (needsMatricule && matricule);

  return (
    <Form>
      <FormRow label="Type de patient">
        <Select
          inputId="patient-type"
          options={patientTypeOptions}
          value={patientType}
          onChange={handlePatientTypeChange}
          menuPosition="fixed"
          menuShouldScrollIntoView={false}
        />
      </FormRow>

      {needsMatricule && (
        <FormRow label="Matricule">
          <CreatableSelect
            inputId="matricule"
            isClearable
            options={matriculeOptions}
            value={matricule}
            onChange={setMatricule}
            onCreateOption={handleCreateMatricule}
            menuPosition="fixed"
            menuShouldScrollIntoView={false}
          />
        </FormRow>
      )}

      {showRestOfForm && (
        <>
          <FormRow label="Minimum nights/booking">
            <Input
              type="number"
              id="min-nights"
              disabled={isUpdating}
              defaultValue={minBookingLength}
              onBlur={(e) => handleUpdate(e, 'minBookingLength')}
            />
          </FormRow>
          <FormRow label="Maximum nights/booking">
            <Input
              type="number"
              id="max-nights"
              defaultValue={maxBookingLength}
              disabled={isUpdating}
              onBlur={(e) => handleUpdate(e, 'maxBookingLength')}
            />
          </FormRow>
          <FormRow label="Maximum guests/booking">
            <Input
              type="number"
              id="max-guests"
              defaultValue={maxGuestsPerBooking}
              disabled={isUpdating}
              onBlur={(e) => handleUpdate(e, 'maxGuestsPerBooking')}
            />
          </FormRow>
          <FormRow label="Breakfast price">
            <Input
              type="number"
              id="breakfast-price"
              defaultValue={breakfastPrice}
              disabled={isUpdating}
              onBlur={(e) => handleUpdate(e, 'breakfastPrice')}
            />
          </FormRow>
        </>
      )}
    </Form>
  );
}

export default AddNewConsultation;

/* eslint-disable react/prop-types */
import { useForm, Controller } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';

import Button from '../../../ui/Button';
import Form from '../../../ui/Form';
import FormRow from '../../../ui/FormRow';
import Input from '../../../ui/Input';
import { useEditDisease } from './useEditDisease';
import { useNewDisease } from './useNewDisease';
import { useDiseaseTyp } from '../diseasestype/useDiseaseTyp';

function NewDisease({ diseaseToEdit = {}, onCloseModal }) {
  const { maladies_id: editId, ...editValues } = diseaseToEdit;
  const isEditSession = Boolean(editId);

  const { createDisease, isCreating } = useNewDisease();
  const { editDisease, isEditing } = useEditDisease();
  const { diseaseType, isLoading: isLoadingTypes } = useDiseaseTyp();
  const navigate = useNavigate();

  const typeOptions =
    diseaseType?.data?.map((t) => ({
      value: t.typesmaladies_id,
      label: t.libelle,
    })) ?? [];

  const defaultTypeOption = isEditSession
    ? (typeOptions.find((o) => o.value === editValues.typesmaladies_id) ?? null)
    : null;

  const { register, handleSubmit, reset, control, formState } = useForm({
    defaultValues: isEditSession
      ? {
          libelle: editValues.libelle ?? '',
          code: editValues.code ?? '',
          typesmaladies_id: editValues.typesmaladies_id ?? null,
        }
      : {},
  });
  const { errors } = formState;
  const isWorking = isCreating || isEditing;
  const menuPortalTarget = typeof window !== 'undefined' ? document.body : null;

  function onSubmit(data) {
    if (isEditSession) {
      editDisease(
        { newDiseaseData: data, id: editId },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        }
      );
      return;
    }

    createDisease(data, {
      onSuccess: () => {
        reset();
        if (onCloseModal) onCloseModal();
        else navigate('/diseases');
      },
    });
  }

  function onError(formErrors) {
    console.log(formErrors);
  }

  return (
    <Form
      onSubmit={handleSubmit(onSubmit, onError)}
      type={onCloseModal ? 'modal' : 'regular'}
    >
      <FormRow label="Libellé" error={errors?.libelle?.message}>
        <Input
          type="text"
          id="libelle"
          disabled={isWorking}
          {...register('libelle', {
            required: 'Le libellé est requis',
          })}
        />
      </FormRow>

      <FormRow label="Code" error={errors?.code?.message}>
        <Input
          type="text"
          id="code"
          disabled={isWorking}
          {...register('code', {
            required: 'Le code est requis',
          })}
        />
      </FormRow>

      <FormRow label="Type" error={errors?.typesmaladies_id?.message}>
        <Controller
          name="typesmaladies_id"
          control={control}
          rules={{ required: 'Le type est requis' }}
          render={({ field }) => (
            <Select
              inputId="typesmaladies_id"
              options={typeOptions}
              isLoading={isLoadingTypes}
              isDisabled={isWorking || isLoadingTypes}
              defaultValue={defaultTypeOption}
              menuPortalTarget={menuPortalTarget}
              styles={{ menuPortal: (base) => ({ ...base, zIndex: 2000 }) }}
              menuPosition="fixed"
              menuShouldScrollIntoView={false}
              onChange={(selected) => field.onChange(selected?.value ?? null)}
              onBlur={field.onBlur}
              value={typeOptions.find((o) => o.value === field.value) ?? null}
            />
          )}
        />
      </FormRow>

      <FormRow>
        {onCloseModal && (
          <Button
            variation="secondary"
            type="reset"
            onClick={() => onCloseModal()}
          >
            Cancel
          </Button>
        )}
        <Button type="submit" disabled={isWorking}>
          {isWorking
            ? isEditSession
              ? 'Updating...'
              : 'Creating...'
            : isEditSession
              ? 'Update disease'
              : 'Create disease'}
        </Button>
      </FormRow>
    </Form>
  );
}

export default NewDisease;

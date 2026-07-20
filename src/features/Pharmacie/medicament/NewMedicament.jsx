import { useForm, Controller } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import Button from '../../../ui/Button';
import Form from '../../../ui/Form';
import FormRow from '../../../ui/FormRow';
import Input from '../../../ui/Input';

import CreatableSelect from 'react-select/creatable';
import { typeMedecinesHooks } from '../../../hooks/hookIndex';
import { medicamentHooks } from '../../../hooks/hookIndex';
import { UseCosts } from '../../administration/couts/useCosts';

function NewMedicament({ medicamentToEdit = {}, onCloseModal }) {
  const { medicaments_id: editId, ...editValues } = medicamentToEdit;
  const isEditSession = Boolean(editId);

  const { useCreateEdit } = medicamentHooks;
  const { createEdit: createMedication, isWorking } = useCreateEdit();

  const { useGetAll } = typeMedecinesHooks;
  const { isLoading, error, data: medecineType } = useGetAll();
  const { couts, isLoading: isLoadingCost } = UseCosts();

  const navigate = useNavigate();

  const typeOptions =
    medecineType?.map((t) => ({
      value: t.typesmedicaments_id,
      label: t.libelle,
    })) ?? [];

  const defaultTypeOption = isEditSession
    ? (typeOptions.find((o) => o.value === editValues.typesmedicaments_id) ??
      null)
    : null;

  const costOptions =
    couts?.data?.map((c) => ({
      value: c.couts_id,
      label: c.montant,
    })) ?? [];

  const defaultCostOption = isEditSession
    ? (costOptions.find((o) => o.value === editValues.couts_id) ?? null)
    : null;

  const { register, handleSubmit, reset, control, formState } = useForm({
    defaultValues: isEditSession
      ? {
          libelle: editValues.libelle ?? '',
          code: editValues.code ?? '',
          typesmedicaments_id: editValues.typesmedicaments_id ?? null,
          couts_id: defaultCostOption,
        }
      : {},
  });
  const { errors } = formState;

  function onSubmit(data) {
    const payload = {
      libelle: data.libelle,
      code: data.code,
      typesmedicaments_id: data.typesmedicaments_id,
      montant: Number(data.couts_id.label),
    };

    if (isEditSession) {
      createMedication(
        {
          formData: payload,
          id: editId,
        },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        }
      );

      return;
    }

    createMedication(
      { formData: payload, id: undefined },
      {
        onSuccess: () => {
          reset();

          if (onCloseModal) onCloseModal();
          else navigate('/medicament');
        },
      }
    );
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

      <FormRow label="Type" error={errors?.typesmedicaments_id?.message}>
        <div onClick={(e) => e.stopPropagation()}>
          <Controller
            name="typesmedicaments_id"
            control={control}
            rules={{ required: 'Le type est requis' }}
            render={({ field }) => (
              <Select
                inputId="typesmedicaments_id"
                options={typeOptions}
                isLoading={isLoading}
                isDisabled={isWorking || isLoading}
                defaultValue={defaultTypeOption}
                styles={{ menuPortal: (base) => ({ ...base, zIndex: 2000 }) }}
                menuPosition="fixed"
                menuShouldScrollIntoView={false}
                onChange={(selected) => field.onChange(selected?.value ?? null)}
                onBlur={field.onBlur}
                value={typeOptions.find((o) => o.value === field.value) ?? null}
              />
            )}
          />
        </div>
      </FormRow>

      <FormRow label="Coût" error={errors?.couts_id?.message}>
        <div onClick={(e) => e.stopPropagation()}>
          <Controller
            name="couts_id"
            control={control}
            rules={{
              validate: (value) => (value ? true : 'Le coût est requis'),
            }}
            render={({ field }) => (
              <CreatableSelect
                options={costOptions}
                isLoading={isLoadingCost}
                value={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
                placeholder="Sélectionner ou saisir un coût"
              />
            )}
          />
        </div>
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
              ? 'Update medecine'
              : 'Create medecine'}
        </Button>
      </FormRow>
    </Form>
  );
}

export default NewMedicament;

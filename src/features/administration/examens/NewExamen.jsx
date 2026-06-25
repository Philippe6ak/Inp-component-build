import { useForm, Controller } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import Button from '../../../ui/Button';
import Form from '../../../ui/Form';
import FormRow from '../../../ui/FormRow';
import Input from '../../../ui/Input';
import { UseNewExamen } from './useNewExamen';
import { useTypeExam } from '../../type/examenType/useTypeExam';
//import { UseCreateCost } from '../couts/useCreateCost';
import { UseCosts } from '../couts/useCosts';
import { UseEditExamen } from './useEditExamen';
import CreatableSelect from 'react-select/creatable';

function NewExamen({ examenToEdit = {}, onCloseModal }) {
  const { examens_id: editId, ...editValues } = examenToEdit;
  const isEditSession = Boolean(editId);

  const { createExamen, isCreating } = UseNewExamen();
  const { editExamen, isEditing } = UseEditExamen();
  const { examens: typeExamen, isLoading } = useTypeExam();
  const { couts, isLoading: isLoadingCost } = UseCosts();

  const navigate = useNavigate();

  const typeOptions =
    typeExamen?.data?.map((t) => ({
      value: t.typesexamens_id,
      label: t.libelle,
    })) ?? [];

  const defaultTypeOption = isEditSession
    ? (typeOptions.find((o) => o.value === editValues.typesexamens_id) ?? null)
    : null;

  const costOptions =
    couts?.data?.map((t) => ({
      value: t.couts_id,
      label: t.montant,
    })) ?? [];

  const defaultCostOption = isEditSession
    ? (costOptions.find((o) => o.value === editValues.couts_id) ?? null)
    : null;

  const { register, handleSubmit, reset, control, formState } = useForm({
    defaultValues: isEditSession
      ? {
          libelle: editValues.libelle ?? '',
          code: editValues.code ?? '',
          typesexamens_id: editValues.typesexamens_id ?? null,
          couts_id: defaultCostOption,
        }
      : {},
  });
  const { errors } = formState;
  const isWorking = isCreating || isEditing;

  function onSubmit(data) {
    const payload = {
      libelle: data.libelle,
      code: data.code,
      typesexamens_id: data.typesexamens_id,
      montant: Number(data.couts_id.label),
    };

    if (isEditSession) {
      editExamen(
        {
          newExamenData: payload,
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

    createExamen(payload, {
      onSuccess: () => {
        reset();

        if (onCloseModal) onCloseModal();
        else navigate('/examens');
      },
    });
  }

  function onError(formErrors) {
    console.log(formErrors);
  }

  console.log('couts', couts);
  console.log('costOptions', costOptions);

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

      <FormRow label="Type" error={errors?.typesexamens_id?.message}>
        <div onClick={(e) => e.stopPropagation()}>
          <Controller
            name="typesexamens_id"
            control={control}
            rules={{ required: 'Le type est requis' }}
            render={({ field }) => (
              <Select
                inputId="typesexamens_id"
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
              ? 'Update exam'
              : 'Create exam'}
        </Button>
      </FormRow>
    </Form>
  );
}

export default NewExamen;

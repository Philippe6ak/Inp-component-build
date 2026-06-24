import { useForm, Controller } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import Button from '../../../ui/Button';
import Form from '../../../ui/Form';
import FormRow from '../../../ui/FormRow';
import Input from '../../../ui/Input';
import { UseNewExamen } from './useNewExamen';
import { useTypeExam } from '../../type/examenType/useTypeExam';
import { UseCreateCost } from '../couts/useCreateCost';
import { UseCosts } from '../couts/useCosts';
import { UseEditExamen } from './useEditExamen';
import CreatableSelect from 'react-select/creatable';

function NewExamen({ examenToEdit = {}, onCloseModal }) {
  const { examens_id: editId, ...editValues } = examenToEdit;
  const isEditSession = Boolean(editId);

  const { createExamen, isCreating } = UseNewExamen();
  const { editExamen, isEditing } = UseEditExamen();
  const { examens: typeExamen, isLoading } = useTypeExam();
  const { createCouts, isCreatingCouts } = UseCreateCost();
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
      label: t.cout_montant,
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
          couts_id: editValues.couts_id ?? null,

          // couts_id: editValues.couts_id ?? null,
        }
      : {},
  });
  const { errors } = formState;
  const isWorking = isCreating || isEditing;

  /* function onSubmit(data) {

    
    if (isEditSession) {
      editExamen(
        { newExamenData: data, id: editId },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        }
      );

      return;
    }

    createExamen(data, {
      onSuccess: () => {
        reset();

        if (onCloseModal) onCloseModal();
        else navigate('/examens');
      },
    });
  }*/
  function onSubmit(data) {
    const selectedCost = data.couts_id;

    const saveExam = (couts_id) => {
      const payload = {
        libelle: data.libelle,
        code: data.code,
        typesexamens_id: data.typesexamens_id,
        couts_id,
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
      } else {
        createExamen(payload, {
          onSuccess: () => {
            reset();

            if (onCloseModal) onCloseModal();
            else navigate('/examens');
          },
        });
      }
    };

    // coût existant
    if (!selectedCost?.__isNew__) {
      saveExam(selectedCost.value);
      return;
    }

    // nouveau coût
    createCouts(
      {
        cout_montant: Number(selectedCost.label),
      },
      {
        onSuccess: (response) => {
          const couts_id = response?.data?.couts_id ?? response?.couts_id;

          saveExam(couts_id);
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

      <FormRow label="Type" error={errors?.examens_id?.message}>
        <div onClick={(e) => e.stopPropagation()}>
          <Controller
            name="examens_id"
            control={control}
            rules={{ required: 'Le type est requis' }}
            render={({ field }) => (
              <Select
                inputId="examens_id"
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
            rules={{ required: 'Le coût est requis' }}
            render={({ field }) => (
              <CreatableSelect
                options={costOptions}
                isLoading={isLoadingCost}
                isDisabled={isWorking || isCreatingCouts}
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

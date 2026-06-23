import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import Button from '../../../ui/Button';
import Form from '../../../ui/Form';
import FormRow from '../../../ui/FormRow';
import Input from '../../../ui/Input';
import { useEditDiseaseTyp } from './useEditDiseaseTyp';
import { useNewDiseaseTyp } from './useNewDiseaseTyp';

function NewDiseaseTyp({ diseaseToEdit = {}, onCloseModal }) {
  const { typesmaladies_id: editId, ...editValues } = diseaseToEdit;
  const isEditSession = Boolean(editId);

  const { createDiseaseTyp, isCreating } = useNewDiseaseTyp();
  const { editDisease, isEditing } = useEditDiseaseTyp();
  const navigate = useNavigate();
  const { register, handleSubmit, reset, formState } = useForm({
    defaultValues: isEditSession
      ? {
          libelle: editValues.libelle ?? '',
          code: editValues.code ?? '',
        }
      : {},
  });
  const { errors } = formState;
  const isWorking = isCreating || isEditing;

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

    createDiseaseTyp(data, {
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

export default NewDiseaseTyp;

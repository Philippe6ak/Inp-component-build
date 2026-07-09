import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import Button from '../../../ui/Button';
import Form from '../../../ui/Form';
import FormRow from '../../../ui/FormRow';
import Input from '../../../ui/Input';

import { useEditMethodeDepistage } from './useEditMethodeDepistage';
import { useNewMethodeDepistage } from './useNewMethodeDepistage';

function NewMethodeDepistage({ methodeDepistageToEdit = {}, onCloseModal }) {
  const { methodesdepistages_id: editId, ...editValues } =
    methodeDepistageToEdit;
  const isEditSession = Boolean(editId);

  const { createMethodeDepistage, isCreating } = useNewMethodeDepistage();
  const { editMethodeDepistage, isEditing } = useEditMethodeDepistage();
  const navigate = useNavigate();
  const { register, handleSubmit, reset, formState } = useForm({
    defaultValues: isEditSession
      ? {
          libelle: editValues.libelle ?? '',
        }
      : {},
  });
  const { errors } = formState;
  const isWorking = isCreating || isEditing;

  function onSubmit(data) {
    if (isEditSession) {
      editMethodeDepistage(
        { newMethodeDepistageData: data, id: editId },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        }
      );

      return;
    }

    createMethodeDepistage(data, {
      onSuccess: () => {
        reset();

        if (onCloseModal) onCloseModal();
        else navigate('/methodesdepistages');
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
              ? 'Mise à jour de la méthode de dépistage'
              : 'Création de la méthode de dépistage'}
        </Button>
      </FormRow>
    </Form>
  );
}

export default NewMethodeDepistage;

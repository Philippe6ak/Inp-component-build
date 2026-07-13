import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import Button from '../../../ui/Button';
import Form from '../../../ui/Form';
import FormRow from '../../../ui/FormRow';
import Input from '../../../ui/Input';

import { typeGrossessesHooks } from '../../../hooks/hookIndex';

function NewtypeGrossesse({ typeGrossesseToEdit = {}, onCloseModal }) {
  const { typegrossesses_id: editId, ...editValues } = typeGrossesseToEdit;
  const isEditSession = Boolean(editId);

  const { useCreateEdit } = typeGrossessesHooks;
  const { createEdit, isWorking } = useCreateEdit();

  const navigate = useNavigate();
  const { register, handleSubmit, reset, formState } = useForm({
    defaultValues: isEditSession
      ? {
          libelle: editValues.libelle ?? '',
        }
      : {},
  });
  const { errors } = formState;

  function onSubmit(data) {
    if (isEditSession) {
      createEdit(
        { formData: data, id: editId },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        }
      );

      return;
    }

    createEdit(
      { formData: data, id: undefined },
      {
        onSuccess: () => {
          reset();

          if (onCloseModal) onCloseModal();
          else navigate('/typesgrossesse');
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
              ? 'Modification...'
              : 'Creation...'
            : isEditSession
              ? 'Mise a jour du type de grossesse'
              : 'Création du type de grossesse'}
        </Button>
      </FormRow>
    </Form>
  );
}

export default NewtypeGrossesse;

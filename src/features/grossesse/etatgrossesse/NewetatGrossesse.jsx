import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import Button from '../../../ui/Button';
import Form from '../../../ui/Form';
import FormRow from '../../../ui/FormRow';
import Input from '../../../ui/Input';

import { useEditetatGrossesse } from './useEditetatGrossesse';
import { useNewetatGrossesse } from './useNewetatGrossesse';

function NewetatGrossesse({ etatGrossesseToEdit = {}, onCloseModal }) {
  const { etatsgrossesses_id: editId, ...editValues } = etatGrossesseToEdit;
  const isEditSession = Boolean(editId);

  const { createetatGrossesse, isCreating } = useNewetatGrossesse();
  const { editetatGrossesse, isEditing } = useEditetatGrossesse();
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
      editetatGrossesse(
        { newetatGrossesseData: data, id: editId },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        }
      );

      return;
    }

    createetatGrossesse(data, {
      onSuccess: () => {
        reset();

        if (onCloseModal) onCloseModal();
        else navigate('/etatgrossesse');
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
              ? 'Modification...'
              : 'Creation...'
            : isEditSession
              ? "Mise a jour de l'etat de grossesse"
              : "Création de l'etat de grossesse"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default NewetatGrossesse;

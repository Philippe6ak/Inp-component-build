/* eslint-disable react/prop-types */
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import Button from '../../../ui/Button';
import Form from '../../../ui/Form';
import FormRow from '../../../ui/FormRow';
import Input from '../../../ui/Input';
import { useNewPermissions } from './useNewPermissions';
import { useEditPermissions } from './useEditPermissions';

function NewPermissions({ permissionsToEdit = {}, onCloseModal }) {
  const { permissions_id: editId, ...editValues } = permissionsToEdit;
  const isEditSession = Boolean(editId);

  const { createPermissions, isCreating } = useNewPermissions();
  const { editPermissions, isEditing } = useEditPermissions();

  const navigate = useNavigate();
  const { register, handleSubmit, reset, formState } = useForm({
    defaultValues: isEditSession
      ? {
          name: editValues.name ?? '',
        }
      : {},
  });
  const { errors } = formState;
  const isWorking = isCreating || isEditing;

  function onSubmit(data) {
    if (isEditSession) {
      editPermissions(
        { newPermissionsData: data, id: editId },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        }
      );

      return;
    }

    createPermissions(data, {
      onSuccess: () => {
        reset();

        if (onCloseModal) onCloseModal();
        else navigate('/permissions');
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
      <FormRow label="Libellé" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          disabled={isWorking}
          {...register('name', {
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
              ? 'Update permissions'
              : 'Create permisions'}
        </Button>
      </FormRow>
    </Form>
  );
}

export default NewPermissions;

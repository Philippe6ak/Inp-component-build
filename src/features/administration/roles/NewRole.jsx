import { useForm, Controller } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import Button from '../../../ui/Button';
import Form from '../../../ui/Form';
import FormRow from '../../../ui/FormRow';
import Input from '../../../ui/Input';
import { useEditRole } from './useEditRole';
import { useNewRole } from './useNewRole';

function NewRole({ roleToEdit = {}, onCloseModal }) {
  const { roles_id: editId, ...editValues } = roleToEdit;
  const isEditSession = Boolean(editId);

  const { createRole, isCreating } = useNewRole();
  const { editRole, isEditing } = useEditRole();
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
      editRole(
        { newRoleData: data, id: editId },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        }
      );
      return;
    }

    createRole(data, {
      onSuccess: () => {
        reset();
        if (onCloseModal) onCloseModal();
        else navigate('/roles');
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
      onClick={(e) => e.stopPropagation()}
    >
      <FormRow label="Role" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          disabled={isWorking}
          {...register('name', {
            required: 'Le role est requis',
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
              ? 'Update role'
              : 'Create role'}
        </Button>
      </FormRow>
    </Form>
  );
}

export default NewRole;

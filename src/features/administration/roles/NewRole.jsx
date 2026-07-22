import Button from '../../../ui/Button';
import Form from '../../../ui/Form';
import FormRow from '../../../ui/FormRow';
import Input from '../../../ui/Input';

import { useForm, Controller } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { rolesHooks } from '../../../hooks/hookIndex';

function NewRole({ roleToEdit = {}, onCloseModal }) {
  const { roles_id: editId, ...editValues } = roleToEdit;
  const isEditSession = Boolean(editId);

  const { useCreateEdit } = rolesHooks;
  const { createEdit, isWorking } = useCreateEdit();
  const navigate = useNavigate();

  const { register, handleSubmit, reset, formState } = useForm({
    defaultValues: isEditSession
      ? {
          name: editValues.name ?? '',
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
          else navigate('/roles');
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

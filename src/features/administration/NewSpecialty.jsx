import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import Button from '../../ui/Button';
import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import { useNewSpecialty } from './useNewSpecialty';

function NewSpecialty() {
  const { createSpecialty, isCreating } = useNewSpecialty();
  const navigate = useNavigate();
  const { register, handleSubmit, reset, formState } = useForm();
  const { errors } = formState;

  function onSubmit(data) {
    createSpecialty(data, {
      onSuccess: () => {
        reset();
        navigate('/specialties');
      },
    });
  }

  function onError(formErrors) {
    console.log(formErrors);
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <FormRow label="Libellé" error={errors?.libelle?.message}>
        <Input
          type="text"
          id="libelle"
          disabled={isCreating}
          {...register('libelle', {
            required: 'Le libellé est requis',
          })}
        />
      </FormRow>
      <FormRow label="Code" error={errors?.code?.message}>
        <Input
          type="text"
          id="code"
          disabled={isCreating}
          {...register('code', {
            required: 'Le code est requis',
          })}
        />
      </FormRow>
      <FormRow>
        <Button type="submit" disabled={isCreating}>
          {isCreating ? 'Creating...' : 'Create specialty'}
        </Button>
      </FormRow>
    </Form>
  );
}

export default NewSpecialty;

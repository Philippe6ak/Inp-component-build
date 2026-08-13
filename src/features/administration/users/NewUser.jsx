import { useMemo, useRef } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import AsyncSelect from 'react-select/async';
import Select from 'react-select';

import Button from '../../../ui/Button';
import Form from '../../../ui/Form';
import FormRow from '../../../ui/FormRow';
import { specialitesHooks } from '../../../hooks/hookIndex';
import { userService } from '../../../services/inphbUserService';
import { useNewUser } from './useNewUser';

function NewUser({ onCloseModal }) {
  const navigate = useNavigate();
  const { createUser, isCreating } = useNewUser();
  const allAgentsRef = useRef(null);
  const menuPortalTarget = typeof window !== 'undefined' ? document.body : null;

  const { control, handleSubmit, reset, formState } = useForm({
    defaultValues: {
      specialites_id: null,
      agents_id: null,
    },
  });
  const { errors } = formState;

  const { useGetAll } = specialitesHooks;
  const { data: specialtiesResponse, isLoading: isLoadingSpecialties } =
    useGetAll();

  const specialtyOptions = useMemo(
    () =>
      (specialtiesResponse ?? []).map((specialty) => ({
        value: specialty.specialites_id,
        label: specialty.libelle,
      })),
    [specialtiesResponse]
  );

  async function loadAgentOptions(inputValue) {
    if (!allAgentsRef.current) {
      const response = await userService.getAgents();
      const agents = Array.isArray(response?.data) ? response.data : [];

      allAgentsRef.current = agents.map((agent) => ({
        value: agent.agents_id ?? agent.id,
        label: `${agent?.nom ?? ''} ${agent?.prenoms ?? ''}`.trim(),
      }));
    }

    const normalizedInput = String(inputValue ?? '')
      .toLowerCase()
      .trim();

    if (!normalizedInput) return allAgentsRef.current;

    return allAgentsRef.current.filter((agent) =>
      agent.label.toLowerCase().includes(normalizedInput)
    );
  }

  function onSubmit(formData) {
    createUser(
      {
        specialites_id: formData.specialites_id,
        agents_id: formData.agents_id,
      },
      {
        onSuccess: () => {
          reset();
          if (onCloseModal) onCloseModal();
          else navigate('/users');
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
      <FormRow label="Spécialité" error={errors?.specialites_id?.message}>
        <Controller
          name="specialites_id"
          control={control}
          rules={{ required: 'La spécialité est requise' }}
          render={({ field }) => (
            <Select
              inputId="specialites_id"
              options={specialtyOptions}
              isLoading={isLoadingSpecialties}
              isDisabled={isCreating || isLoadingSpecialties}
              value={
                specialtyOptions.find(
                  (option) => option.value === field.value
                ) ?? null
              }
              onChange={(selected) => field.onChange(selected?.value ?? null)}
              onBlur={field.onBlur}
              menuPortalTarget={menuPortalTarget}
              styles={{ menuPortal: (base) => ({ ...base, zIndex: 2000 }) }}
              menuPosition="fixed"
              menuShouldScrollIntoView={false}
            />
          )}
        />
      </FormRow>

      <FormRow label="Agent" error={errors?.agents_id?.message}>
        <Controller
          name="agents_id"
          control={control}
          rules={{ required: "L'agent est requis" }}
          render={({ field }) => (
            <AsyncSelect
              inputId="agents_id"
              defaultOptions
              cacheOptions
              loadOptions={loadAgentOptions}
              isDisabled={isCreating}
              value={
                allAgentsRef.current?.find(
                  (option) => option.value === field.value
                ) ?? null
              }
              onChange={(selected) => field.onChange(selected?.value ?? null)}
              onBlur={field.onBlur}
              menuPortalTarget={menuPortalTarget}
              styles={{ menuPortal: (base) => ({ ...base, zIndex: 2000 }) }}
              menuPosition="fixed"
              menuShouldScrollIntoView={false}
              noOptionsMessage={() => 'Aucun agent trouvé'}
              loadingMessage={() => 'Chargement des agents...'}
            />
          )}
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
        <Button type="submit" disabled={isCreating}>
          {isCreating ? 'Creating...' : 'Create user'}
        </Button>
      </FormRow>
    </Form>
  );
}

export default NewUser;

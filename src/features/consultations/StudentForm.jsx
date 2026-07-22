import { useState } from 'react';
import CreatableSelect from 'react-select/creatable';
import Heading from '../../ui/Heading';
import Button from '../../ui/Button';
import Field from '../../ui/Field';
import { quartierHooks } from '../../hooks/hookIndex';

function StudentForm({ data, onConfirm }) {
  const [quartier, setQuartier] = useState(null);

  const { useGetAll, useCreateEdit } = quartierHooks;

  const { data: quartiers, isLoading: isLoadingQuartiers } = useGetAll();
  const { createEdit: createQuartier, isWorking: isCreating } = useCreateEdit();

  const {
    civilite,
    nom,
    prenoms,
    codeEcole,
    libelleFiliere,
    specialite,
    email,
    telephone,
    dateNaissance,
  } = data?.data?.personne ?? {};

  const quartiersData = Array.isArray(quartiers)
    ? quartiers
    : quartiers?.data || quartiers?.quartiers || [];

  const quartierOptions = quartiersData.map((q) => ({
    value: q.quartiers_id,
    label: q.libelle,
  }));

  function handleCreateQuartier(inputValue) {
    setQuartier({ value: inputValue, label: inputValue });
    createQuartier(
      { libelle: inputValue, code: inputValue },
      {
        onSuccess: (responseData) => {
          const newId =
            responseData?.data?.quartiers_id ??
            responseData?.quartiers_id ??
            inputValue;
          setQuartier({ value: newId, label: inputValue });
        },
      }
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <Heading as="h3">
        {civilite} {nom} {prenoms}
      </Heading>

      <div className="grid gap-[2rem_3rem] grid-cols-2">
        <Field label="École" value={codeEcole} />
        <Field label="Filière" value={libelleFiliere} />

        <Field label="Spécialité" value={specialite} />
        <Field label="Date de naissance" value={dateNaissance} />

        <Field label="Téléphone" value={telephone} />
        <Field label="Email" value={email} />

        <div className="flex flex-col gap-1 col-span-2">
          <span className="text-xl font-medium text-grey-500 uppercase tracking-wide">
            Quartier
          </span>
          <CreatableSelect
            inputId="quartier"
            options={quartierOptions}
            value={quartier}
            onChange={setQuartier}
            onCreateOption={handleCreateQuartier}
            isLoading={isLoadingQuartiers || isCreating}
            isDisabled={isCreating}
            menuPosition="fixed"
            menuShouldScrollIntoView={false}
            placeholder="Sélectionner ou créer un quartier..."
            formatCreateLabel={(inputValue) => `Créer "${inputValue}"`}
          />
        </div>
      </div>

      <div>
        <Button type="button" onClick={onConfirm}>
          Confirmer et continuer
        </Button>
      </div>
    </div>
  );
}

export default StudentForm;

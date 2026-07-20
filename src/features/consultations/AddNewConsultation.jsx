import { useState } from 'react';
import Select from 'react-select';
import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import { useSearchPatient } from './useSearchPatient';
import Button from '../../ui/Button';
import AgentForm from './AgentForm';
import StudentForm from './StudentForm';
import GeneralForm from './GeneralForm';

const typePersonneOptions = [
  { value: 'etudiant', label: 'Étudiant' },
  { value: 'agent', label: 'Agent/personnel' },
  { value: 'autre', label: 'Autre' },
];

function AddNewConsultation() {
  const [typePersonne, setTypePersonne] = useState(null);
  const [matricule, setMatricule] = useState('');
  const [submittedSearch, setSubmittedSearch] = useState(null);

  const needsMatricule =
    Boolean(typePersonne?.value) && typePersonne.value !== 'autre';

  const isLocked = Boolean(submittedSearch);

  const { patientSearch, isLoading: isSearching } = useSearchPatient(
    submittedSearch?.type_personne,
    submittedSearch?.matricule
  );

  function handleTypePersonneChange(selected) {
    if (isLocked) return;
    setTypePersonne(selected);
    setMatricule('');
    setSubmittedSearch(null);
  }

  function handleSearch(e) {
    e?.preventDefault?.();
    if (!typePersonne?.value || !matricule || isLocked) return;
    setSubmittedSearch({ type_personne: typePersonne.value, matricule });
  }

  function handleClear() {
    setTypePersonne(null);
    setMatricule('');
    setSubmittedSearch(null);
  }

  const showRestOfForm =
    typePersonne?.value === 'autre' || (!isSearching && patientSearch);

  return (
    <div className="flex flex-col gap-6">
      <Form onSubmit={handleSearch}>
        <FormRow label="Type de patient">
          <Select
            inputId="patient-type"
            options={typePersonneOptions}
            value={typePersonne}
            onChange={handleTypePersonneChange}
            isDisabled={isLocked}
            menuPosition="fixed"
            menuShouldScrollIntoView={false}
          />
        </FormRow>

        {needsMatricule && (
          <FormRow label="Matricule">
            <Input
              type="text"
              id="matricule"
              value={matricule}
              disabled={isLocked}
              onChange={(e) => setMatricule(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch(e)}
            />
          </FormRow>
        )}

        {Boolean(typePersonne) && needsMatricule && (
          <FormRow>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <Button
                type="button"
                onClick={handleSearch}
                disabled={!matricule || isSearching || isLocked}
              >
                {isSearching ? 'Recherche...' : 'Rechercher'}
              </Button>

              {isLocked && (
                <Button
                  type="button"
                  variation="secondary"
                  onClick={handleClear}
                >
                  Effacer
                </Button>
              )}
            </div>
          </FormRow>
        )}
      </Form>

      {showRestOfForm && typePersonne?.value === 'agent' && (
        <AgentForm data={patientSearch} />
      )}

      {showRestOfForm && typePersonne?.value === 'etudiant' && (
        <StudentForm data={patientSearch} />
      )}

      {showRestOfForm && typePersonne?.value === 'autre' && <GeneralForm />}
    </div>
  );
}

export default AddNewConsultation;

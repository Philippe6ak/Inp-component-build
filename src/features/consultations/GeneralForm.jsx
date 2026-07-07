import { useForm } from 'react-hook-form';
import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Heading from '../../ui/Heading';
import Input from '../../ui/Input';
import Button from '../../ui/Button';

const defaultValues = {
  nom: '',
  prenom: '',
  sexe: '',
  civilite: '',
  emploi: '',
  quartier: '',
  telephone: '',
  email: '',
  dateNaissance: '',
};

function GeneralForm({ onSubmit }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues,
  });

  function handleFormSubmit(data) {
    // onSubmit?.(data);
    console.log('Form submitted:', data);
  }

  return (
    <>
      <Heading as="h3">Informations patient</Heading>
      <Form onSubmit={handleSubmit(handleFormSubmit)}>
        <FormRow label="Nom" error={errors?.nom?.message}>
          <Input
            type="text"
            id="generalNom"
            {...register('nom', { required: 'Le nom est requis' })}
          />
        </FormRow>

        <FormRow label="Prenom" error={errors?.prenom?.message}>
          <Input
            type="text"
            id="generalPrenom"
            {...register('prenom', { required: 'Le prénom est requis' })}
          />
        </FormRow>

        <FormRow label="Sexe" error={errors?.sexe?.message}>
          <Input type="text" id="generalSexe" {...register('sexe')} />
        </FormRow>

        <FormRow label="Civilite" error={errors?.civilite?.message}>
          <Input type="text" id="generalCivilite" {...register('civilite')} />
        </FormRow>

        <FormRow label="Emploi" error={errors?.emploi?.message}>
          <Input type="text" id="generalEmploi" {...register('emploi')} />
        </FormRow>

        <FormRow label="Quartier" error={errors?.quartier?.message}>
          <Input
            type="text"
            id="generalQuartier"
            disabled={true}
            {...register('quartier')}
          />
        </FormRow>

        <FormRow label="Telephone" error={errors?.telephone?.message}>
          <Input type="tel" id="generalTelephone" {...register('telephone')} />
        </FormRow>

        <FormRow label="Email" error={errors?.email?.message}>
          <Input type="email" id="generalEmail" {...register('email')} />
        </FormRow>

        <FormRow label="Date naissance" error={errors?.dateNaissance?.message}>
          <Input
            type="date"
            id="generalDateNaissance"
            {...register('dateNaissance')}
          />
        </FormRow>

        <FormRow>
          <Button type="submit">Enregistrer et continuer</Button>
        </FormRow>
      </Form>
    </>
  );
}

export default GeneralForm;

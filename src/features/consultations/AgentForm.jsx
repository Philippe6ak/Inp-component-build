import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Heading from '../../ui/Heading';
import Input from '../../ui/Input';

function AgentForm({ data }) {
  const {
    civilite,
    nom,
    prenom,
    typeAgent,
    fonction,
    email,
    telephone,
    dateNaissance,
    emploi,
  } = data.data.personne ?? {};

  console.log('AgentForm data:', data.data.personne);

  return (
    <>
      <Heading as="h1">
        {civilite} {nom} {prenom}
      </Heading>
      <Form onSubmit={() => {}}>
        <FormRow label="Type agent">
          <Input
            type="text"
            id="typeAgent"
            defaultValue={typeAgent ?? ''}
            disabled={true}
          />
        </FormRow>
        <FormRow label="Fonction">
          <Input
            type="text"
            id="fonction"
            defaultValue={fonction ?? ''}
            disabled={true}
          />
        </FormRow>
        <FormRow label="Email">
          <Input
            type="email"
            id="email"
            defaultValue={email ?? ''}
            disabled={true}
          />
        </FormRow>
        <FormRow label="Telephone">
          <Input
            type="tel"
            id="tel"
            defaultValue={telephone ?? ''}
            disabled={true}
          />
        </FormRow>
        <FormRow label="Date Naissance">
          <Input
            type="date"
            id="dateNaissance"
            defaultValue={dateNaissance ?? ''}
            disabled={true}
          />
        </FormRow>
        <FormRow label="Emploi">
          <Input
            type="text"
            id="emploi"
            defaultValue={emploi ?? ''}
            disabled={true}
          />
        </FormRow>
      </Form>
    </>
  );
}

export default AgentForm;

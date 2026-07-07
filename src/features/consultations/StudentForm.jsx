import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Heading from '../../ui/Heading';
import Input from '../../ui/Input';

function StudentForm() {
  return (
    <>
      <Heading as="h1">Sexe Nom Prenom (from api)</Heading>
      <Form onSubmit={() => {}}>
        <FormRow label="Ecole">
          <Input type="text" id="ecole" disabled={true} />
        </FormRow>
        <FormRow label="Filiere">
          <Input type="text" id="filiere" disabled={true} />
        </FormRow>
        <FormRow label="Specialite">
          <Input type="text" id="specialite" disabled={true} />
        </FormRow>
        <FormRow label="Email">
          <Input type="email" id="email" disabled={true} />
        </FormRow>
        <FormRow label="Telephone">
          <Input type="tel" id="tel" disabled={true} />
        </FormRow>
        <FormRow label="Date Naissance">
          <Input type="date" id="dateNaissance" disabled={true} />
        </FormRow>
      </Form>
    </>
  );
}

export default StudentForm;

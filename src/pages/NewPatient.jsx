import UpdateSettingsForm from '../features/settings/UpdateSettingsForm';
import Heading from '../ui/Heading';
import Row from '../ui/Row';

function NewPatient() {
  return (
    <Row>
      <Heading as="h1">Ajouter un nouveau patient</Heading>
      <UpdateSettingsForm />
    </Row>
  );
}

export default NewPatient;

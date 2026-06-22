import Row from '../ui/Row';
import Heading from '../ui/Heading';
import ListSpecialty from '../features/administration/ListSpecialty';
import SpecialtyOperations from '../features/administration/SpecialtyOperations';

function Specialties() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Toutes les Spécialités</Heading>
        <SpecialtyOperations />
      </Row>
      <ListSpecialty />
    </>
  );
}

export default Specialties;

import Row from '../ui/Row';
import Heading from '../ui/Heading';
import ListSpecialty from '../features/administration/specialties/ListSpecialty';
import SortOperations from './SortOperations';

function Specialties() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Toutes les Spécialités</Heading>
        <SortOperations />
      </Row>
      <ListSpecialty />
    </>
  );
}

export default Specialties;

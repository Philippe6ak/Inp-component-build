import Row from '../ui/Row';
import Heading from '../ui/Heading';
import ListMedicament from '../features/Pharmacie/medicament/ListMedicament';
import SortOperations from './SortOperations';

function Medicament() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Tous les Medicaments</Heading>
        <SortOperations />
      </Row>
      <ListMedicament />
    </>
  );
}

export default Medicament;

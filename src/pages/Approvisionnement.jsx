import Heading from '../ui/Heading';
import Row from '../ui/Row';
import ApprovisionnementTable from '../features/Pharmacie/approvisionnement/ListApprov';
import LibelleOperations from '../ui/LibelleOperations';

function Approvisionnement() {
  return (
    <div>
      <Row type="horizontal">
        <Heading as="h1">Tous les Approvisionnements</Heading>
        <LibelleOperations />
      </Row>
      <ApprovisionnementTable />
    </div>
  );
}
export default Approvisionnement;

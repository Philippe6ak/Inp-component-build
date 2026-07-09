import Row from '../ui/Row';
import Heading from '../ui/Heading';
import ListQuartiers from '../features/administration/quartiers/ListQuartiers';
import SortOperations from './SortOperations';
function Quartiers() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Tous les quartiers</Heading>
        <SortOperations />
      </Row>
      <ListQuartiers />
    </>
  );
}

export default Quartiers;

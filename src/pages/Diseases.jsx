import Row from '../ui/Row';
import Heading from '../ui/Heading';
import ListDisease from '../features/administration/diseases/ListDisease';
import SortOperations from './SortOperations';

function Diseases() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Toutes les Maladies</Heading>
        <SortOperations />
      </Row>
      <ListDisease />
    </>
  );
}

export default Diseases;

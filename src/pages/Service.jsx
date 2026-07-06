import Row from '../ui/Row';
import Heading from '../ui/Heading';
import ListServices from '../features/orientations/servicesSante/ListServices';
import SortOperations from './SortOperations';

function Services() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Tous les Services</Heading>
        <SortOperations />
      </Row>
      <ListServices />
    </>
  );
}

export default Services;

import Row from '../ui/Row';
import Heading from '../ui/Heading';
import ListExamen from '../features/administration/examens/ListExamen';
import SortOperations from './SortOperations';

function Examens() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Toutes les examens</Heading>
        <SortOperations />
      </Row>
      <ListExamen />
    </>
  );
}

export default Examens;

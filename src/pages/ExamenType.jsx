import Row from '../ui/Row';
import Heading from '../ui/Heading';
import ListTypeExam from '../features/type/examenType/ListTypeExam';
import SortOperations from './SortOperations';

function ExamenType() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Tous les Examens</Heading>
        <SortOperations />
      </Row>
      <ListTypeExam />
    </>
  );
}

export default ExamenType;

import Row from '../ui/Row';
import Heading from '../ui/Heading';
import ListTypeExam from '../features/type/examenType/ListTypeExam';

function ExamenType() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Tous les Examens</Heading>
      </Row>
      <ListTypeExam />
    </>
  );
}

export default ExamenType;

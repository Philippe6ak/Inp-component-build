import Row from '../ui/Row';
import Heading from '../ui/Heading';
import ListTypeExam from '../features/type/examenType/ListTypeExam';
import DiseaseOperations from '../features/type/diseasesType/DiseaseTypeOperation';

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

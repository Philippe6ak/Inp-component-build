import Row from '../ui/Row';
import Heading from '../ui/Heading';
import ListTypeExam from '../features/type/examenType/ListTypeExam';
import DiseaseOperations from '../features/type/diseasesType/DiseaseOperationType';

function TypeExam() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Tous les Examens</Heading>
        <DiseaseOperations />
      </Row>
      <ListTypeExam />
    </>
  );
}

export default TypeExam;

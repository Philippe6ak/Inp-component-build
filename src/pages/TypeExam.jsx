import Row from '../ui/Row';
import Heading from '../ui/Heading';
import ListTypeExam from '../features/administration/typeexamen/ListTypeExam';
import DiseaseOperations from '../features/administration/diseasestype/DiseaseOperationTyp';

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

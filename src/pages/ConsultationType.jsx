import Heading from '../ui/Heading';
import Row from '../ui/Row';
import ConsultationTypeOperations from '../features/type/consultationType/ConsultationTypeOperations';
import ListConsultationType from '../features/type/consultationType/ListConsultationType';

function ConsultationType() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Types de consultations</Heading>
        <ConsultationTypeOperations />
      </Row>
      <ListConsultationType />
    </>
  );
}

export default ConsultationType;

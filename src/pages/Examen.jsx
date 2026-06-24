import Row from '../ui/Row';
import Heading from '../ui/Heading';
import ListExamen from '../features/administration/examens/ListExamen';

function Examens() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Toutes les examens</Heading>
        {/* <DiseaseOperations /> */}
      </Row>
      <ListExamen />
    </>
  );
}

export default Examens;

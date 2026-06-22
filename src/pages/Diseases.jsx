import Row from '../ui/Row';
import Heading from '../ui/Heading';
import ListDisease from '../features/administration/diseases/ListDisease';

function Diseases() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Toutes les Maladies</Heading>
        {/* <DiseaseOperations /> */}
      </Row>
      <ListDisease />
    </>
  );
}

export default Diseases;

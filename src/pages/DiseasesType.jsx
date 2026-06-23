import Row from '../ui/Row';
import Heading from '../ui/Heading';
import ListDiseaseType from '../features/type/diseasesType/ListDiseaseType';
function DiseasesType() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Toutes les Maladies</Heading>
        {/* <DiseaseOperations /> */}
      </Row>
      <ListDiseaseType />
    </>
  );
}

export default DiseasesType;

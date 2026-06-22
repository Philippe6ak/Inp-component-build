import Row from '../ui/Row';
import Heading from '../ui/Heading';
import ListDiseaseTyp from '../features/administration/diseasestype/ListDiseaseTyp';
function DiseasesType() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Toutes les Maladies</Heading>
        {/* <DiseaseOperations /> */}
      </Row>
      <ListDiseaseTyp />
    </>
  );
}

export default DiseasesType;

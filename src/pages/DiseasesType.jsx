import Row from '../ui/Row';
import Heading from '../ui/Heading';
import ListDiseaseType from '../features/type/diseasesType/ListDiseaseType';
import DiseaseTypeOperation from '../features/type/diseasesType/DiseaseTypeOperation';

function DiseasesType() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Toutes les Maladies</Heading>
        <DiseaseTypeOperation />
      </Row>
      <ListDiseaseType />
    </>
  );
}

export default DiseasesType;

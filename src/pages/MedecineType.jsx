import Row from '../ui/Row';
import Heading from '../ui/Heading';
import ListTypeMedecine from '../features/type/medecineType/ListMedecineType';

function TypeMedecine() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Tous les Médicaments</Heading>
      </Row>
      <ListTypeMedecine />
    </>
  );
}

export default TypeMedecine;

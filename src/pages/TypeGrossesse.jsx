import Row from '../ui/Row';
import Heading from '../ui/Heading';
import ListTypeGrossesse from '../features/grossesse/typegrossesse/ListTypeGrossesse';
import LibelleOperations from '../ui/LibelleOperations';

function TypeGrossesse() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Tous les types de grossesse</Heading>
        <LibelleOperations />
      </Row>
      <ListTypeGrossesse />
    </>
  );
}

export default TypeGrossesse;

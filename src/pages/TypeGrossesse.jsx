import Row from '../ui/Row';
import Heading from '../ui/Heading';
import ListTypeGrossesse from '../features/grossesse/typegrossesse/ListTypeGrossesse';
import GrossesseOperations from '../features/grossesse/typegrossesse/GrosesseOperations';

function TypeGrossesse() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Tous les types de grossesse</Heading>
        <GrossesseOperations />
      </Row>
      <ListTypeGrossesse />
    </>
  );
}

export default TypeGrossesse;

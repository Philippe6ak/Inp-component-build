import Row from '../ui/Row';
import Heading from '../ui/Heading';
import ListTypeGrossesse from '../features/type/grossesseType/ListGrossesseType';
import SortOperations from './SortOperations';

function TypeGrossesse() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Tous les Types de Grossesse</Heading>
        <SortOperations />
      </Row>
      <ListTypeGrossesse />
    </>
  );
}

export default TypeGrossesse;

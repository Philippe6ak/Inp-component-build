import Row from '../ui/Row';
import Heading from '../ui/Heading';
import ListGrossessesType from '../features/type/grossesseType/ListGrossessesType';
import SortOperations from './SortOperations';

function GrossessesType() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Tous les types de Grossesses</Heading>
        <SortOperations />
      </Row>
      <ListGrossessesType />
    </>
  );
}

export default GrossessesType;

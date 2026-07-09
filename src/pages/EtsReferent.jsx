import Row from '../ui/Row';
import Heading from '../ui/Heading';
import ListEtsReferent from '../features/orientations/etablissementref/ListEtsReferent';
import SortOperations from './SortOperations';

function EtsReferent() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Tous les Etablissements</Heading>
        <SortOperations />
      </Row>
      <ListEtsReferent />
    </>
  );
}

export default EtsReferent;

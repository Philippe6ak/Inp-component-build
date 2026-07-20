import Row from '../ui/Row';
import Heading from '../ui/Heading';
import ListEtatGrossesse from '../features/grossesse/etatgrossesse/ListEtatGrossesse';
import LibelleOperations from '../ui/LibelleOperations';

function EtatGrossesse() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Tous les etats de grossesse</Heading>
        <LibelleOperations />
      </Row>
      <ListEtatGrossesse />
    </>
  );
}

export default EtatGrossesse;

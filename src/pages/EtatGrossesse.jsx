import Row from '../ui/Row';
import Heading from '../ui/Heading';
import ListEtatGrossesse from '../features/grossesse/etatgrossesse/ListEtatGrossesse';
import GrossesseOperations from '../features/grossesse/etatgrossesse/GrosesseOperations';

function EtatGrossesse() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Tous les etats de grossesse</Heading>
        <GrossesseOperations />
      </Row>
      <ListEtatGrossesse />
    </>
  );
}

export default EtatGrossesse;

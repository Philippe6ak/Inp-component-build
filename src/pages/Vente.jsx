import React from 'react';
import Heading from '../ui/Heading';
import Row from '../ui/Row';
import VenteTable from '../features/Pharmacie/vente/ListVente';

function Vente() {
  return (
    <div>
      <Row type="horizontal">
        <Heading as="h1">Toute les ventes</Heading>
      </Row>
      <VenteTable />
    </div>
  );
}
export default Vente;

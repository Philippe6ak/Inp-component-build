import React from 'react';
import Heading from '../ui/Heading';
import Row from '../ui/Row';
//import ApprovisionnementTable from '../features/Pharmacie/approvisionnement/ListApprov';

function Approvisionnement() {
  return (
    <div>
      <Row type="horizontal">
        <Heading as="h1">Tous les Approvisionnements</Heading>
      </Row>
      {/*<ApprovisionnementTable />*/}
    </div>
  );
}
export default Approvisionnement;

import Row from '../ui/Row';
import Heading from '../ui/Heading';
import ListMethodeDepistage from '../features/administration/methodesdepistage/ListMethodeDepistage';
import MethodeDepistageOperations from '../features/administration/methodesdepistage/MethodeDepistageOperations';

function MethodeDepistage() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Toutes les méthodes de dépistage</Heading>
        <MethodeDepistageOperations />
      </Row>
      <ListMethodeDepistage />
    </>
  );
}

export default MethodeDepistage;

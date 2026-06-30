import Row from '../ui/Row';
import Heading from '../ui/Heading';
import ListPermissions from '../features/administration/permissions/listPermissions';
import SortOperations from './SortOperations';

function Diseases() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Toutes les Permissions</Heading>
        <SortOperations />
      </Row>
      <ListPermissions />
    </>
  );
}

export default Diseases;

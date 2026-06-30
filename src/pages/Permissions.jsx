import Row from '../ui/Row';
import Heading from '../ui/Heading';
import ListPermissions from '../features/administration/permissions/listPermissions';
import PermissionsTableOperations from '../features/administration/permissions/PermissionsOperations';

function Diseases() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Toutes les Permissions</Heading>
        <PermissionsTableOperations />
      </Row>
      <ListPermissions />
    </>
  );
}

export default Diseases;

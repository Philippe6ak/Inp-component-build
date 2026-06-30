import Row from '../ui/Row';
import PermissionsHeader from '../features/administration/permissions/PermissionsHeader';
import PermissionsLayout from '../features/administration/permissions/PermissionsLayout';
import PermissionsTableOperations from '../features/administration/permissions/PermissionsOperations';

function Permissions() {
  return (
    <Row type="vertical">
      <PermissionsHeader />
      {/* <PermissionsTableOperations /> */}
      <PermissionsLayout />
      {/* <ListPermissions /> */}
    </Row>
  );
}

export default Permissions;

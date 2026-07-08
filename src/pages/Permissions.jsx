import Row from '../ui/Row';
import PermissionsHeader from '../features/administration/permissions/PermissionsHeader';
import PermissionsLayout from '../features/administration/permissions/PermissionsLayout';

function Permissions() {
  return (
    <Row type="vertical">
      <PermissionsHeader />
      <PermissionsLayout />
    </Row>
  );
}

export default Permissions;

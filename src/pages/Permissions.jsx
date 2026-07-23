import Row from '../ui/Row';
import Spinner from '../ui/Spinner';
import PermissionsHeader from '../features/administration/permissions/PermissionsHeader';
import PermissionsLayout from '../features/administration/permissions/PermissionsLayout';
import { permissionsHooks } from '../hooks/hookIndex';

function Permissions() {
  const { useGetAll } = permissionsHooks;
  const { isLoading, error, data: permissions } = useGetAll();

  if (isLoading) return <Spinner />;
  if (error) return <p>Erreur lors du chargement des permissions.</p>;

  return (
    <Row type="vertical">
      <PermissionsHeader permissions={permissions} />
      <PermissionsLayout permissions={permissions} />
    </Row>
  );
}

export default Permissions;

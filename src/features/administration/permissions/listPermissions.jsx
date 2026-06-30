import Button from '../../../ui/Button';
import Empty from '../../../ui/Empty';
import Menus from '../../../ui/Menus';
import Modal from '../../../ui/Modal';
import Spinner from '../../../ui/Spinner';
import Table from '../../../ui/Table';
import NewPermissions from './NewPermissions';
import { UsePermissions } from './UsePermissions';
import PermissionsRow from './PermissionsRow';
import { useSearchParams } from 'react-router-dom';

function ListPermissions() {
  const { isLoading, error, permissions } = UsePermissions();
  const [searchParams] = useSearchParams();

  if (isLoading) return <Spinner />;

  if (error) {
    return <p>Erreur lors du chargement des permissions.</p>;
  }

  const permissionsData = Array.isArray(permissions)
    ? permissions
    : permissions?.data || permissions?.permissions || [];

  const sortBy = searchParams.get('sortBy') || 'code-asc';
  const [field, direction] = sortBy.split('-');
  const sortedPermissions = [...permissionsData].sort((a, b) => {
    if (!['name'].includes(field)) return 0;
    const firstValue = String(a?.[field] ?? '');
    const secondValue = String(b?.[field] ?? '');
    const result = firstValue.localeCompare(secondValue, undefined, {
      numeric: true,
      sensitivity: 'base',
    });
    return direction === 'desc' ? -result : result;
  });

  return (
    <Menus>
      <div className="mb-[1.6rem] flex justify-end">
        <Modal>
          <Modal.Open opens="create-permissions">
            <Button>Nouvelle Permission</Button>
          </Modal.Open>

          <Modal.Window name="create-permissions">
            <NewPermissions />
          </Modal.Window>
        </Modal>
      </div>

      {!sortedPermissions.length ? (
        <Empty ressourceName="permissions" />
      ) : (
        <Table columns="2fr 2fr">
          <Table.Header>
            <div>Libelle</div>
            <div></div>
          </Table.Header>

          <Table.Body
            data={sortedPermissions}
            render={(permissions) => (
              <PermissionsRow
                permissions={permissions}
                key={permissions.permissions_id}
              />
            )}
          />
        </Table>
      )}
    </Menus>
  );
}

export default ListPermissions;

import Menus from '../../../ui/Menus';
import Spinner from '../../../ui/Spinner';
import Table from '../../../ui/Table';
import Empty from '../../../ui/Empty';
import Pagination from '../../../ui/Pagination';
import Checkbox from '../../../ui/Checkbox';

import { permissionsHooks } from '../../../hooks/hookIndex';
import PermissionsRow from './PermissionsRow';
import { useSearchParams } from 'react-router-dom';

function PermissionsLayout() {
  const { useGetAll } = permissionsHooks;
  const { isLoading, error, data: permissions } = useGetAll();
  const [searchParams] = useSearchParams();

  if (isLoading) return <Spinner />;

  if (error) {
    return <p>Erreur lors du chargement des permissions.</p>;
  }

  const permissionsData = Array.isArray(permissions?.data)
    ? permissions.data
    : permissions?.permissions || [];

  const sortBy = searchParams.get('sortBy') || 'name-asc';
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

  const resultCount = sortedPermissions.length;

  return (
    <Menus>
      {!sortedPermissions.length ? (
        <Empty ressourceName="permissions" />
      ) : (
        <Table columns="repeat(7, 1fr)">
          <Table.Header>
            <Checkbox id="select-all" />
            <div>Permission</div>
            <div>Ressource</div>
            <div>Description</div>
            <div>Utilisée par</div>
            <div>Statut</div>
            <div>Actions</div>
          </Table.Header>

          <Table.Body
            data={sortedPermissions}
            render={(permission) => (
              <PermissionsRow
                permission={permission}
                key={permission.permissions_id}
              />
            )}
          />

          <Table.Footer>
            <Pagination resultCount={resultCount} />
          </Table.Footer>
        </Table>
      )}
    </Menus>
  );
}

export default PermissionsLayout;

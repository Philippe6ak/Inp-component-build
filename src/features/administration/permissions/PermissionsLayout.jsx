import Menus from '../../../ui/Menus';
import Table from '../../../ui/Table';
import Empty from '../../../ui/Empty';
import Pagination from '../../../ui/Pagination';
import PermissionsRow from './PermissionsRow';
import { useSearchParams } from 'react-router-dom';

function PermissionsLayout({ permissions }) {
  const [searchParams] = useSearchParams(); //librairie

  const sortBy = searchParams.get('sortBy') || 'name-asc'; //librairie
  const [field, direction] = sortBy.split('-');

  const sortedPermissions = [...permissions].sort((a, b) => {
    if (!['name'].includes(field)) return 0;
    const firstValue = String(a?.[field] ?? '');
    const secondValue = String(b?.[field] ?? '');
    const result = firstValue.localeCompare(secondValue, undefined, {
      numeric: true,
      sensitivity: 'base',
    });
    return direction === 'desc' ? -result : result;
  });

  if (!sortedPermissions.length) return <Empty ressourceName="permissions" />;

  return (
    <Menus>
      <Table columns="2fr 3fr 2fr 0.5fr">
        <Table.Header>
          <div>Permission</div>
          <div>Description</div>
          <div>Rôles</div>
          <div></div>
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
          <Pagination resultCount={sortedPermissions.length} />
        </Table.Footer>
      </Table>
    </Menus>
  );
}

export default PermissionsLayout;

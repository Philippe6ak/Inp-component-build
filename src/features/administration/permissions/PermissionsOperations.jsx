import SortBy from '../../ui/SortBy';
import TableOperations from '../../ui/TableOperations';

function PermissionsTableOperations() {
  return (
    <TableOperations>
      <SortBy
        options={[
          { value: 'permissions-desc', label: 'Sort by role (Z-A)' },
          { value: 'permissions-asc', label: 'Sort by role (A-Z)' },
        ]}
      />
    </TableOperations>
  );
}

export default RolesTableOperations;

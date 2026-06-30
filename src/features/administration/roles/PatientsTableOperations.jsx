import SortBy from '../../ui/SortBy';
import TableOperations from '../../ui/TableOperations';

function RolesTableOperations() {
  return (
    <TableOperations>
      <SortBy
        options={[
          { value: 'role-desc', label: 'Sort by role (Z-A)' },
          { value: 'role-asc', label: 'Sort by role (A-Z)' },
        ]}
      />
    </TableOperations>
  );
}

export default RolesTableOperations;

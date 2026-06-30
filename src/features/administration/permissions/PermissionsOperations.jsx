import SortBy from '../../../ui/SortBy';
import TableOperations from '../../../ui/TableOperations';

function PermissionsTableOperations() {
  return (
    <TableOperations>
      <SortBy
        options={[
          { value: 'all', label: 'Toutes les ressources' },
          { value: 'users', label: 'Utilisateurs' },
          { value: 'roles', label: 'Rôles' },
          { value: 'dashboard', label: 'Dashboard' },
        ]}
      />
    </TableOperations>
  );
}

export default PermissionsTableOperations;

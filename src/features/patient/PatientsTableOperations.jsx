import SortBy from '../../ui/SortBy';
import TableOperations from '../../ui/TableOperations';

function PatientsTableOperations() {
  return (
    <TableOperations>
      <SortBy
        options={[
          { value: 'nom-desc', label: 'Sort by name (Z-A)' },
          { value: 'nom-asc', label: 'Sort by name (A-Z)' },
        ]}
      />
    </TableOperations>
  );
}

export default PatientsTableOperations;

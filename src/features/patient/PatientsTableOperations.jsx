import SortBy from '../../ui/SortBy';
import Filter from '../../ui/Filter';
import TableOperations from '../../ui/TableOperations';

function PatientsTableOperations() {
  return (
    <TableOperations>
      {/* <Filter
        filterField="status"
        options={[
          { value: 'all', label: 'All' },
          { value: 'nom', label: 'Nom' },
          { value: 'prenom', label: 'Prénom' },
        ]}
      /> */}

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

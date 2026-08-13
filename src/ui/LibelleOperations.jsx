import SortBy from './SortBy';
import TableOperations from './TableOperations';

function LibelleOperations() {
  return (
    <>
      <TableOperations>
        <SortBy
          options={[
            { value: 'libelle-asc', label: 'Sort by libelle (A-Z)' },
            { value: 'libelle-desc', label: 'Sort by libelle (Z-A)' },
          ]}
        />
      </TableOperations>
    </>
  );
}

export default LibelleOperations;

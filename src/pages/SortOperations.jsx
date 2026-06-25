import SortBy from '../ui/SortBy';
import TableOperations from '../ui/TableOperations';

function SortOperations() {
  return (
    <>
      <TableOperations>
        <SortBy
          options={[
            { value: 'code-asc', label: 'Sort by code (A-Z)' },
            { value: 'code-desc', label: 'Sort by code (Z-A)' },

            { value: 'libelle-asc', label: 'Sort by libelle (A-Z)' },
            { value: 'libelle-desc', label: 'Sort by libelle (Z-A)' },
          ]}
        />
      </TableOperations>
    </>
  );
}

export default SortOperations;

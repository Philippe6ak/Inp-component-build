import Filter from "../../ui/Filter";
import SortBy from "../../ui/SortBy";
import TableOperations from "../../ui/TableOperations";

function TableSortingFiltering() {
  return (
    <TableOperations>
      <Filter
        filterField="status"
        options={[
          { value: "all", label: "All" },
          { value: "on-deck", label: "On Deck" },
          { value: "in-progress", label: "In Progress" },
          { value: "testing", label: "Testing" },
          { value: "deployed", label: "Deployed" },
        ]}
      />

      <SortBy
        options={[
          { value: "task-asc", label: "Sort by task (A-Z)" },
          { value: "task-desc", label: "Sort by task (Z-A)" },
          // { value: "status-asc", label: "Sort by status (On Deck first)" },
          // { value: "status-desc", label: "Sort by status (Deployed first)" },
          { value: "due-asc", label: "Sort by due date (earliest first)" },
          { value: "due-desc", label: "Sort by due date (latest first)" },
        ]}
      />
    </TableOperations>
  );
}

export default TableSortingFiltering;

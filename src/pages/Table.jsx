import DataTable from "../features/table/DataTable";
import TableSortingFiltering from "../features/table/TableSortingFiltering";
import Heading from "../ui/Heading";
import Row from "../ui/Row";

function Table() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Sortable Table</Heading>
        <TableSortingFiltering />
      </Row>
      <DataTable />
    </>
  );
}

export default Table;

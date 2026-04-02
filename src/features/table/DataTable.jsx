import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useState } from 'react';
import styled from 'styled-components';
import DateCell from './DateCell';
import EditableCell from './EditableCell';
import StatusCell from './StatusCell';
import DATA from './tableData';
import useProcessedData from './useProcessedData';
import Table from '../../ui/Table';

// Styled components
const Resizer = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  height: 100%;
  width: 5px;
  cursor: col-resize;
  user-select: none;
  touch-action: none;
  background: ${(props) =>
    props.$isResizing ? 'transparent' : 'var(--color-grey-900)'};
  &:hover {
    background: var(--color-grey-200);
  }
`;

const HeaderCell = styled.div`
  position: relative;
  padding-right: 8px;
  height: 100%;
  display: flex;
  align-items: center;
`;

const columns = [
  {
    accessorKey: 'task',
    header: 'Task',
    size: 300,
    cell: EditableCell,
  },
  {
    accessorKey: 'status',
    header: 'Status',
    size: 150,
    cell: StatusCell,
  },
  {
    accessorKey: 'due',
    header: 'Due',
    size: 120,
    cell: DateCell,
  },
  {
    accessorKey: 'notes',
    header: 'Notes',
    size: 300,
    cell: EditableCell,
  },
];

function DataTable() {
  const [data, setData] = useState(DATA);
  const processedData = useProcessedData(data);

  const table = useReactTable({
    data: processedData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    columnResizeMode: 'onChange',
    //todo later: add pagination using getPaginationRowModel
    meta: {
      updateData: (rowId, columnId, value) =>
        setData((old) =>
          old.map((row) => {
            if (row.id === rowId) {
              return {
                ...row,
                [columnId]: value,
              };
            }
            return row;
          })
        ),
    },
  });

  const gridTemplate = table
    .getAllColumns()
    .map((col) => `${col.getSize()}px`)
    .join(' ');

  return (
    <Table resizable columns={gridTemplate}>
      <Table.Header>
        {table.getHeaderGroups().map((headerGroup) =>
          headerGroup.headers.map((header) => (
            <HeaderCell key={header.id}>
              <div>
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
              </div>
              <Resizer
                onMouseDown={header.getResizeHandler()}
                onTouchStart={header.getResizeHandler()}
                $isResizing={header.column.getIsResizing()}
              />
            </HeaderCell>
          ))
        )}
      </Table.Header>

      <Table.Body
        data={table.getRowModel().rows}
        render={(row) => (
          <Table.Row key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <div key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </div>
            ))}
          </Table.Row>
        )}
      />
    </Table>
  );
}

export default DataTable;

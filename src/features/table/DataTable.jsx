import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import clsx from 'clsx';
import { useState } from 'react';
import Table from '../../ui/Table';
import DateCell from './DateCell';
import EditableCell from './EditableCell';
import StatusCell from './StatusCell';
import DATA from './tableData';
import useProcessedData from './useProcessedData';

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
            <div
              className="relative pr-[8px] h-full flex items-center"
              key={header.id}
            >
              <div>
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
              </div>
              <div
                className={clsx(
                  'absolute right-0 top-0 h-full w-0.5 cursor-col-resize select-none touch-none',
                  header.column.getIsResizing()
                    ? 'bg-transparent'
                    : 'bg-grey-900 hover:bg-grey-200'
                )}
                onMouseDown={header.getResizeHandler()}
                onTouchStart={header.getResizeHandler()}
              />
            </div>
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

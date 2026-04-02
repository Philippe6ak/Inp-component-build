import { createContext, useContext } from 'react';

const TableContext = createContext();

function Table({ columns, children }) {
  return (
    <TableContext.Provider value={{ columns }}>
      <div className="border border-grey-200 text-[14px] bg-grey-0 rounded-md overflow-hidden">
        {children}
      </div>
    </TableContext.Provider>
  );
}

function Header({ children }) {
  const { columns } = useContext(TableContext);
  return (
    <header
      role="row"
      style={{ gridTemplateColumns: columns }}
      className="grid gap-x-[24px] items-center px-[24px] py-[16px] bg-grey-50 border-b border-grey-100 uppercase tracking-[0.4px] font-semibold text-grey-600"
    >
      {children}
    </header>
  );
}

function Row({ children }) {
  const { columns } = useContext(TableContext);
  return (
    <div
      role="row"
      style={{ gridTemplateColumns: columns }}
      className="grid gap-x-[24px] items-center px-[24px] py-[12px] not-last:border-b not-last:border-grey-100"
    >
      {children}
    </div>
  );
}

function Body({ data, render }) {
  if (!data.length)
    return (
      <p className="text-[16px] font-medium text-center m-[24px]">
        No data to display
      </p>
    );
  return <section className="my-[4px]">{data.map(render)}</section>;
}

function Footer({ children }) {
  return (
    <footer className="bg-grey-50 flex justify-center p-[12px] [&:not(:has(*))]:hidden">
      {children}
    </footer>
  );
}

Table.Header = Header;
Table.Row = Row;
Table.Body = Body;
Table.Footer = Footer;

export default Table;

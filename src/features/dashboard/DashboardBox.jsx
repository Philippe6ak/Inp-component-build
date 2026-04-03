function DashboardBox({ children, className = '' }) {
  return (
    <div
      className={`bg-grey-0 border border-grey-100 rounded-(--border-radius-md) p-[3.2rem] flex flex-col gap-[2.4rem] ${className}`}
    >
      {children}
    </div>
  );
}

export default DashboardBox;

import clsx from 'clsx';

function Stat({ icon, title, value, color }) {
  return (
    <div className="bg-grey-0 border border-grey-100 rounded-md p-[1.6rem] grid grid-cols-[6.4rem_1fr] grid-rows-[auto_auto] gap-x-[1.6rem] gap-y-[0.4rem]">
      <div
        className={clsx(
          'row-span-full aspect-square rounded-full flex items-center justify-center',
          `bg-[var(--color-${color}-100)]`,
          `[&_svg]:w-[32px] [&_svg]:h-[32px]`,
          `[&_svg]:text-[var(--color-${color}-700)]`
        )}
      >
        {icon}
      </div>
      <h5 className="self-end text-[1.2rem] uppercase tracking-[0.4px] font-semibold text-grey-500">
        {title}
      </h5>
      <p className="text-[2.4rem] leading-1 font-medium">{value}</p>
    </div>
  );
}

export default Stat;

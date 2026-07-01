import clsx from 'clsx';
import PropTypes from 'prop-types';

const colorVariants = {
  blue: 'bg-[var(--color-blue-100)] [&_svg]:text-[var(--color-blue-700)]',
  green: 'bg-[var(--color-green-100)] [&_svg]:text-[var(--color-green-700)]',
  indigo: 'bg-[var(--color-indigo-100)] [&_svg]:text-[var(--color-indigo-700)]',
  yellow: 'bg-[var(--color-yellow-100)] [&_svg]:text-[var(--color-yellow-700)]',
};

function Stat({ icon, title, value, color }) {
  return (
    <div className="bg-grey-0 border border-grey-100 rounded-md p-[1.6rem] grid grid-cols-[6.4rem_1fr] grid-rows-[auto_auto] gap-x-[1.6rem] gap-y-[0.4rem]">
      <div
        className={clsx(
          'row-span-full aspect-square rounded-full flex items-center justify-center',
          `[&_svg]:w-[32px] [&_svg]:h-[32px]`,
          colorVariants[color]
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

Stat.propTypes = {
  icon: PropTypes.node,
  title: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  color: PropTypes.oneOf(['blue', 'green', 'indigo', 'yellow']),
};

export default Stat;

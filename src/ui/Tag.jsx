import clsx from 'clsx';

function Tag({ children, type, ...props }) {
  return (
    <span
      className={clsx(
        'w-fit uppercase text-[1.1rem] font-semibold px-[1.2rem] py-[0.4rem] rounded-[100px]',
        `text-[var(--color-${type}-700)]`,
        `bg-[var(--color-${type}-100)]`
      )}
      {...props}
    >
      {children}
    </span>
  );
}

export default Tag;

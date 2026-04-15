import clsx from 'clsx';

function Tag({ children, type, ...props }) {
  const tagStyles = {
    blue: 'text-[var(--color-blue-700)] bg-[var(--color-blue-100)]',
    green: 'text-[var(--color-green-700)] bg-[var(--color-green-100)]',
    silver: 'text-[var(--color-silver-700)] bg-[var(--color-silver-100)]',
    red: 'text-[var(--color-red-700)] bg-[var(--color-red-100)]',
  };

  return (
    <span
      className={clsx(
        'w-fit rounded-[100px] px-[1.2rem] py-[0.4rem] text-[1.1rem] font-semibold uppercase',
        tagStyles[type]
      )}
      onClick={() => console.log(type)}
      {...props}
    >
      {children}
    </span>
  );
}

export default Tag;

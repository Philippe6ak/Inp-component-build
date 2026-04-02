import clsx from 'clsx';

function Row({ type = 'vertical', children }) {
  return (
    <div
      className={clsx(
        'flex',
        type === 'horizontal' && 'justify-between items-center',
        type === 'vertical' && 'flex-col gap-[1.6rem]'
      )}
    >
      {children}
    </div>
  );
}

export default Row;

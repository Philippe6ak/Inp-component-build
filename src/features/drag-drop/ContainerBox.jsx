import { useDroppable } from '@dnd-kit/react';
import clsx from 'clsx';

function ContainerBox({ children }) {
  const { ref, isDropTarget } = useDroppable({
    id: 'container',
  });

  return (
    <div
      ref={ref}
      className={clsx(
        'bg-grey-100 rounded-(--border-radius-lg) p-[32px]',
        'flex flex-wrap gap-[16px]',
        'border transition-all duration-200',
        isDropTarget
          ? 'border-brand-600 shadow-(--shadow-md)'
          : 'border-silver-700 shadow-none'
      )}
    >
      {children}
    </div>
  );
}

export default ContainerBox;

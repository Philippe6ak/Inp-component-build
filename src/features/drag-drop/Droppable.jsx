import { useDroppable } from '@dnd-kit/react';
import { Children } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';

function Droppable({ id, children }) {
  const { ref, isOver } = useDroppable({
    id,
  });
  const hasChildren = Children.count(children) > 0;

  return (
    <div
      ref={ref}
      className={clsx(
        'relative flex flex-wrap content-start gap-[8px]',
        'rounded-(--border-radius-md) p-[24px]',
        'w-30 min-h-30 col-[3/span_2]',
        'border-2 border-dashed',
        'transition-all duration-200',
        isOver
          ? 'bg-brand-50 border-brand-600 shadow-(--shadow-md) scale-[1.02]'
          : 'bg-grey-50 border-grey-300 shadow-none scale-100'
      )}
    >
      {!hasChildren && (
        <p
          className={clsx(
            'w-full text-center text-[14px] font-semibold uppercase tracking-[0.08em] transition-colors duration-200',
            isOver ? 'text-brand-600' : 'text-grey-400'
          )}
        >
          Drop here
        </p>
      )}
      {children}
    </div>
  );
}

Droppable.propTypes = {
  id: PropTypes.string.isRequired,
  children: PropTypes.node,
};

export default Droppable;

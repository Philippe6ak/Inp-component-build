import { useSortable } from '@dnd-kit/react/sortable';
import clsx from 'clsx';
import PropTypes from 'prop-types';

function Draggable({ id, label, index, group = 'items', isDropped = false }) {
  const { ref, isDragging } = useSortable({
    id,
    index,
    group,
  });

  return (
    <div
      ref={ref}
      className={clsx(
        'relative bg-grey-0 border rounded-(--border-radius-md)',
        'text-grey-800 font-semibold tracking-[0.02em]',
        'transition-all duration-200 select-none',
        // Size and font adapt based on whether item has been dropped into zone
        isDropped
          ? 'px-[12px] py-1 min-w-12 text-[12px]'
          : 'px-2 py-[16px] min-w-20 text-[14px]',
        // Drag state styles
        isDragging
          ? 'cursor-grabbing border-brand-600 shadow-(--shadow-md) scale-[1.03] opacity-90'
          : 'cursor-grab border-grey-200 shadow-(--shadow-sm) scale-100 opacity-100'
      )}
    >
      {label}
    </div>
  );
}

Draggable.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  group: PropTypes.string,
  isDropped: PropTypes.bool,
};

export default Draggable;

import { forwardRef } from 'react';
import clsx from 'clsx';

const Input = forwardRef(function Input({ size = 'default', ...props }, ref) {
  return (
    <input
      ref={ref}
      className={clsx(
        'border-0 border-grey-300 bg-grey-0 rounded-radius-sm shadow-sm focus:outline-none disabled:bg-grey-100 disabled:text-grey-500 disabled:cursor-not-allowed',
        size === 'default' && 'px-[1.2rem] py-[0.8rem]',
        size === 'large' && 'px-[1.6rem] py-[1.4rem] text-[1.6rem]'
      )}
      {...props}
    />
  );
});

export default Input;

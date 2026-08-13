import clsx from 'clsx';
import PropTypes from 'prop-types';

// const sizes = {
//   small:
//     'text-[1.2rem] py-[0.4rem] px-[0.8rem] uppercase font-semibold text-center',
//   medium: 'text-[1.4rem] py-[1.2rem] px-[1.6rem] font-medium',
//   large: 'text-[1.6rem] py-[1.2rem] px-[2.4rem] font-medium',
// };

const sizes = {
  small: 'text-xs py-1 px-3 uppercase font-semibold text-center',
  medium: 'text-sm py-2 px-4 font-medium',
  large: 'text-base py-3 px-6 font-medium',
};

const variations = {
  primary: 'bg-brand-600 hover:bg-brand-700 text-white',
  secondary: 'bg-grey-0 border border-grey-200 hover:bg-grey-50 text-grey-700',
  danger: 'bg-danger-700 hover:bg-danger-800 text-danger-100',
};

function Button({
  size = 'medium',
  variation = 'primary',
  className,
  ...props
}) {
  return (
    <button
      className={clsx(
        'border-0 rounded-sm shadow-md',
        sizes[size],
        variations[variation],
        className
      )}
      {...props}
    />
  );
}

// PropTypes for runtime type checking
Button.propTypes = {
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  variation: PropTypes.oneOf(['primary', 'secondary', 'danger']),
  className: PropTypes.string,
};

export default Button;

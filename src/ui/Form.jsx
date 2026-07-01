import clsx from 'clsx';

Form.defaultProps = {
  type: 'regular',
};

function Form({ type = 'regular', children, ...props }) {
  return (
    <form
      className={clsx(
        'overflow-hidden',
        type === 'regular' &&
          'text-[1.4rem] px-[4rem] py-[2.4rem] bg-grey-0 border border-grey-100 rounded-md',
        type === 'modal' && 'text-[1.4rem] w-7xl',
        type === 'login' && 'text-[1.6rem]'
      )}
      {...props}
    >
      {children}
    </form>
  );
}

export default Form;

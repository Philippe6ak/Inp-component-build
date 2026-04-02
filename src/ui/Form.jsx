import clsx from 'clsx';

Form.defaultProps = {
  type: 'regular',
};

function Form({ type = 'regular', children, ...props }) {
  return (
    <form
      className={clsx(
        'overflow-hidden text-[1.4rem]',
        type === 'regular' &&
          'px-[4rem] py-[2.4rem] bg-grey-0 border border-grey-100 rounded-md',
        type === 'modal' && 'w-7xl'
      )}
      {...props}
    >
      {children}
    </form>
  );
}

export default Form;

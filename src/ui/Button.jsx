import clsx from "clsx";
import PropTypes from "prop-types";

const sizes = {
  small:
    "text-[1.2rem] py-[0.4rem] px-[0.8rem] uppercase font-semibold text-center",
  medium: "text-[1.4rem] py-[1.2rem] px-[1.6rem] font-medium",
  large: "text-[1.6rem] py-[1.2rem] px-[2.4rem] font-medium",
};

const variations = {
  primary:
    "text-[var(--color-brand-50)] bg-[var(--color-brand-600)] hover:bg-[var(--color-brand-700)]",
  secondary:
    "text-[var(--color-grey-600)] bg-[var(--color-grey-0)] border border-[var(--color-grey-200)] hover:bg-[var(--color-grey-50)]",
  danger:
    "text-[var(--color-red-100)] bg-[var(--color-red-700)] hover:bg-[var(--color-red-800)]",
};

function Button({
  size = "medium",
  variation = "primary",
  className,
  ...props
}) {
  return (
    <button
      className={clsx(
        "border-0 rounded-(--border-radius-sm) shadow-(--shadow-md)",
        sizes[size],
        variations[variation],
        className,
      )}
      {...props}
    />
  );
}

// PropTypes for runtime type checking
Button.propTypes = {
  size: PropTypes.oneOf(["small", "medium", "large"]),
  variation: PropTypes.oneOf(["primary", "secondary", "danger"]),
  className: PropTypes.string,
};

export default Button;

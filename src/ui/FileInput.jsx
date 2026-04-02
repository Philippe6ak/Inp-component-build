import clsx from "clsx";

function FileInput({ className = "", ...props }) {
  return (
    <input
      type="file"
      className={clsx(
        "text-[14px] rounded-(--border-radius-sm)",
        // file-selector-button styles
        "file:font-inherit file:font-medium",
        "file:px-[12px] file:py-[8px] file:mr-[12px]",
        "file:rounded-(--border-radius-sm)",
        "file:border-none file:cursor-pointer",
        "file:text-brand-50 file:bg-brand-600",
        "file:transition-colors file:duration-200",
        "hover:file:bg-brand-700",
        className,
      )}
      {...props}
    />
  );
}

export default FileInput;

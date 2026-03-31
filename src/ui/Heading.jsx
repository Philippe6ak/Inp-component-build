import clsx from "clsx";

function Heading({ as: Tag = "h1", children, className = "" }) {
  return (
    <Tag
      className={clsx(
        "leading-[1.4]",
        Tag === "h1" && "text-[30px] font-semibold",
        Tag === "h2" && "text-[20px] font-semibold",
        Tag === "h3" && "text-[20px] font-medium",
        Tag === "h4" && "text-[30px] font-semibold text-center",
        className,
      )}
    >
      {children}
    </Tag>
  );
}

export default Heading;

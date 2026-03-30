import { NavLink } from "react-router-dom";
import {
  HiClipboardDocument,
  HiInboxArrowDown,
  HiOutlineCalendarDays,
  HiOutlineCog6Tooth,
  HiOutlineHome,
  HiOutlineHomeModern,
  HiOutlineTableCells,
  HiOutlineUsers,
} from "react-icons/hi2";

const navLinkBaseClassName =
  "group flex items-center gap-[1.2rem] rounded-sm px-[2.4rem] py-[1.2rem] text-[1.6rem] font-medium text-grey-600 transition-all duration-300 hover:bg-grey-50 hover:text-grey-800 active:bg-grey-50 active:text-grey-800 max-md:gap-0 max-md:p-[1.2rem]";

const navLinkActiveClassName = "bg-grey-50 text-grey-800";

const navIconBaseClassName =
  "h-[2.4rem] w-[2.4rem] text-grey-400 transition-all duration-300 group-hover:text-brand-600 group-active:text-brand-600";

const navIconActiveClassName = "text-brand-600";

const navItems = [
  { to: "/dashboard", label: "Home", Icon: HiOutlineHome },
  { to: "/bookings", label: "Bookings", Icon: HiOutlineCalendarDays },
  { to: "/cabins", label: "Cabins", Icon: HiOutlineHomeModern },
  { to: "/users", label: "Users", Icon: HiOutlineUsers },
  { to: "/settings", label: "Settings", Icon: HiOutlineCog6Tooth },
  { to: "/table", label: "Table", Icon: HiOutlineTableCells },
  { to: "/drag-drop", label: "Drag & Drop", Icon: HiInboxArrowDown },
  {
    to: "/reusable-buttons",
    label: "Reusable Buttons",
    Icon: HiClipboardDocument,
  },
];

function MainNav() {
  return (
    <nav>
      <ul className="flex flex-col gap-[0.8rem]">
        {navItems.map(({ to, label, Icon }) => (
          <li key={to}>
            <NavLink
              to={to}
              className={({ isActive }) =>
                `${navLinkBaseClassName} ${isActive ? navLinkActiveClassName : ""}`
              }
            >
              {({ isActive }) => (
                <>
                  <Icon
                    className={`${navIconBaseClassName} ${isActive ? navIconActiveClassName : ""}`}
                  />
                  <span className="max-md:hidden">{label}</span>
                </>
              )}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default MainNav;

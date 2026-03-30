import { NavLink } from "react-router-dom";
import {
  HiOutlineCalendarDays,
  HiOutlineCog6Tooth,
  HiOutlineHome,
  HiOutlineHomeModern,
  HiOutlineUsers,
} from "react-icons/hi2";

const navLinkClass = [
  // Base layout
  "flex items-center gap-[12px]",
  "px-[24px] py-[12px]",
  "transition-all duration-300",
  // Base text
  "text-grey-600 text-[1.6rem] font-medium",
  // Hover & active — background + text color + border radius
  "hover:bg-grey-50 hover:text-grey-800 hover:rounded-[var(--border-radius-sm)]",
  "[&.active]:bg-grey-50 [&.active]:text-grey-800 [&.active]:rounded-[var(--border-radius-sm)]",
  // SVG default color
  "[&_svg]:w-[24px] [&_svg]:h-[24px] [&_svg]:text-grey-400 [&_svg]:transition-all [&_svg]:duration-300",
  // SVG hover & active color
  "hover:[&_svg]:text-brand-600 [&.active_svg]:text-brand-600",
].join(" ");

function MainNav() {
  return (
    <nav>
      <ul className="flex flex-col gap-[8px]">
        <li>
          <NavLink to="/dashboard" className={navLinkClass}>
            <HiOutlineHome />
            <span>Home</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/bookings" className={navLinkClass}>
            <HiOutlineCalendarDays />
            <span>Bookings</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/cabins" className={navLinkClass}>
            <HiOutlineHomeModern />
            <span>Cabins</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/users" className={navLinkClass}>
            <HiOutlineUsers />
            <span>Users</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/settings" className={navLinkClass}>
            <HiOutlineCog6Tooth />
            <span>Settings</span>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default MainNav;

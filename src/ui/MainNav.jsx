import { NavLink } from "react-router-dom";
import {
  HiOutlineCalendarDays,
  HiOutlineCog6Tooth,
  HiOutlineHome,
  HiOutlineHomeModern,
  HiOutlineUsers,
} from "react-icons/hi2";

const navLinkClass = [
  "flex items-center justify-center md:justify-start",
  "md:gap-[12px]",
  "px-[12px] py-[12px] md:px-[24px]",
  "transition-all duration-300",
  "text-grey-600 text-[1.6rem] font-medium",
  "hover:bg-grey-50 hover:text-grey-800 hover:rounded-[var(--border-radius-sm)]",
  "[&.active]:bg-grey-50 [&.active]:text-grey-800 [&.active]:rounded-[var(--border-radius-sm)]",
  "[&_svg]:w-[24px] [&_svg]:h-[24px] [&_svg]:text-grey-400 [&_svg]:transition-all [&_svg]:duration-300",
  "hover:[&_svg]:text-brand-600 [&.active_svg]:text-brand-600",
].join(" ");

function MainNav() {
  return (
    <nav>
      <ul className="flex flex-col gap-[8px]">
        <li>
          <NavLink to="/dashboard" className={navLinkClass}>
            <HiOutlineHome />
            <span className="hidden md:block">Home</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/bookings" className={navLinkClass}>
            <HiOutlineCalendarDays />
            <span className="hidden md:block">Bookings</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/cabins" className={navLinkClass}>
            <HiOutlineHomeModern />
            <span className="hidden md:block">Cabins</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/users" className={navLinkClass}>
            <HiOutlineUsers />
            <span className="hidden md:block">Users</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/settings" className={navLinkClass}>
            <HiOutlineCog6Tooth />
            <span className="hidden md:block">Settings</span>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default MainNav;

import { NavLink } from 'react-router-dom';
import { HiOutlineChevronDown, HiOutlineChevronRight } from 'react-icons/hi2';
import { menuButtonClass, activeMenuButtonClass, subNavLinkClass } from './navStyles';

/**
 * An expandable nav section with sub-links (e.g. "Gestion des patients").
 */
function ExpandableNavItem({ menuItem, isOpen, hasActiveRoute, onToggle }) {
  const SectionIcon = menuItem.icon;
  const ToggleIcon = isOpen ? HiOutlineChevronDown : HiOutlineChevronRight;

  return (
    <>
      <button
        type="button"
        onClick={onToggle}
        className={`${menuButtonClass} ${hasActiveRoute ? activeMenuButtonClass : ''}`}
      >
        <SectionIcon />
        <span className="hidden md:block flex-1 text-left whitespace-nowrap">
          {menuItem.title}
        </span>
        <ToggleIcon className="hidden md:block w-[18px] h-[18px]" />
      </button>

      {isOpen && (
        <ul className="mt-[6px] ml-0 md:ml-[8px] flex flex-col gap-[4px]">
          {menuItem.items.map((item) => {
            const ItemIcon = item.icon;
            return (
              <li key={item.path}>
                <NavLink to={item.path} end className={subNavLinkClass}>
                  <ItemIcon />
                  <span className="hidden md:block whitespace-nowrap">{item.title}</span>
                </NavLink>
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
}

/**
 * A standalone nav link with no sub-items (e.g. "Tableau de bord").
 * Uses the same menuButtonClass as expandable headers for visual consistency.
 */
function SingleNavItem({ menuItem }) {
  const SectionIcon = menuItem.icon;

  return (
    <NavLink
      to={menuItem.path}
      end
      className={({ isActive }) =>
        `${menuButtonClass} ${isActive ? activeMenuButtonClass : ''}`
      }
    >
      <SectionIcon />
      <span className="hidden md:block flex-1 text-left whitespace-nowrap">
        {menuItem.title}
      </span>
    </NavLink>
  );
}

/**
 * Renders the correct nav item type based on whether the item has sub-links.
 */
function NavItem({ menuItem, isOpen, hasActiveRoute, onToggle }) {
  const hasSubItems = Array.isArray(menuItem.items) && menuItem.items.length > 0;

  return (
    <li className="rounded-(--border-radius-sm)">
      {hasSubItems ? (
        <ExpandableNavItem
          menuItem={menuItem}
          isOpen={isOpen}
          hasActiveRoute={hasActiveRoute}
          onToggle={onToggle}
        />
      ) : (
        <SingleNavItem menuItem={menuItem} />
      )}
    </li>
  );
}

export default NavItem;

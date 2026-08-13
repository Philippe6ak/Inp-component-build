import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { menuItems } from './navConfig';
import NavItem from './NavItem';

function isItemRouteActive(itemPath, pathname) {
  return pathname === itemPath || pathname.startsWith(`${itemPath}/`);
}

function MainNav() {
  const { pathname } = useLocation();
  const [openMenus, setOpenMenus] = useState({});

  // Auto-expand sections that contain the active route
  useEffect(() => {
    setOpenMenus((prev) => {
      const next = { ...prev };
      menuItems.forEach((menuItem) => {
        const hasSubItems =
          Array.isArray(menuItem.items) && menuItem.items.length > 0;
        if (!hasSubItems) return;
        const hasActiveRoute = menuItem.items.some((item) =>
          isItemRouteActive(item.path, pathname)
        );
        if (hasActiveRoute) next[menuItem.title] = true;
      });
      return next;
    });
  }, [pathname]);

  function toggleMenu(title) {
    setOpenMenus((prev) => ({ ...prev, [title]: !prev[title] }));
  }

  return (
    <nav>
      <ul className="flex flex-col gap-[8px]">
        {menuItems.map((menuItem) => {
          const hasSubItems =
            Array.isArray(menuItem.items) && menuItem.items.length > 0;
          const isOpen = !!openMenus[menuItem.title];
          const hasActiveRoute = hasSubItems
            ? menuItem.items.some((item) =>
                isItemRouteActive(item.path, pathname)
              )
            : isItemRouteActive(menuItem.path, pathname);

          return (
            <NavItem
              key={menuItem.title}
              menuItem={menuItem}
              isOpen={isOpen}
              hasActiveRoute={hasActiveRoute}
              onToggle={() => toggleMenu(menuItem.title)}
            />
          );
        })}
      </ul>
    </nav>
  );
}

export default MainNav;

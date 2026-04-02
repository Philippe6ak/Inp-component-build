import { createContext, useContext, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { HiEllipsisVertical } from 'react-icons/hi2';
import { useOutsideClick } from '../hooks/useOutsideClick';

const MenusContext = createContext();

function Menus({ children }) {
  const [openId, setOpenId] = useState('');
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const close = () => setOpenId('');
  const open = (id) => setOpenId(id);

  // Close menu on scroll so the position doesn't drift
  useEffect(() => {
    if (!openId) return;
    window.addEventListener('scroll', close, true);
    return () => window.removeEventListener('scroll', close, true);
  }, [openId]);

  return (
    <MenusContext.Provider
      value={{ openId, close, open, position, setPosition }}
    >
      {children}
    </MenusContext.Provider>
  );
}

function Menu({ children }) {
  return <div className="flex items-center justify-end">{children}</div>;
}

function Toggle({ id }) {
  const { openId, open, close, setPosition } = useContext(MenusContext);

  function handleClick(e) {
    const rect = e.target.closest('button').getBoundingClientRect();
    setPosition({
      x: window.innerWidth - rect.width - rect.x,
      y: rect.y + rect.height + 8,
    });
    openId === '' || openId !== id ? open(id) : close();
  }

  return (
    <button
      onClick={handleClick}
      className="
        bg-transparent border-none p-[4px]
        rounded-(--border-radius-sm)
        translate-x-[8px]
        transition-all duration-200
        hover:bg-grey-100
        [&_svg]:w-[24px] [&_svg]:h-[24px] [&_svg]:text-grey-700
      "
    >
      <HiEllipsisVertical />
    </button>
  );
}

function List({ id, children }) {
  const { openId, position, close } = useContext(MenusContext);
  const ref = useOutsideClick(() => close());

  if (openId !== id) return null;

  return createPortal(
    <ul
      ref={ref}
      style={{ right: `${position.x}px`, top: `${position.y}px` }}
      className="
        fixed
        bg-grey-0
        shadow-(--shadow-md)
        rounded-(--border-radius-md)
      "
    >
      {children}
    </ul>,
    document.body
  );
}

function Button({ children, icon, onClick }) {
  const { close } = useContext(MenusContext);

  function handleClick() {
    onClick?.();
    close();
  }

  return (
    <li>
      <button
        onClick={handleClick}
        className="
          w-full text-left bg-transparent border-none
          px-[24px] py-[12px] text-[14px]
          transition-all duration-200
          flex items-center gap-[16px]
          hover:bg-grey-50
          [&_svg]:w-[16px] [&_svg]:h-[16px] [&_svg]:text-grey-400 [&_svg]:transition-all [&_svg]:duration-300
        "
      >
        {icon} <span>{children}</span>
      </button>
    </li>
  );
}

Menus.Menu = Menu;
Menus.Toggle = Toggle;
Menus.List = List;
Menus.Button = Button;

export default Menus;

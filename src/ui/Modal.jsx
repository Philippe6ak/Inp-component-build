import { cloneElement, createContext, useContext, useState } from 'react';
import { createPortal } from 'react-dom';
import { HiXMark } from 'react-icons/hi2';
import { useOutsideClick } from '../hooks/useOutsideClick';

const ModalContext = createContext();

function Modal({ children }) {
  const [openName, setOpenName] = useState('');

  const close = () => setOpenName('');
  const open = (name) => setOpenName(name);

  return (
    <ModalContext.Provider value={{ openName, open, close }}>
      {children}
    </ModalContext.Provider>
  );
}

function Open({ children, opens: opensWindowName }) {
  const { open } = useContext(ModalContext);
  return cloneElement(children, {
    onClick: () => open(opensWindowName),
  });
}

function Window({ children, name }) {
  const { openName, close } = useContext(ModalContext);
  const ref = useOutsideClick(close);

  if (name !== openName) return null;

  return createPortal(
    <div className="fixed inset-0 bg-backdrop-color backdrop-blur-sm z-1000 flex items-center justify-center">
      <div
        className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-grey-0 rounded-lg shadow-lg px-[4rem] py-[3.2rem] transition-all duration-500"
        ref={ref}
      >
        <button
          className="bg-transparent border-0 p-[0.4rem] rounded-sm translate-x-[0.8rem] transition-all duration-200 absolute top-[1.2rem] right-[1.9rem] hover:bg-grey-100 [&_svg]:w-[2.4rem] [&_svg]:h-[2.4rem] [&_svg]:text-grey-500"
          onClick={close}
        >
          <HiXMark />
        </button>
        <div>{cloneElement(children, { onCloseModal: close })}</div>
      </div>
    </div>,
    document.body
  );
}

Modal.Open = Open;
Modal.Window = Window;

export default Modal;

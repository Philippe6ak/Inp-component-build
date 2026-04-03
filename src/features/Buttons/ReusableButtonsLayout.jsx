import { HiEye, HiPencil, HiSquare2Stack } from 'react-icons/hi2';

import Button from '../../ui/Button';
import Menus from '../../ui/Menus';

const variations = ['primary', 'secondary', 'danger'];
const sizes = ['small', 'medium', 'large'];

function ReusableButtonsLayout() {
  return (
    <div className="grid gap-[2.4rem]">
      <div className="grid gap-[1.2rem] rounded-(--border-radius-md) border border-grey-200 bg-(--color-grey-0) p-[2rem]">
        <h3 className="text-[1.8rem] font-semibold">Default Button</h3>
        <div className="flex flex-wrap items-center gap-[1.2rem]">
          <Button>Default action</Button>
        </div>
        <p className="text-[1.3rem] text-grey-500">
          Uses default props: size=&quot;medium&quot; and
          variation=&quot;primary&quot;.
        </p>
      </div>

      <div className="grid gap-[1.2rem] rounded-(--border-radius-md) border border-grey-200 bg-(--color-grey-0) p-[2rem]">
        <h3 className="text-[1.8rem] font-semibold">Dropdown Menu</h3>
        <p className="text-[1.3rem] text-grey-500">
          Click the three-dot toggle to open a generic actions menu.
        </p>
        <div className="min-h-[6rem] w-full rounded-(--border-radius-md) border border-dashed border-grey-300 bg-grey-50 p-[1rem]">
          <Menus>
            <Menus.Menu>
              <Menus.Toggle id="generic-options" />

              <Menus.List id="generic-options">
                <Menus.Button icon={<HiEye />}>Option 1</Menus.Button>
                <Menus.Button icon={<HiPencil />}>Option 2</Menus.Button>
                <Menus.Button icon={<HiSquare2Stack />}>Option 3</Menus.Button>
              </Menus.List>
            </Menus.Menu>
          </Menus>
        </div>
      </div>

      <div className="grid gap-[1.6rem]">
        {variations.map((variation) => (
          <div
            key={variation}
            className="grid gap-[1.6rem] rounded-(--border-radius-md) border border-grey-200 bg-(--color-grey-0) p-[2rem]"
          >
            <h4 className="text-[1.5rem] font-semibold capitalize">
              {variation}
            </h4>
            <div className="flex flex-wrap items-center gap-[1.2rem]">
              {sizes.map((size) => (
                <Button
                  key={`${variation}-${size}`}
                  size={size}
                  variation={variation}
                >
                  {size}
                </Button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ReusableButtonsLayout;

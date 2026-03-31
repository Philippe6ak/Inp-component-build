import Logo from "./Logo";
import MainNav from "./MainNav";
import Uploader from "../data/Uploader";

function Sidebar() {
  return (
    <aside className="bg-grey-0 p-[3.2rem_2.4rem] border-r border-grey-100 row-span-full flex flex-col gap-[3.2rem] md:p-[2rem_1.2rem] md:gap-[2.4rem]">
      <Logo />
      <MainNav />

      <Uploader />
    </aside>
  );
}

export default Sidebar;

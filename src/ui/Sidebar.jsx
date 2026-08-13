import Logo from './Logo';
import HealthNav from './HealthNav';

function Sidebar() {
  return (
    <aside className="bg-grey-0 p-[3.2rem_2.4rem] border-r border-grey-100 row-span-full flex flex-col gap-[3.2rem] md:w-[31rem] lg:w-[34rem] md:p-[2rem_1.2rem] md:gap-[2.4rem]">
      <Logo />
      {/* <MainNav /> */}
      <HealthNav />

      {/* <Uploader /> */}
    </aside>
  );
}

export default Sidebar;

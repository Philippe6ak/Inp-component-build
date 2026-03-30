import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";

function AppLayout() {
  return (
    <div className="grid h-screen grid-cols-[9.6rem_1fr] grid-rows-[auto_1fr] md:grid-cols-[26rem_1fr]">
      <Sidebar />
      <Header />
      <main className="overflow-auto bg-grey-50 px-[48px] pb-[64px] pt-4">
        <div className="mx-auto flex max-w-192 flex-col gap-[32px]">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default AppLayout;

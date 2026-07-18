import React, { useState } from "react";
import Sidebar from "../components/layout/sidebar/Sidebar";
import { Outlet } from "react-router-dom";

const App_Layout = () => {
  const [openSidebar, setOpenSidebar] = useState(false);
  return (
    <main className="bg-[#FFFDFA] p-4  overflow-hidden lg:p-8 min-h-[100dvh] flex items-start relative  ">
      <Sidebar openSidebar={openSidebar} setOpenSidebar={setOpenSidebar} />
      <div
        className={` w-full  md:w-[calc(100%_-_220px_-_16px)] lg:w-[calc(100%_-_245px_-_32px)] ms-auto flex flex-col gap-6 `}
      >
        <Outlet context={{ setOpenSidebar }} />
      </div>
    </main>
  );
};

export default App_Layout;

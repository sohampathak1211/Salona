import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { ToastContainer } from "react-toastify";
const SidebarLayout = () => {
  const [sidebar,setSidebar] = useState(true);
  const [active,setActive] = useState(0)
  return (
    <div className="w-full h-screen flex flex-1 justify-center">
      {/* <ToastContainer
        position="top-left"
        autoClose={1500}
      /> */}
      <div className="w-full flex">
        <div className={`transition-all duration-500 ${sidebar ? "w-[220px]" : "w-[60px]"} max-w-[200px] max-h-screen`}>
          <Sidebar sidebar={sidebar} setSidebar={setSidebar}/>
        </div>
        <div className="w-full h-screen flex flex-1 flex-col overflow-hidden bg-gray-50">
          <div className="w-full h-screen flex-1 custom-scrollbar overflow-y-scroll">
          <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SidebarLayout;

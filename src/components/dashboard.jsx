import React from "react";
import SideNavbar from "./side-navbar";
import { Outlet } from "react-router-dom";
function Dashboard() {
  return (
    <div className="full-screen w-full flex">
      <SideNavbar />
      <div className="lg:w-[85%] h-full">
        <Outlet />
      </div>
    </div>
  );
}

export default Dashboard;

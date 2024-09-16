import React from "react";
import SideNavbar from "./side-navbar";
import { Outlet } from "react-router-dom";
import Footer from "./footer"; 

function Dashboard() {
  return (
    <div className="w-full h-screen flex flex-col">
      <div className="flex flex-grow overflow-hidden">
        <SideNavbar />
        <div className="flex-grow h-full p-4 overflow-y-auto">
          <Outlet />
        </div>
      </div>
      <Footer /> 
    </div>
  );
}

export default Dashboard;

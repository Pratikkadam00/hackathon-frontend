import React from "react";
import { useLoginStore } from "../store/login.store";
import { NavLink } from "react-router-dom";

function SideNavbar() {
  const { user } = useLoginStore();

  return (
    <div className="lg:w-[15%] lg:h-full bg-violet-950 p-4 flex flex-col gap-2">
      <NavList role={user.role} />
    </div>
  );
}

export default SideNavbar;

const NavList = ({ role }) => {
  console.log("role", role);
  const commonLinks = [
    {
      path: "/dashboard/events",
      title: "Events",
      id: 1,
    },
  ];
  switch (role) {
    case "admin":
      const adminLinks = [
        ...commonLinks,
        {
          path: "/dashboard/users",
          title: "Users",
          id: 2,
        },
      ];

      return adminLinks.map((link, index) => (
        <NavLink
          key={index}
          to={link.path}
          className={({ isActive }) =>
            `w-full p-1.5 px-2 rounded-lg text-white hover:bg-violet-900/50 ${
              isActive && "bg-violet-900/50"
            }`
          }
        >
          {link.title}
        </NavLink>
      ));

    default:
      const userLinks = [...commonLinks];

      return userLinks.map((link, index) => (
        <NavLink
          key={index}
          to={link.path}
          className={({ isActive }) =>
            `w-full p-1.5 px-2 rounded-lg text-white hover:bg-violet-900/50 ${
              isActive && "bg-violet-900/50"
            }`
          }
        >
          {link.title}
        </NavLink>
      ));
      break;
  }
};

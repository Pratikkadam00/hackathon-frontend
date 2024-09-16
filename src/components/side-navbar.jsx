import React from "react";
import { useLoginStore } from "../store/login.store";
import { NavLink } from "react-router-dom";
import { Calendar, Users } from "lucide-react";
function SideNavbar() {
  const { user } = useLoginStore();

  return (
    <div className="lg:w-[15%] h-100% bg-violet-950 p-4 flex flex-col gap-2">
      <NavList role={user.role} />
    </div>
  );
}

export default SideNavbar;

const NavList = ({ role }) => {
  const commonLinks = [
    {
      path: "/dashboard/events",
      title: "Events",
      id: 1,
      icon: <Calendar size={20} />,
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
          icon: <Users size={20} />,
        },
      ];

      return adminLinks.map((link, index) => (
        <NavLink
          key={index}
          to={link.path}
          className={({ isActive }) =>
            `w-full p-1.5 px-2 flex gap-3 items-center rounded-lg text-white hover:bg-violet-900/50 ${
              isActive && "bg-violet-900/50"
            }`
          }
        >
          {link.icon}
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
            `w-full p-1.5 px-2 flex gap-3 items-center rounded-lg text-white hover:bg-violet-900/50 ${
              isActive && "bg-violet-900/50"
            }`
          }
        >
          {link.icon}
          {link.title}
        </NavLink>
      ));
      break;
  }
};

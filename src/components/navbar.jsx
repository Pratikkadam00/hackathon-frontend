import React from "react";
import { NavLink } from "react-router-dom";
import { useLoginStore } from "../store/login.store";

const loggedOutMenuList = [
  {
    path: "register",
    title: "Register",
    key: 1,
  },
  {
    path: "login",
    title: "Login",
    key: 2,
  },
];

const Navbar = () => {
  const { token, user, logout } = useLoginStore();

  const loggedInMenuList = [
    {
      path: "..",
      title: "..",
      key: 1,
    },
  ];
  return (
    <header className="bg-slate-50">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <a href="#" className="">
            <span className="">Evento</span>
          </a>
        </div>

        <div className="hidden lg:flex lg:gap-3 lg:flex-1 lg:justify-end">
          {token ? (
            <div className="flex gap-3">
              <div className="flex flex-col items-end">
                <span className="text-sm">{user.name}</span>
                <span className="text-[10px]">{user.email}</span>
              </div>
              <button
                onClick={() => logout()}
                className="text-sm font-semibold px-3 py-1 rounded-lg text-gray-900 hover:bg-slate-200"
              >
                Logout
              </button>
            </div>
          ) : (
            loggedOutMenuList.map((link) => (
              <NavLink
                key={link.key}
                to={link.path}
                className={({ isActive }) =>
                  `text-sm font-semibold leading-6 text-gray-900 border-b-2 ${
                    isActive ? "border-blue-500" : "border-slate-50"
                  } `
                }
              >
                {link.title}
              </NavLink>
            ))
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;

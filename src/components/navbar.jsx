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
    <header className="bg-violet-600">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        {/* <div className="flex lg:flex-1">
          <a href="#" className="">
            <span className="text-white text-2xl font-medium ">Evento</span>
          </a>
        </div> */}
        <div className="flex lg:flex-1">
          <a href="#" className="">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-pink-600 text-5xl font-medium font-[Pacifico] drop-shadow-lg">
              Evento
            </span>
          </a>
        </div>

        <div className="hidden lg:flex lg:gap-3 lg:flex-1 lg:justify-end">
          {token ? (
            <div className="flex gap-3">
              <div className="flex flex-col items-end text-white">
                <span className="text-base font-semibold first-letter:capitalize">
                  {user.name}
                </span>
                <span className="text-lg ">{user.email}</span>
              </div>
              <button
                onClick={() => logout()}
                className="text-base mx-5 font-semibold px-3 py-1 rounded-lg text-white hover:bg-violet-700"
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
                  `text-sm font-semibold leading-6 text-white border-b-2 ${
                    isActive ? "border-white" : "border-violet-600"
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

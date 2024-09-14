import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./components/login";
import Error from "./components/error";
import Register from "./components/register";
import Dashboard from "./components/dashboard";
import ProtectedRoute from "./components/protected-route";
import Events from "./components/events";
import Users from "./components/users";
import EventForm from "./components/add-event-form";

//routes
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "dashboard",
        element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        ),
        children: [
          {
            path: "events",
            element: <Events />,
            index: true,
          },
          {
            path: "users",
            element: <Users />,
          },
          {
            path: "events/add-events",
            element: <EventForm />,
          },
        ],
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);


import { Outlet } from "react-router-dom";
import Navbar from "./components/navbar";
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import { useLoginStore } from "./store/login.store";

function App() {
  const { loadLogin, token, user } = useLoginStore();

  useEffect(() => {
    if (!token || !user) loadLogin();
  }, [loadLogin, token, user]);

  return (
    <div className="h-screen">
      <Navbar />
      <div className="w-full full-screen">
        <Outlet />
      </div>
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
}

export default App;

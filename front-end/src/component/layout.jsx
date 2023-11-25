import Navbar from "./navbar.jsx";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="p-4 min-h-screen flex flex-col">
      <Navbar />
      <Outlet />
    </div>
  );
};

export default Layout;

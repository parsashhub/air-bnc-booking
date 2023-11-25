import Navbar from "./navbar.jsx";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Layout = () => {
  return (
    <div className="p-4 min-h-screen flex flex-col">
      <ToastContainer
        style={{ top: "1rem" }}
        hideProgressBar={false}
        position="top-right"
        autoClose={3000}
        limit={2}
        newestOnTop
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Navbar />
      <Outlet />
    </div>
  );
};

export default Layout;

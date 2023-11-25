import { Route, Routes } from "react-router-dom";
import Home from "./pages/home/index.jsx";
import Login from "./auth/login/index.jsx";
import Layout from "./component/layout.jsx";
import SignUp from "./auth/signUp/index.jsx";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:3001";
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/signup" element={<SignUp />} />
        <Route path="*" element={<div>404</div>} />
      </Route>
    </Routes>
  );
};

export default App;

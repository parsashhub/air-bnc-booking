import { Route, Routes } from "react-router-dom";
import Home from "./pages/home/index.jsx";
import Login from "./pages/auth/login/index.jsx";
import Layout from "./component/layout.jsx";
import SignUp from "./pages/auth/signUp/index.jsx";
import axios from "axios";
import { UserContextProvider } from "./userContext";
import QueryClientProvider from "./queryClientProvider.jsx";
import Profile from "./pages/profile/index.jsx";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = "http://localhost:3001";

const App = () => {
  return (
    <QueryClientProvider>
      <UserContextProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/profile/:subpage?" element={<Profile />} />
            <Route path="/profile/:subpage/:action" element={<Profile />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/auth/login" element={<Login />} />
            <Route path="/auth/signup" element={<SignUp />} />
            <Route path="*" element={<div>404</div>} />
          </Route>
        </Routes>
      </UserContextProvider>
    </QueryClientProvider>
  );
};

export default App;

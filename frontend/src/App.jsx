import { Route, Routes } from "react-router-dom";
import Home from "./pages/home/index.jsx";
import Login from "./pages/auth/login/index.jsx";
import Layout from "./component/layout.jsx";
import SignUp from "./pages/auth/signUp/index.jsx";
import axios from "axios";
import { UserContextProvider } from "./userContext";
import QueryClientProvider from "./queryClientProvider.jsx";
import Profile from "./pages/profile/index.jsx";
import Places from "./pages/profile/places.jsx";
import PlacesForm from "./pages/profile/placesForm.jsx";
import PlaceDetail from "./pages/placeDetail/index.jsx";
import { Typography } from "@mui/material";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = "http://localhost:3001";

const App = () => {
  return (
    <QueryClientProvider>
      <UserContextProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/profile/places" element={<Places />} />
            <Route path="/profile/places/new" element={<PlacesForm />} />
            <Route path="/profile/places/:id" element={<PlacesForm />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/place/:id" element={<PlaceDetail />} />
            <Route path="/auth/login" element={<Login />} />
            <Route path="/auth/signup" element={<SignUp />} />
            <Route
              path="*"
              element={<Typography variant="h4">404 not found</Typography>}
            />
          </Route>
        </Routes>
      </UserContextProvider>
    </QueryClientProvider>
  );
};

export default App;

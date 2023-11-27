import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../userContext.jsx";
import { Button } from "@mui/material";
import axios from "axios";
import ProfileNavbar from "./_component/profileNavbar.jsx";

const Profile = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);

  const logout = async () => {
    await axios.post("/api/auth/logout");
    navigate("/");
    setUser(null);
  };

  return (
    <div>
      <ProfileNavbar />
        <div className="text-center max-w-lg mx-auto space-y-6">
          Logged in as {user?.name} ({user?.email})<br />
          <Button
            variant="contained"
            color="primary"
            className="w-[60%] h-12"
            sx={{ borderRadius: "25px" }}
            onClick={logout}
          >
            Logout
          </Button>
        </div>
    </div>
  );
};

export default Profile;

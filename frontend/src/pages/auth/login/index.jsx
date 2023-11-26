import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import TextField from "../../../component/customTextField.jsx";
import * as yup from "yup";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useContext } from "react";
import { UserContext } from "../../../userContext.jsx";

const Login = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: yup.object().shape({
      email: yup.string().email().required(),
      password: yup.string().required().min(4),
    }),
    onSubmit: async (values) => {
      try {
        const res = await axios.post("/api/auth", values);
        setUser(res.data?.data);
        navigate("/");
      } catch (e) {
        toast.error(e.message);
      }
    },
  });
  const { handleChange, handleBlur, handleSubmit, values, touched, errors } =
    formik;

  return (
    <div className="flex items-center justify-around grow">
      <Card
        className="shadow-lg shadow-gray-400 flex flex-col items-center w-[40%] p-4"
        sx={{ borderRadius: "25px" }}
      >
        <Typography variant="h4" className="my-4">
          Login
        </Typography>
        <CardContent className="flex flex-col w-[80%] gap-4">
          <TextField
            name="email"
            label="Email"
            value={values.email}
            onBlur={handleBlur}
            onChange={handleChange}
            helperText={touched["email"] && errors["email"]}
            error={!!(touched["email"] && errors["email"])}
          />
          <TextField
            name="password"
            label="Password"
            value={values.password}
            onBlur={handleBlur}
            onChange={handleChange}
            helperText={touched["password"] && errors["password"]}
            error={!!(touched["password"] && errors["password"])}
            type="password"
          />
        </CardContent>
        <CardActions className="w-full flex flex-col justify-center gap-4">
          <Button
            variant="contained"
            className="w-[80%] h-12 bg-primary"
            sx={{ borderRadius: "25px" }}
            onClick={() => handleSubmit()}
          >
            Login
          </Button>
          <div className="text-gray-500">
            Do not have an account?{" "}
            <Link className="underline" to="/auth/signup">
              Create
            </Link>
          </div>
        </CardActions>
      </Card>
    </div>
  );
};

export default Login;

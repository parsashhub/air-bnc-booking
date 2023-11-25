import {
  Button,
  Card,
  CardActions,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";
import * as yup from "yup";
import { useFormik } from "formik";
import { Link } from "react-router-dom";

const Login = () => {
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: yup.object().shape({
      username: yup.string().required(),
      password: yup
        .string()
        .required()
        .min(4, "کلمه عبور باید حداقل 6 حرف باشد"),
    }),
    onSubmit: (values) => {
      console.log(values);
    },
  });
  const { handleChange, handleBlur, handleSubmit, values, touched, errors } =
    formik;

  return (
    <div className="flex items-center justify-around grow">
      <Card className="shadow-lg shadow-gray-400 flex flex-col items-center w-[40%] p-4" sx={{borderRadius: "25px"}}>
        <Typography variant="h4" className="my-4">
          Login
        </Typography>
        <CardContent className="flex flex-col w-[80%] gap-4">
          <TextField
            name="username"
            label="Username"
            value={values.username}
            onBlur={handleBlur}
            onChange={handleChange}
            helperText={touched["username"] && errors["username"]}
            error={!!(touched["username"] && errors["username"])}
            fullWidth
            InputProps={{ sx: { borderRadius: "25px" } }}
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
            fullWidth
            InputProps={{ sx: { borderRadius: "25px" } }}
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
            Do not have an account? <Link className="underline" to="/auth/signup">Create</Link>
          </div>
        </CardActions>
      </Card>
    </div>
  );
};

export default Login;

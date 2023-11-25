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

const SignUp = () => {
  const formik = useFormik({
    initialValues: {
      name: "",
      username: "",
      password: "",
    },
    validationSchema: yup.object().shape({
      name: yup.string().required(),
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
      <Card
        className="shadow-lg shadow-gray-400 flex flex-col items-center w-[40%] p-4"
        sx={{ borderRadius: "25px" }}
      >
        <Typography variant="h4" className="my-4">
          SignUp
        </Typography>
        <CardContent className="flex flex-col w-[80%] gap-4">
          <TextField
            name="name"
            label="name"
            value={values.name}
            onBlur={handleBlur}
            onChange={handleChange}
            helperText={touched["name"] && errors["name"]}
            error={!!(touched["name"] && errors["name"])}
            fullWidth
            InputProps={{ sx: { borderRadius: "25px" } }}
          />
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
            SignUp
          </Button>
          <div className="text-gray-500">
            Already a member?{" "}
            <Link className="underline" to="/auth/login">
              Login
            </Link>
          </div>
        </CardActions>
      </Card>
    </div>
  );
};

export default SignUp;

import { useFormik } from "formik";
import { addPlaceForm, validationSchema, form } from "./config.jsx";
import TextField from "../../../component/customTextField.jsx";
import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  FormLabel,
  Grid,
} from "@mui/material";
import PhotosUploader from "./photosUploader";

const AddPlaceForm = () => {
  const formik = useFormik({
    initialValues: addPlaceForm,
    validationSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });
  const { handleChange, handleBlur, handleSubmit, values, touched, errors, setFieldValue } =
    formik;
  console.log(values.photos)
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={{ xs: 2, md: 3 }}
        >
          {form?.map((item) => {
            const { type, label, title, name, sm, md, ...others } = item;
            const error = touched[name] && errors[name];
            if (type === "TextField")
              return (
                <Grid item xs={12} sm={sm ?? 4} md={md ?? 6} key={name}>
                  <TextField
                    name={name}
                    label={label}
                    value={values[name]}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    helperText={`${title ?? ""} ${error ? `--  ${error}` : ""}`}
                    error={!!error}
                    {...others}
                  />
                </Grid>
              );
            if (type === "photo")
              return (
                <Grid item xs={12} md={12} key="photo">
                  <PhotosUploader values={values.photos} setFieldValue={setFieldValue} />
                </Grid>
              );
            if (type === "Checkbox")
              return (
                <Grid item xs={12} md={12} key={name}>
                  <FormControl
                    className={"flex"}
                    disabled={others?.disabled}
                    error={!!error}
                    variant="outlined"
                    fullWidth
                  >
                    <FormLabel>{label}</FormLabel>
                    <FormGroup row className="justify-around items-center">
                      {item.options?.map(({ value, icon, checkedIcon }) => {
                        return (
                          <FormControlLabel
                            className={`border rounded-full pl-4 pr-6 ${
                              values[name]?.includes(value) && "bg-slate-100"
                            }`}
                            key={value}
                            control={
                              <Checkbox
                                name={name}
                                checked={values[name]?.includes(value)}
                                value={value}
                                icon={icon}
                                checkedIcon={checkedIcon}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                color={"secondary"}
                              />
                            }
                            label={value ?? ""}
                            labelPlacement={"end"}
                          />
                        );
                      })}
                    </FormGroup>
                    <FormHelperText>{error}</FormHelperText>
                  </FormControl>
                </Grid>
              );
          })}
          <Grid item xs={12} md={8}>
            <Button
              variant="contained"
              className="h-12 bg-primary"
              sx={{ borderRadius: "25px" }}
              type="submit"
              fullWidth
            >
              Save
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default AddPlaceForm;

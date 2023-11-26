import { TextField } from "@mui/material";

const CustomTextField = ({ ...others }) => {
  return (
    <TextField
      fullWidth
      InputProps={{ sx: { borderRadius: "25px" } }}
      {...others}
    />
  );
};

export default CustomTextField;

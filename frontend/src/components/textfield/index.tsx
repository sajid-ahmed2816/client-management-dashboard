import MuiTextField from "@mui/material/TextField";
import { MenuItem } from "@mui/material";
import type {
  TextFieldProps as MuiTextFieldProps,
} from "@mui/material/TextField";

interface MenuItemOption {
  value: string;
  name: string;
}

interface CustomTextFieldProps
  extends Omit<MuiTextFieldProps, "helperText"> {
  options?: MenuItemOption[];
  helperText?: React.ReactNode;
}

function TextField({
  fullWidth = true,
  options = [],
  helperText,
  select = false,
  ...props
}: CustomTextFieldProps) {
  return (
    <MuiTextField
      fullWidth={fullWidth}
      select={select}
      helperText={helperText}
      {...props}
    >
      {select &&
        options.map((opt) => (
          <MenuItem key={opt.value} value={opt.value}>
            {opt.name}
          </MenuItem>
        ))}
    </MuiTextField>
  );
}

export default TextField;

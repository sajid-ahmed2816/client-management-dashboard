import MuiButton from "@mui/material/Button";
import type { ButtonProps as MuiButtonProps, } from "@mui/material/Button";
import Loader from "../loader";

interface ButtonProps {
  onClick?: () => void;
  title: string;
  loading: boolean;
  disabled: boolean;
  type?: MuiButtonProps["type"];
  size?: MuiButtonProps["size"];
}

function Button({
  size = "medium",
  type = "button",
  title,
  loading,
  disabled,
  onClick,
}: ButtonProps) {
  return (
    <MuiButton
      variant="contained"
      size={size}
      type={type}
      disabled={disabled}
      onClick={onClick}
    >
      {loading ? <Loader /> : title}
    </MuiButton>
  );
};

export default Button;
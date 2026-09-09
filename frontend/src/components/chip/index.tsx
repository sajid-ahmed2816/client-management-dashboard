import MuiChip from "@mui/material/Chip";
import colors from "../../assets/colors";

const statusLabel = {
  "completed": "Completed",
  "in-progress": "In Progress",
  "pending": "Pending"
};

interface ChipProps {
  status: string;
}

function Chip({ status }: ChipProps) {
  const label = statusLabel[status as keyof typeof statusLabel]
  return (
    <MuiChip
      label={label}
      size="small"
      sx={{
        background: status === "in-progress" ?
          colors.warning : status === "pending"
            ? colors.error : status === "completed" ?
              colors.success : "transparent",
        color: colors.white,
        textTransform: "capitalize"
      }}
    />
  );
};

export default Chip;
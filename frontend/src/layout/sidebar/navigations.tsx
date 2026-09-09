import { AccountTree, Dashboard, Groups } from "@mui/icons-material";
import colors from "../../assets/colors";

const navigations = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: <Dashboard sx={{ color: colors.white }} />
  },
  {
    path: "/clients",
    name: "Clients",
    icon: <Groups sx={{ color: colors.white }} />
  },
  {
    path: "/projects",
    name: "Projects",
    icon: <AccountTree sx={{ color: colors.white }} />
  },
];

export default navigations;
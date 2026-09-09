import {
  Box,
  Drawer,
  Toolbar,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Avatar,
  Button
} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import navigations from "./navigations";
import colors from "../../assets/colors";
import { useAppSelector } from "../../store/hooks";
import { Logout } from "@mui/icons-material";
import { useAppDispatch } from "../../store/hooks";
import { logoutUser } from "../../store/slices/authSlice";

const drawerWidth = 250;
const collapsedDrawerWidth = 70;

function Sidebar() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);

  const name = user?.name;
  const email = user?.email;
  const nameInitial = name?.slice(0, 1);
  const avatarColor = name
    ? `hsl(${name.split("").reduce((acc: any, char: any) => acc + char.charCodeAt(0), 0) % 360}, 60%, 45%)`
    : "hsl(0, 0%, 50%)";


  const logout = async () => {
    await dispatch(logoutUser());
  };

  return (
    <Drawer
      sx={{
        background: colors.primary,
        zIndex: 1300,
        width: { xs: collapsedDrawerWidth, md: drawerWidth, },
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          background: colors.primary,
          color: colors.white,
          width: { xs: collapsedDrawerWidth, md: drawerWidth, },
          boxSizing: "border-box",
          border: "none",
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <Toolbar
        sx={{
          px: { xs: 1, md: 2, },
          justifyContent: { xs: "center", md: "flex-start", },
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontSize: "18px",
            whiteSpace: "nowrap",
            display: { xs: "none", md: "block", },
          }}
        >
          Client Management
        </Typography>
        {/* Mobile / Tablet Logo */}
        <Typography
          variant="h6"
          sx={{
            display: { xs: "block", md: "none", },
            fontWeight: 700,
          }}
        >
          CM
        </Typography>
      </Toolbar>
      <List
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 1,
          p: 0
        }}
      >
        {navigations.map((nav) => (
          <ListItem disablePadding={true} key={nav.path}>
            <ListItemButton
              onClick={() => navigate(nav.path)}
              sx={{
                gap: 1,
                "::before": {
                  content: "''",
                  background: colors.white,
                  width: nav.path === pathname ? "15px" : "0px",
                  height: "3px",
                  transition: "all .3s ease-in-out",
                  borderRadius: "4px"
                },
                ":hover": {

                }
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: { xs: 0, md: 25, },
                  color: colors.white,
                  justifyContent: "center",
                }}
              >
                {nav.icon}
              </ListItemIcon>
              <ListItemText
                primary={nav.name}
                sx={{
                  display: { xs: "none", md: "block", },
                  "& .MuiTypography-root": {
                    fontSize: "14px"
                  },
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Button
        onClick={logout}
        sx={{
          mt: "auto",
          mb: 1,
          minWidth: 0,
          px: { xs: 1, md: 2, },
          display: "flex",
          alignItems: "center",
          justifyContent: { xs: "center", md: "space-between", },
          color: colors.white,
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <Avatar
            sx={{
              width: 32,
              height: 32,
              background: avatarColor,
              color: colors.white,
              fontSize: "14px",
            }}
          >
            {nameInitial}
          </Avatar>
          <Typography
            variant="body2"
            sx={{
              display: { xs: "none", md: "block", },
              maxWidth: 160,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {email}
          </Typography>
        </Box>
        <Logout
          sx={{
            display: { xs: "none", md: "block", },
          }}
        />
        {/* Tablet logout */}
        <Logout
          sx={{
            display: { xs: "block", md: "none", },
            fontSize: 20,
          }}
        />
      </Button>
    </Drawer>
  );
};

export default Sidebar;
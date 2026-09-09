import { Fragment } from "react";
import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import Sidebar from "./sidebar";
import Header from "./header";

function Layout() {
  return (
    <Fragment>
      <Header />
      <Box component={"main"} sx={{ display: "flex", height: "100vh" }}>
        <Sidebar />
        <Box sx={{ flexGrow: 1, mt: "64px" }}>
          <Box sx={{ p: 2 }}>
            <Outlet />
          </Box>
        </Box>
      </Box>
    </Fragment>
  );
};

export default Layout;
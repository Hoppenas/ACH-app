import * as React from "react";
import { Outlet } from "react-router-dom";
import DrawerAppBar from "../DrawerAppBar/DrawerAppBar";
import { Box } from "@mui/material";

const Layout = () => {
  return (
    <Box
      height="100vh"
      sx={{ background: "#0e0e0d", color: "#FFF", overflow: "scroll" }}
    >
      <DrawerAppBar />
      <Outlet />
    </Box>
  );
};

export default Layout;

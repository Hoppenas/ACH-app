import * as React from "react";
import { Outlet } from "react-router-dom";
import DrawerAppBar from "../DrawerAppBar/DrawerAppBar";
import { Box } from "@mui/material";

const Layout = () => {
  return (
    <Box marginTop="60px">
      <DrawerAppBar />
      <Outlet />
    </Box>
  );
};

export default Layout;

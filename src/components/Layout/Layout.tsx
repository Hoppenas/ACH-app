import * as React from "react";
import { Outlet } from "react-router-dom";
import DrawerAppBar from "../DrawerAppBar/DrawerAppBar";
import { Box } from "@mui/material";

interface Props {
  isLogedIn: boolean;
}

const Layout = ({ isLogedIn }: Props) => {
  return (
    <Box
      height="100vh"
      sx={{ background: "#0e0e0d", color: "#FFF", overflow: "hidden" }}
    >
      <DrawerAppBar isLogedIn={isLogedIn} />
      <Outlet />
    </Box>
  );
};

export default Layout;

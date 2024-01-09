import { Outlet } from "react-router-dom";
import DrawerAppBar from "../DrawerAppBar/DrawerAppBar";
import { Box, useMediaQuery } from "@mui/material";
import { minWidth } from "../../constants/styleConstants";

interface Props {
  isLogedIn: boolean;
}

const Layout = ({ isLogedIn }: Props) => {
  const matches = useMediaQuery(`(min-width:${minWidth})`);
  return (
    <Box
      height="100vh"
      overflow={matches ? "auto" : "scroll"}
      sx={{ background: "#0e0e0d", color: "#FFF" }}
    >
      <DrawerAppBar isLogedIn={isLogedIn} />
      <Outlet />
    </Box>
  );
};

export default Layout;

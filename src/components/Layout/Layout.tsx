import { Outlet } from "react-router-dom";
import DrawerAppBar from "../DrawerAppBar/DrawerAppBar";
import { Box, useMediaQuery } from "@mui/material";
import { minWidth } from "../../constants/styleConstants";
import Footer from "../Footer/Footer";

interface Props {
  isLogedIn: boolean;
}

const Layout = ({ isLogedIn }: Props) => {
  const matches = useMediaQuery(`(min-width:${minWidth})`);
  return (
    <Box
      overflow={matches ? "auto" : "scroll"}
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        background: "#0e0e0d",
        color: "#FFF",
      }}
    >
      <DrawerAppBar isLogedIn={isLogedIn} />
      <Outlet />
      <Footer />
    </Box>
  );
};

export default Layout;

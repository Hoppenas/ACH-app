import { useNavigate } from "react-router-dom";
import * as React from "react";
import {
  AppBar,
  CssBaseline,
  Typography,
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  Button,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { getAuth, signOut } from "firebase/auth";

interface Props {
  isLogedIn: boolean;
  window?: () => Window;
}

const drawerWidth = 240;

const navItems = [
  { name: "Apie mane", route: "/about" },
  { name: "Paslaugos", route: "/services" },
  { name: "Portfolio", route: "/portfolio" },
  { name: "Paveikslai", route: "/paintings" },
  { name: "Susisiek su manim", route: "/contacts" },
];

const DrawerAppBar = ({ isLogedIn, window }: Props) => {
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const auth = getAuth();

  const handleLogout = () => {
    signOut(auth).catch((error) => {
      console.log(error);
    });
  };

  const drawer = (
    <Box
      onClick={handleDrawerToggle}
      sx={{
        textAlign: "center",
        color: "#FFF",
        background: "#0e0e0d",
        height: "100%",
      }}
    >
      <Typography variant="h6" sx={{ my: 2 }}>
        Agne grimas
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem
            key={item.name}
            disablePadding
            onClick={() => navigate(item.route)}
          >
            <ListItemButton sx={{ textAlign: "center" }}>
              <ListItemText primary={item.name} />
            </ListItemButton>
          </ListItem>
        ))}
        {isLogedIn && (
          <ListItem disablePadding onClick={handleLogout}>
            <ListItemButton sx={{ textAlign: "center", color: "red" }}>
              <ListItemText primary="Sign out" />
            </ListItemButton>
          </ListItem>
        )}
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        component="nav"
        sx={{
          color: "#FFF",
          background: "#0e0e0d",
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 3, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{
              flexGrow: 1,
              display: { xs: "none", sm: "block", cursor: "pointer" },
            }}
            onClick={() => navigate("/")}
          >
            Agne grimas
          </Typography>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            {navItems.map((item) => (
              <Button
                key={item.name}
                sx={{ color: "#FFF" }}
                onClick={() => navigate(item.route)}
              >
                {item.name}
              </Button>
            ))}
            {isLogedIn && (
              <Button sx={{ color: "red" }} onClick={handleLogout}>
                Log out
              </Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
    </Box>
  );
};

export default DrawerAppBar;

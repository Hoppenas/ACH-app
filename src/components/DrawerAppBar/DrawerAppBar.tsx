import { useNavigate } from "react-router-dom";
import * as React from "react";
import {
  AppBar,
  CssBaseline,
  Grid,
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
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { getAuth, signOut } from "firebase/auth";
import showNotification from "../Snackbar/Snackbar";

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
    signOut(auth)
      .then(() => {
        showNotification({
          type: "success",
          message: "Sign out succsessful",
        });
      })
      .catch((error) => {
        showNotification({
          type: "error",
          message: error.message,
        });
      });
  };

  const drawer = (
    <Box
      onClick={handleDrawerToggle}
      sx={{
        color: "#FFF",
        background: "#0e0e0d",
        height: "100%",
      }}
    >
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
            <ListItemButton sx={{ textAlign: "center" }}>
              <ListItemText
                primary={<Typography color="error">Sign out</Typography>}
              />
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
          <Box
            sx={{
              display: {
                xs: "none",
                sm: "block",
                width: "100%",
              },
            }}
          >
            <Grid container xs justifyContent="end" gap={1}>
              {navItems.map((item) => (
                <Button
                  key={item.name}
                  onClick={() => navigate(item.route)}
                  size="small"
                >
                  {item.name}
                </Button>
              ))}
              {isLogedIn && (
                <Button onClick={handleLogout} color="error">
                  Log out
                </Button>
              )}
            </Grid>
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
            keepMounted: true,
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

import { Box, Button, Grid } from "@mui/material";
import React from "react";
import "./header.css";

const navItems = ["About me", "Portfolio", "Services", "Contact me"];

const Header: React.FC = () => {
  return (
    <div className="header">
      <Grid>
        <Box sx={{ display: { xs: "none", sm: "block" } }}>
          {navItems.map((item) => (
            <Button key={item}>{item}</Button>
          ))}
        </Box>
      </Grid>
      <h1>FireGram</h1>
      <h2>Your Pictures</h2>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
    </div>
  );
};

export default Header;

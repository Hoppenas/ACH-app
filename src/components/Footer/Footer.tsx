import React from "react";
import Box from "@mui/material/Box";
import { Link, Typography } from "@mui/material";

const Footer: React.FC = () => {
  return (
    <Box width="100%" component="footer">
      <Typography variant="subtitle2" align="center">
        {"Copyright © "}
        <Link color="inherit" href="https://www.agnegrimas.com/">
          Agne
        </Link>{" "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
    </Box>
  );
};

export default Footer;

import { FC } from "react";
import { Box, Link, Typography } from "@mui/material";

const getCurrentYear = () => new Date().getFullYear();

const Footer: FC = () => (
  <Box width="100%" component="footer" marginTop="auto">
    <Typography variant="subtitle2" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://www.agnegrimas.lt/">
        Agne
      </Link>{" "}
      {getCurrentYear()}
      {"."}
    </Typography>
  </Box>
);

export default Footer;

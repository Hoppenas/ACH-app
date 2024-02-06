import { FC } from "react";
import Box from "@mui/material/Box";
import { Link, Typography } from "@mui/material";

const Footer: FC = () => {
  return (
    <Box width="100%" component="footer" marginTop="auto">
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

import { Box, Grid, Typography, IconButton } from "@mui/material";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import PhoneIcon from "@mui/icons-material/Phone";
import {
  instagramLink,
  facebookLink,
  instagramName,
  facebookName,
  tel,
  email,
} from "../../constants/links";

const ContactList = () => {
  return (
    <Box width="fit-content" marginTop={2}>
      <Grid container direction="row" alignItems="center">
        <IconButton
          color="inherit"
          sx={{
            padding: 0,
            cursor: "pointer",
          }}
          href={instagramLink}
          target="_blank"
        >
          <InstagramIcon />
          <Typography variant="h6" marginLeft={1}>
            {instagramName}
          </Typography>
        </IconButton>
      </Grid>
      <Grid container direction="row" alignItems="center">
        <IconButton
          color="inherit"
          sx={{ padding: 0, cursor: "pointer" }}
          href={facebookLink}
          target="_blank"
        >
          <FacebookIcon />
          <Typography variant="h6" marginLeft={1}>
            {facebookName}
          </Typography>
        </IconButton>
      </Grid>
      <Grid container direction="row" alignItems="center">
        <AlternateEmailIcon />
        <Typography variant="h6" marginLeft={1}>
          {email}
        </Typography>
      </Grid>

      <Grid container direction="row" alignItems="center" marginBottom={2}>
        <PhoneIcon />
        <Typography variant="h6" marginLeft={1}>
          {tel}
        </Typography>
      </Grid>
    </Box>
  );
};

export default ContactList;

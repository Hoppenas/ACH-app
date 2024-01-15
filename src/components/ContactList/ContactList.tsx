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
    <Box width="fit-content">
      <Grid container direction="row" alignItems="center">
        <AlternateEmailIcon />
        <Typography variant="h5" marginLeft={1}>
          {email}
        </Typography>
      </Grid>

      <Grid container direction="row" alignItems="center" marginBottom={2}>
        <PhoneIcon />
        <Typography variant="h5" marginLeft={1}>
          {tel}
        </Typography>
      </Grid>
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
        </IconButton>
        <Typography variant="h5" marginLeft={1}>
          {instagramName}
        </Typography>
      </Grid>
      <Grid container direction="row" alignItems="center">
        <IconButton
          color="inherit"
          sx={{ padding: 0, cursor: "pointer" }}
          href={facebookLink}
          target="_blank"
        >
          <FacebookIcon />
        </IconButton>
        <Typography variant="h5" marginLeft={1}>
          {facebookName}
        </Typography>
      </Grid>
    </Box>
  );
};

export default ContactList;

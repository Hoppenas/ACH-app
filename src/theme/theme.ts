import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  typography: {
    fontFamily: "DM Sans",
    subtitle1: {
      fontFamily: "Dancing Script",
      fontSize: "4.5rem",
      fontWeight: 300,
    },
    subtitle2: {
      fontSize: "1rem",
      fontWeight: 300,
    },
    h3: {
      fontSize: "3.5rem",
      fontWeight: 300,
    },
    h6: {
      fontSize: "1.2rem",
      fontWeight: 300,
      letterSpacing: 2,
      lineHeight: 1.5,
    },
  },
  palette: {
    primary: {
      main: "#FFF",
      contrastText: "#FFF",
    },
  },
});

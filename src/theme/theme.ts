import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  typography: {
    fontFamily: "DM Sans",
    h3: {
      fontFamily: "Dancing Script",
      fontSize: "4.5rem",
      fontWeight: 300,
    },
    h6: {
      fontSize: "1.4rem",
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

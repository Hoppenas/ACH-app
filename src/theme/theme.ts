import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  typography: {
    fontFamily: "Cursive",
    h3: {
      fontSize: "2.5rem",
      fontWeight: 700,
    },
    h6: {
      fontSize: "1rem",
      fontWeight: 500,
    },
  },
  palette: {
    primary: {
      main: "#FFF",
      contrastText: "#FFF",
    },
  },
});

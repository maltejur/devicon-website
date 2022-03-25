import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: "#60be86",
    },
    secondary: {
      main: "#6069be",
    },
    error: {
      main: red.A400,
    },
  },
  typography: {
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif',
  },
  components: {
    MuiButtonBase: {
      styleOverrides: {
        root: {
          borderRadius: "10px",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          padding: "8px 20px",
          borderRadius: "6px",
          boxShadow: "3px 5px 0 0 rgba(0, 0, 0, 0.05)",
          backgroundColor: "#fdfdfd",
          ":hover": {
            boxShadow: "3px 5px 0 0 rgba(0, 0, 0, 0.1)",
            backgroundColor: "#ffffff",
          },
        },
        contained: {
          color: "white",
          backgroundColor: "#60be86",
          ":hover": {
            backgroundColor: "#70ce96",
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: "#fcfcfc",
          boxShadow: "3px 5px 0 0 rgba(0, 0, 0, 0.05)",
        },
        rounded: {
          borderRadius: "10px",
        },
      },
    },
  },
});

export default theme;

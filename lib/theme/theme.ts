import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#00D17F", // Keep this as fallback
    },
    secondary: {
      main: "#00664F",
    },
    error: {
      main: "#FF0000",
    },
  },
  components: {
    MuiButton: {
      defaultProps: {
        variant: "contained",
      },
      styleOverrides: {
        root: {
          padding: "8px 24px",
          // Add gradient style for contained primary buttons
          "&.MuiButton-containedPrimary": {
            background: "#00D17F",
            "&:hover": {
              background: "linear-gradient(to right, #16a34a, #065f46)",
              // Optional: add a slight darkening effect on hover
              filter: "brightness(0.95)",
            },
          },
        },
      },
    },
    MuiContainer: {
      defaultProps: {
        maxWidth: "lg",
      },
    },
  },
  typography: {
    body1: {
      color: "#0B1134CC",
    },
  },
});

theme.shadows[1] = "0px 5px 22px lightgray";

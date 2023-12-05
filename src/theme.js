import { red } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";
import { enUS } from "@mui/material/locale";

// A custom theme for this app
const theme = createTheme({
  palette: {
    primary: {
      main: "#556cd6",
    },
    secondary: {
      main: "#19857b",
    },
    error: {
      main: red.A400,
    },
    background: { default: "#EFF2EF" },
  },
  enUS,
});

export default theme;

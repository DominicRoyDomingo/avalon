import { createMuiTheme } from "@material-ui/core/styles";
import { red, yellow } from "@material-ui/core/colors";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#fff",
    },
    secondary: {
      main: "#333",
    },
    error: {
      main: red[400],
    },
    focus: {
      main: yellow[800],
    },
  },
  typography: {
    h1: {
      fontFamily: "Nova Slim",
      fontSize: 36,
    },
    fontFamily: "Montserrat",
    subtitle1: {
      lineHeight: 1.5,
      paddingLeft: 10,
      opacity: 0.8,
    },
    subtitle2: {
      fontWeight: 600,
    },
  },
});

export default theme;

import { useState } from "react";
import { createTheme } from "@material-ui/core/styles";
import { blue, blueGrey } from "@material-ui/core/colors";

const defaultTheme = {
  palette: {
    primary: blue,
    secondary: blueGrey, //ss,
    //type: "dark",
  },
  typography: {
    fontFamily: "'Oxanium', cursive;",
  },
  status: {
    danger: "orange",
  },
};

export function useTheme() {
  const [currentTheme, setCurrentTheme] = useState({
    palette: {
      primary: blue,
      secondary: blueGrey,
    },
  });
  const muiTheme = createTheme({
    ...defaultTheme,
    ...currentTheme,
  });
  return [muiTheme, setCurrentTheme];
}

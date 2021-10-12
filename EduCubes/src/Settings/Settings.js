import React from "react";
import Content from "../Dashboard/Content";
import Typography from "@material-ui/core/Typography";
import PalettePicker from "../Theme/PalettePicker";

export default function ({ currentTheme, setCurrentTheme }) {
  return (
    <Content>
      <Typography variant="h3"> Configuraciones </Typography>
      <Typography variant="h6"> Selecciona el color para tu tema </Typography>
      <PalettePicker
        currentTheme={currentTheme}
        setCurrentTheme={setCurrentTheme}
      />
    </Content>
  );
}

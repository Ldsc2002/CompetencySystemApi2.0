import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Title from "./Title";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  depositContext: {
    flex: 1,
  },
  logoColor: {
    color: theme.palette.getContrastText(theme.palette.primary.main),
    backgroundColor: theme.palette.primary.main,
  },
  formControl: {
    justifyContent: "center",
    margin: theme.spacing(1),
    width: "46%"
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  },
  spacer: {
    flexGrow: "1",
  },
  center: {
    display: "flex",
    justifyContent: "center",
  },
}));

export default function AddDisposition() {
  const classes = useStyles();
  const [disposition, setDisposition] = React.useState("");

  const inputLabelDisposition = React.useRef(null);
  const [labelWidthDisposition, setLabelWidthCompetencyElement] = React.useState(0);
  React.useEffect(() => {
    setLabelWidthCompetencyElement(inputLabelDisposition.current.offsetWidth);
  }, []);

  const handleChangeDisposition = event => {
    setDisposition(event.target.value);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  // Hacer que el mapeo de disposiciones solo contenga las que no ha obtenido
  return (
    <React.Fragment>
      <Title>Seleccione una disposición</Title>
      <div className={classes.center}>
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel ref={inputLabelDisposition} id="demo-simple-select-outlined-label">
            Disposición
          </InputLabel>
          <Select
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            value={disposition}
            onChange={handleChangeDisposition}
            labelWidth={labelWidthDisposition}
          >
            <MenuItem value={"Adaptable"}>Adaptable</MenuItem>
            <MenuItem value={"Colaborativo"}>Colaborativo</MenuItem>
            <MenuItem value={"Original"}>Original</MenuItem>
            <MenuItem value={"Meticuloso"}>Meticuloso</MenuItem>
            <MenuItem value={"Apasionado"}>Apasionado</MenuItem>
            <MenuItem value={"Proactivo"}>Proactivo</MenuItem>
            <MenuItem value={"Profesional"}>Profesional</MenuItem>
            <MenuItem value={"Impulsado por un proposito"}>Impulsado por un propósito</MenuItem>
            <MenuItem value={"Responsable"}>Responsable</MenuItem>
            <MenuItem value={"Sensible"}>Sensible</MenuItem>
            <MenuItem value={"Autodirigido"}>Autodirigido</MenuItem>
          </Select>
        </FormControl>
      </div>
      <div className={classes.spacer} />
      <div className={classes.center}>
        <Button
          color="primary"
          variant="contained"
          onClick={scrollToTop}
        >
          Agregar
        </Button>
      </div>
    </React.Fragment>
  );
}

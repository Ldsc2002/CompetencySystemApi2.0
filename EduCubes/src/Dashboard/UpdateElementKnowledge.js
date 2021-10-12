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

export default function UpdateElementKnowledge() {
  const classes = useStyles();
  const [competencyElement, setCompetencyElement] = React.useState("");
  const [skillLevel, setSkillLevel] = React.useState("");

  const inputLabelCompetencyElement = React.useRef(null);
  const [labelWidthCompetencyElement, setLabelWidthCompetencyElement] = React.useState(0);
  React.useEffect(() => {
    setLabelWidthCompetencyElement(inputLabelCompetencyElement.current.offsetWidth);
  }, []);

  const inputLabelSkillLevel = React.useRef(null);
  const [labelWidthSkillLevel, setLabelWidthSkillLevel] = React.useState(0);
  React.useEffect(() => {
    setLabelWidthSkillLevel(inputLabelSkillLevel.current.offsetWidth);
  }, []);

  const handleChangeCompetencyElement = event => {
    setCompetencyElement(event.target.value);
  };

  const handleChangeSkillLevel = event => {
    setSkillLevel(event.target.value);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <React.Fragment>
      <Title>Seleccione un elemento y un nivel de habilidad</Title>
      <div className={classes.center}>
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel ref={inputLabelCompetencyElement} id="demo-simple-select-outlined-label">
            Elemento de competencia
          </InputLabel>
          <Select
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            value={competencyElement}
            onChange={handleChangeCompetencyElement}
            labelWidth={labelWidthCompetencyElement}
          >
            <MenuItem value={10}>Elemento competencia 1</MenuItem>
            <MenuItem value={20}>Elemento competencia 2</MenuItem>
            <MenuItem value={30}>Elemento competencia 3</MenuItem>
          </Select>
        </FormControl>
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel ref={inputLabelSkillLevel} id="demo-simple-select-outlined-label">
            Nivel de habilidad
          </InputLabel>
          <Select
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            value={skillLevel}
            onChange={handleChangeSkillLevel}
            labelWidth={labelWidthSkillLevel}
          >
            <MenuItem value={"Recordando"}>Recordando</MenuItem>
            <MenuItem value={"Entendiendo"}>Entendiendo</MenuItem>
            <MenuItem value={"Aplicando"}>Aplicando</MenuItem>
            <MenuItem value={"Analizando"}>Analizando</MenuItem>
            <MenuItem value={"Evaluando"}>Evaluando</MenuItem>
            <MenuItem value={"Creando"}>Creando</MenuItem>
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
          Actualizar
        </Button>
      </div>
    </React.Fragment>
  );
}

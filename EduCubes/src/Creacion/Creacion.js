import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Content from "../Dashboard/Content";
import Tabla from "./Tabla"
import Tabla2 from "./Tabla2"
import Descripcion from "./Descripcion";

const useStyles = makeStyles((theme) => ({
  depositContext: {
    flex: 1,
  },
  logoColor: {
    color: theme.palette.getContrastText(theme.palette.primary.main),
    backgroundColor: theme.palette.primary.main,
  },
  spacer: {
    flexGrow: "1",
  },
  center: {
    display: "flex",
    justifyContent: "center",
  },
}));

export default function Movimientos() {
  const classes = useStyles();
  const [rowsCompetency, setRowsCompetency] = useState([]);

  const scrollToTop = () => {
    console.log(rowsCompetency)
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <React.Fragment>
      <Descripcion />
      <Tabla />
      <Tabla2 rows={rowsCompetency} setRows={setRowsCompetency} />
      <div className={classes.center}>
      <Content>
        <Button
          color="primary"
          variant="contained"
          onClick={scrollToTop}
        >
          Crear
        </Button>
      </Content>
      </div>
    </React.Fragment>
  );
}

import React, { useRef, useState } from "react";
// import { makeStyles } from "@material-ui/core/styles";
import Title from "../Dashboard/Title";
import AccountCircle from '@material-ui/icons/AccountCircle';
import Button from "@material-ui/core/Button";
import Content from "../Dashboard/Content";
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from "@material-ui/core/TextField";
import { SummaryCard } from "../Creacion/Driver";

/* const useStyles = makeStyles((theme) => ({
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
*/

export default function Autorization() {
    const valueRefNombreCompetencia = useRef('');
    const [texto1, setTexto1] = useState();

    const handleValueRefNombreCompetenciaChange = () => {
        setTexto1(valueRefNombreCompetencia.current.value);
    }

    const scrollToTop = () => {
        console.log(texto1)
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

  // let version = "4.0";
  // let otorgada = "Universidad del Valle de Guatemala";

  return (
    <React.Fragment>
        <Content>
        <SummaryCard
            title="Autorizaciones sobre mis competencias"
            component={
                <>
                <Title>Actualización de competencias</Title>
                <br />
                <div style={{ display: "flex", justifyContent: "space-around" }}>
                    <TextField
                        style={{ width: "69%" }}
                        id="codigo-cartera"
                        label="Código de cartera"
                        variant="outlined"
                        inputRef={valueRefNombreCompetencia}
                        onChange={handleValueRefNombreCompetenciaChange}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                <AccountCircle />
                                </InputAdornment>
                            ),
                        }}
                    />
                    <Button
                        style={{ width: "29%" }}
                        color="primary"
                        variant="contained"
                        onClick={scrollToTop}
                    >
                        Autorizar
                    </Button>
                </div>
                <br />
                </>
            } />
        </Content>
    </React.Fragment>
  );
}

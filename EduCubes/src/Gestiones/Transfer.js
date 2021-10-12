import React, { useRef, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Title from "../Dashboard/Title";
import AccountCircle from '@material-ui/icons/AccountCircle';
import Button from "@material-ui/core/Button";
import Content from "../Dashboard/Content";
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from "@material-ui/core/TextField";
import { SummaryCard } from "../Creacion/Driver";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

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

export default function Transfer() {
    const classes = useStyles();
    let rows = [
        {
            id: "Redes"
        },
        {
            id: "jlkdsjasljdlajslds"
        }
    ];

    const valueRefNombreCompetencia = useRef('');
    const [competency, setCompetency] = React.useState('');
    const inputLabelCompetency = React.useRef(null);

    const [labelWidthCompetency, setLabelWidthCompetency] = React.useState(0);
    React.useEffect(() => {
    setLabelWidthCompetency(inputLabelCompetency.current.offsetWidth);
    }, []);

    const [texto1, setTexto1] = useState();

    const handleValueRefNombreCompetenciaChange = () => {
        setTexto1(valueRefNombreCompetencia.current.value);
    }

    const handleChangeCompetency = event => {
        setCompetency(event.target.value);
    };

    const scrollToTop = () => {
        console.log(texto1)
        console.log(competency)
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
            title="Permisos sobre competencias"
            component={
                <>
                <Title>Transferir</Title>
                <br />
                <div style={{ display: "flex", justifyContent: "space-around" }}>
                    <TextField
                        style={{ width: "49%" }}
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
                    <FormControl variant="outlined" className={classes.formControl} style={{ width: "49%" }}>
                        <InputLabel ref={inputLabelCompetency} id="demo-simple-select-outlined-label">
                            Competencia
                        </InputLabel>
                        <Select
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            value={competency}
                            onChange={handleChangeCompetency}
                            labelWidth={labelWidthCompetency}
                        > 
                        {rows
                        .map(row => (
                            <MenuItem key={row.id} value={row.id}>
                                {row.id}
                            </MenuItem>
                        ))}
                        </Select>
                    </FormControl>
                </div>
                <br />
                <div className={classes.center}>
                <Button
                    color="primary"
                    variant="contained"
                    onClick={scrollToTop}
                >
                    Transferir
                </Button>
                </div>
                </>
            } />
        </Content>
    </React.Fragment>
  );
}

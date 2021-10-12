import React, { useRef, useState } from "react";
import Title from "../Dashboard/Title";
import Content from "../Dashboard/Content";
import TextField from "@material-ui/core/TextField";
import { SummaryCard } from "./Driver";

export default function Descripcion() {
  const valueRefNombreCompetencia = useRef('');
  const valueRefVersionCompetencia = useRef('');
  const valueRefDescripcionCompetencia = useRef('');

  // Agregar estas variables desde el template de Creacion
  const [texto1, setTexto1] = useState();
  const [texto2, setTexto2] = useState();
  const [texto3, setTexto3] = useState();

  const handleValueRefNombreCompetenciaChange = () => {
    setTexto1(valueRefNombreCompetencia.current.value);
  }

  const handleValueRefVersionCompetenciaChange = () => {
    setTexto2(valueRefVersionCompetencia.current.value);
  }

  const handleValueRefDescripcionCompetenciaChange = () => {
    setTexto3(valueRefDescripcionCompetencia.current.value);
  }

  // Pruebas
  // let version = "4.0";
  // let otorgada = "Universidad del Valle de Guatemala";

  return (
    <React.Fragment>
        <Content>
        <SummaryCard
            title="Creación de competencia"
            component={
                <>
                <Title>Competencia</Title>
                <br />
                <div style={{ display: "flex", justifyContent: "space-around" }}>
                    <TextField
                        style={{ width: "74%" }}
                        multiline
                        minRows={2}
                        maxRows={2}
                        id="codigo-cartera"
                        label="Nombre"
                        variant="outlined"
                        inputRef={valueRefNombreCompetencia}
                        onChange={handleValueRefNombreCompetenciaChange}
                    />
                    <TextField
                        style={{ width: "24%" }}
                        multiline
                        minRows={2}
                        maxRows={2}
                        id="codigo-cartera"
                        label="Versión"
                        variant="outlined"
                        inputRef={valueRefVersionCompetencia}
                        onChange={handleValueRefVersionCompetenciaChange}
                    />
                </div>
                <br />
                <TextField
                    fullWidth
                    multiline
                    minRows={4}
                    maxRows={4}
                    id="codigo-cartera"
                    label="Descripción"
                    variant="outlined"
                    inputRef={valueRefDescripcionCompetencia}
                    onChange={handleValueRefDescripcionCompetenciaChange}
                />
                </>
            } />
        </Content>
    </React.Fragment>
  );
}

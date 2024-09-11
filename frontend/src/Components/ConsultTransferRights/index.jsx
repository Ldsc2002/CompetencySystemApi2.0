import React, { useState } from 'react';
import styles from './consultTransferRights.module.css';
import Switch from '@material-ui/core/Switch';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import AlertButton from '../AlertButton';
import Container from '../Container';

const ConsultTransferRights = (props) => {
  const [transferInputs, setTransferInputs] = useState([]);
  const [state, setState] = useState(true);

  const handleChange = () => {
    setState(!state);
  };

  const config = [
    {
      type: "transferBlockRedux",
      state: transferInputs,
      method: setTransferInputs,
      options: props.accounts,
      extraOptions: props.competencys.map((c) => c.name),
    },
  ];

  const selectedCompetencyName = transferInputs.length > 0 && transferInputs[1] !== "" ? transferInputs[1] : "";
  const selectedCompetency = props.competencys.find((competency) => competency.name === selectedCompetencyName);

  const method = async () => {
    if (transferInputs[0] && selectedCompetency) {
      const response = state
        ? await props.methodRepresentative(transferInputs[0], selectedCompetency.blockId)
        : await props.methodRights(transferInputs[0], selectedCompetency.blockId);

      return state
        ? {
            title: "Representación de competencia",
            text: response ? "Es representante" : "No es representante",
          }
        : {
            title: "Derechos de transferencia",
            text: `Este usuario puede transferir ${response.toString()} competencias`,
          };
    } else {
      return { title: "Error", text: "Ingrese todos los campos de manera adecuada" };
    }
  };

  const helpMethod = async () => ({
    title: "Módulo de consulta de permisos de transferencia",
    text: "Este módulo se utiliza para la consulta de los permisos de transferencia, ya sea para un representante o intermediario.",
  });

  return (
    <div className={styles.wrapper}>
      <div style={{ display: "flex", justifyContent: "space-between", width: '100%' }}>
        <p className={styles.title}>Consultar permisos de transferencia</p>
        <AlertButton text="?" method={helpMethod} />
      </div>
      <Typography component="div">
        <Grid component="label" container alignItems="center" spacing={1}>
          <Grid item>Representante</Grid>
          <Grid item>
            <Switch
              checked={state}
              onChange={handleChange}
              name="checkedA"
              inputProps={{ 'aria-label': 'secondary checkbox' }}
            />
          </Grid>
          <Grid item>Intermediario</Grid>
        </Grid>
      </Typography>
      <br />
      <div style={{ display: 'flex' }}>
        {config.map((value, index) => (
          <Container
            key={index}
            type={value.type}
            options={value.options}
            extraOptions={value.extraOptions}
            value={value.state}
            updateMethod={value.method}
          />
        ))}
      </div>
      <br />
      <AlertButton text="Consultar" method={method} />
    </div>
  );
};

export default ConsultTransferRights;
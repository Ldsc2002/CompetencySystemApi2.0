import React, {useState} from 'react';
import styles from './consultTransferRights.module.css';
import Button from '@material-ui/core/Button';
import ComboBox from '../ComboBox';
import Switch from '@material-ui/core/Switch';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import AlertButton from '../AlertButton';
import Container from '../Container';
import TextField from "@material-ui/core/TextField";

const ConsultTransferRights = (props) => {

  const [transferInputs, setTransferInputs] = useState([])
  const [state, setState] = React.useState(true);
  const handleChange = () => {
    setState(!state);
  };

  const config = [
    {
      type:"transferBlockRedux", 
      state: transferInputs,
      method: setTransferInputs,
      options: props.accounts,
      extraOptions: props.competencys.map((c) => {return c.name})
    },
  ]

  const selectedCompetencyName = (transferInputs.length > 0 && transferInputs[1] != "" ) ? transferInputs[1] : "" 
  const selectedCompetency = props.competencys.filter(competency => competency.name == selectedCompetencyName)[0]

  const method = async () => {
    let response
    if (transferInputs[0] && selectedCompetency) {
      (state) ?
      response = await props.methodRepresentative(
        transferInputs[0], 
        selectedCompetency.blockId
      )
      :
      response = await props.methodRights(
        transferInputs[0],
        selectedCompetency.blockId
      )
      return (state) ? {
        "title": "Representació'de competencia", 
        "text": response ? "Es representante ": "No es representante"
      } : {
        "title": "Derechos de transferencia", 
        "text": "Este usuario puede transferir "+response.toString()+" compentecias"
      }
    } else {
      return {"title": "Error", "text": "Ingrese todos lo campos de manera adecuada"}
    }

  }

  const helpMethod = async () => {
    return {
      "title":"Módulo de consulta de permisos de transferencia",
      "text":"Este módulo se utiliza para la consulta de los permisos de transferencia ya sea para un representante o intermediario"
    }
  }
  return (      
    <div className={styles.wrapper}>
      <div style={{display:"flex", justifyContent: "space-between", width: '100%'}}>
        <p className={styles.title}>Consultar permisos de transferencia</p>
        <AlertButton
          text={"?"}
          method={(value) => helpMethod(value)}
        />
      </div>
      <Typography component="div">
          <Grid component="label" container alignItems="center" spacing={1}>
            <Grid item>Representante</Grid>
            <Grid item>
              <Switch
                checked={state.checkedA}
                onChange={handleChange}
                name="checkedA"
                inputProps={{ 'aria-label': 'secondary checkbox' }}
              />
            </Grid>
            <Grid item>Intermediario</Grid>
          </Grid>
        </Typography>
        <br/>
        <div style={{display:'flex'}}>    
          {config.map((value, index) => (
            <Container
              key = {index}
              type = {value.type}
              placeHolder = {value.placeHolder}
              title = {value.title}
              options = {value.options}
              extraOptions = {value.extraOptions}
              value = {value.state}
              updateMethod = {value.method}
              rows = {value.rows}
            />
          ))}     
        </div>
        <br/>
        <AlertButton
          text={"Consultar"}
          method={() => method()}
        />
    </div>
  );
}

export default ConsultTransferRights;
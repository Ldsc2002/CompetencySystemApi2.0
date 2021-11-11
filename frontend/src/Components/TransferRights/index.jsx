import React, {useState} from 'react';
import styles from './transferRights.module.css';
import Button from '@material-ui/core/Button';
import ComboBox from '../ComboBox';
import Switch from '@material-ui/core/Switch';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import AlertButton from '../AlertButton';
import Container from '../Container';
import TextField from "@material-ui/core/TextField";

const TransferRights = (props) => {

  const [transferInputs, setTransferInputs] = useState([])
  const [state, setState] = React.useState(true);
  const [permissions, setPermissions] = useState(false)
  const handleChange = () => {
    setState(!state);
  };

  const [amount, setAmount] = useState(1)

  const handleChangeTextInput = (event) => {
    setAmount(event.target.value);
  };

  const config = [
    {
      type:"transferBlock", 
      state: transferInputs,
      method: setTransferInputs,
      options: props.accounts,
      extraOptions: props.competencys.map((c) => {return c.name})
    },
  ]
  const PERMISSIONS = ["Dar permiso", "Quitar permiso"]
  const selectedCompetencyName = (transferInputs.length > 0 && transferInputs[2] != "" ) ? transferInputs[2] : "" 
  const selectedCompetency = props.competencys.filter(competency => competency.name == selectedCompetencyName)[0]

  const method = async () => {
    let response
    (state) ?
    response = await props.methodRepresentative(
      transferInputs[0], 
      transferInputs[1], 
      selectedCompetency.blockId,
      permissions
    )
    :
    response = await props.methodRights(
      transferInputs[0], 
      transferInputs[1], 
      selectedCompetency.blockId,
      amount
    )
    return {
      "title": "Estado de Permiso", 
      "text": response ? "Tiene permiso de edición": "No tiene permiso de edición"
    }

  }

  return (      
    <div className={styles.wrapper}>
      <div style={{display:"flex", justifyContent: "space-between", width: '100%'}}>
        <p className={styles.title}>Brindar permisos de transferencia</p>
        <AlertButton
          text={"?"}
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
        { state && 
          <ComboBox
            value = {permissions}
            options = {PERMISSIONS}
            method = {(value) => setPermissions(value)}
            title = {"Seleccione el permiso"}
          /> 
        }
        { !state && 
          <TextField
            id="standard-number"
            label="Cantidad"
            type="number"
            style = {{marginLeft:6}}
            value={amount}
            onChange={handleChangeTextInput}
          />
        }
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

export default TransferRights;
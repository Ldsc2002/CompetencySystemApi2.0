import React, {useState} from 'react';
import styles from './permissionConsultor.module.css';
import Button from '@material-ui/core/Button';
import ComboBox from '../ComboBox';
import Switch from '@material-ui/core/Switch';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import AlertButton from '../AlertButton';
import Container from '../Container';

const PermissionConsultor = (props) => {

  const [transferInputs, setTransferInputs] = useState([])
  const [state, setState] = React.useState(true);

  const handleChange = () => {
    setState(!state);
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

  const selectedCompetencyName = (transferInputs.length > 0 && transferInputs[2] != "" ) ? transferInputs[2] : "" 
  const selectedCompetency = props.competencys.filter(competency => competency.name == selectedCompetencyName)[0]

  const method = async () => {
    let response
    (state) ?
    response = await props.methodCreator(
      transferInputs[0], 
      transferInputs[1], 
      selectedCompetency.blockId
    )
    :
    response = await props.methodOwner(
      transferInputs[0], 
      transferInputs[1], 
      selectedCompetency.blockId
    )
    return {
      "title": "Estado de Permiso", 
      "text": response ? "Tiene permiso de edición": "No tiene permiso de edición"
    }

  }

  return (      
    <div className={styles.wrapper}>
      <p className={styles.title}>Consultar permiso de edición</p>
      <Typography component="div">
          <Grid component="label" container alignItems="center" spacing={1}>
            <Grid item>Creador</Grid>
            <Grid item>
              <Switch
                checked={state.checkedA}
                onChange={handleChange}
                name="checkedA"
                inputProps={{ 'aria-label': 'secondary checkbox' }}
              />
            </Grid>
            <Grid item>Dueño</Grid>
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

export default PermissionConsultor;
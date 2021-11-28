import React, {useState} from 'react';
import styles from './editPermission.module.css';
import ComboBox from '../ComboBox';
import Switch from '@material-ui/core/Switch';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '../Container';
import AlertButton from '../AlertButton';

const EditPermission = (props) => {
    
    const [transferInputs, setTransferInputs] = useState([])
    const [ownerAccount, setOwnerAccount] = useState([])
    const [permissions, setPermissions] = useState("Dar permiso")
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
      }
    ]

    const selectedCompetencyName = (transferInputs.length > 0 && transferInputs[2] != "" ) ? transferInputs[2] : "" 
    const selectedCompetency = props.competencys.filter(competency => competency.name == selectedCompetencyName)[0]
    const permission = permissions === "Dar permiso" ? true : false

    const helpMethod = async () => {
      return {
        "title":"Módulo de permisos de edición",
        "text":"Este módulo se utiliza para brindar permisos de edición. Ya sea por parte del dueño o del creador de una competencias. El permiso del dueño habilita la edición, mientras que el permiso del creador se ve reflejado en el nuevo registro"
      }
    }

  
    const method = async () => {
      if (transferInputs[0] && transferInputs[1] && selectedCompetency && permissions && ((state ? ownerAccount : true) )) {
        let response
        (state) ?
        await props.methodCreator(
          ownerAccount,
          transferInputs[0], 
          transferInputs[1], 
          selectedCompetency.blockId,
          permission
        )
        :
        await props.methodOwner(
          transferInputs[0], 
          transferInputs[1], 
          selectedCompetency.blockId,
          permission
        )
        if (response == undefined){
          return {"title": "Estado del permiso", "text": "El permiso se ha actualizado"}
        } else {
          return {"title": "Error", "text": response}  
        }
      } else {
        return {"title": "Error", "text": "Ingrese todos lo campos de manera adecuada"}
      }
    }

    const PERMISSIONS = ["Dar permiso", "Quitar permiso"]
    return (      
      <div className={styles.wrapper}>
        <div style={{display:"flex", justifyContent: "space-between", width: '100%'}}>
        <p className={styles.title}>Dar permiso de edición</p>
        <AlertButton
          text={"?"}
          method={(value) => helpMethod(value)}
        />
        </div>
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
          <div style={{display: 'flex', flexDirection: 'row'}}>
          { state &&
          <ComboBox
              value = {ownerAccount}
              options = {props.accounts}
              method = {(value) => setOwnerAccount(value)}
              title = {"Seleccione la billetera del creador"}
          /> 
          }
          </div>
          <ComboBox
              value = {permissions}
              options = {PERMISSIONS}
              method = {(value) => setPermissions(value)}
              title = {"Seleccione el permiso"}
          /> 
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
          text={"Brindar"}
          method={() => method()}
        />
      </div>
    );
}

export default EditPermission;
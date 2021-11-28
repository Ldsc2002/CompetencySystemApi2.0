import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import styles from './competencyTransfer.module.css';
import Container from '../Container';
//import ComboBox from '../ComboBox';
import Button from '@material-ui/core/Button';
import AlertButton from '../AlertButton';
import Switch from '@material-ui/core/Switch';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextInput from '../TextInput';

const CompetencyTransfer = (props) => {

    const [transferInputs, setTransferInputs] = useState([])
    const [state, setState] = React.useState(true);
  
    const handleChange = () => {
      setState(!state);
    };

    const useStyles = makeStyles((theme) => ({
      margin: {
        margin: theme.spacing(1),
      }
    }));


    const selectedCompetencyName = (transferInputs.length > 0 && transferInputs[2] != "" ) ? transferInputs[2] : "" 
    const selectedCompetency = props.competencys.filter(competency => competency.name == selectedCompetencyName)[0]
    const kes = (props.knowledgeElements && selectedCompetency) 
       ? props.knowledgeElements.filter(ke => selectedCompetency.knowledgeElements.includes(ke.id)).map(ke => {return ke.name})
       : []

    const [skillInputs, setSkillInputs] = useState({}) 

    const helpMethod = async () => {
      return {
        "title":"Módulo de transferencia y edición de competencias",
        "text":"Este módulo se utiliza para la transferencia de comptencias y edición de registros de habilidades de competencias. La transferecia debe de ser realizada por un intermediario, representante, o dueño de la competnecia. En el caso de la edición es necesario tener el permiso del dueño. Si se brinda permiso del creador se vera reflejado en el nuevo registro"
      }
    }

    const method = async () => {
      let res
      if (transferInputs[0] && transferInputs[1] && transferInputs[2] &&
        (Object.values(skillInputs).length == kes.length) ) {
        (state) ?
        res = await props.awardMethod(
          transferInputs[0], 
          transferInputs[1], 
          props.competencys.filter(c => c.name === transferInputs[2])[0].blockId, 
          Object.values(skillInputs)
        )
        :
        res = await props.updateMethod(
          transferInputs[0], 
          transferInputs[1], 
          props.competencys.filter(c => c.name === transferInputs[2])[0].blockId, 
          Object.values(skillInputs)
        )
        console.log(res)
        if (res.length == ""){
          return (state) ?  
            {"title": "Estado de transferencia", "text": "Se ha concedido la competencia"}
              :
            {"title": "Estado de edición", "text": "Se ha editado el registro de la competencia"}
        } else {
          return{"title": "Error", "text": res}
        }
      }  else {
        return {"title": "Error", "text": "Ingrese todos lo campos de manera adecuada"}
      }
    }

    const config = [
      {
        type:"transferBlock", 
        state: transferInputs,
        method: setTransferInputs,
        options: props.accounts,
        extraOptions: props.competencys.map((c) => {return c.name})
      },
      {
        type:"selectListElement", 
        options: props.skillLevels,
        extraOptions: kes,
        state: skillInputs,
        method: setSkillInputs,
      },
      
    ]

    const classes = useStyles();
    
    return (
      <div className={styles.wrapper}>
        <div style={{display:"flex", justifyContent: "space-between", width: '100%'}}>
        <p className={styles.title}>Conceder y editar competencias</p>
        <AlertButton
          text={"?"}
          method={(value) => helpMethod(value)}
        />
        </div>
          <Typography component="div">
            <Grid component="label" container alignItems="center" spacing={1}>
              <Grid item>Conceder</Grid>
              <Grid item>
                <Switch
                  checked={state.checkedA}
                  onChange={handleChange}
                  name="checkedA"
                  inputProps={{ 'aria-label': 'secondary checkbox' }}
                />
              </Grid>
              <Grid item>Editar</Grid>
            </Grid>
          </Typography>
          <div style={{display:'flex', justifyContent: 'space-between'}}>
            <AlertButton
              text={state ? "Transferir" : "Editar"}
              method={() => method()}
            />
          </div>
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
        </div>
    );
}

export default CompetencyTransfer;
import React, {useState} from 'react';
//import { withStyles } from '@material-ui/core/styles';
import styles from './itemCreator.module.css';
import Button from '@material-ui/core/Button';
import TextInput from '../TextInput';
import Switch from '@material-ui/core/Switch';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import AlertButton from '../AlertButton';

const ItemCreator = (props) => {

    //const [selectedAccount, setSelectedAccount] = useState("")
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")

    const [state, setState] = React.useState(true);
  
    const handleChange = () => {
      setState(!state);
    };
    
    const method = async () => {
      if (name.replace.length !== 0 && description.length !== 0){
        if (state) {
          props.createDispositions({"name":name, "meaning":description})
          return {"title": "Elemento creado", "text": "La disposición ha sido creada"}
        } else {
          props.createKnowledgeElement({"name":name, "meaning":description})
          return {"title": "Elemento creado", "text": "El elemento de conocimiento ha sido creado"}
        }
      } else {
        return {"title": "Error", "text": "Ingrese toda la infomación en los campos"}
      }
    }

    return (      
      <div className={styles.wrapper}>
        <div style={{display:"flex", justifyContent: "space-between", width: '100%'}}>
        <p className={styles.title}>Creación de disposiciones y elementos de conocimiento</p>
        <AlertButton
          text={"?"}
        />
        </div>
        <Typography component="div">
            <Grid component="label" container alignItems="center" spacing={1}>
              <Grid item>Disposiciones</Grid>
              <Grid item>
                <Switch
                  checked={state.checkedA}
                  onChange={handleChange}
                  name="checkedA"
                  inputProps={{ 'aria-label': 'secondary checkbox' }}
                />
              </Grid>
              <Grid item>Elementos de conocimiento</Grid>
            </Grid>
          </Typography>
          <div style={{display:'flex', flexDirection: 'column'}}>    
            <TextInput
                placeHolder = {"Ingrese el nombre"}
                value = {name}
                updateMethod = {(newValue) => setName(newValue)}
                rows = {1}
              /> 
            <br/>
            <TextInput
              placeHolder = {"Ingrese la descripción"}
              value = {description}
              updateMethod = {(newValue) => setDescription(newValue)}
              rows = {8}
            /> 
            <br/>
            <AlertButton
              text={"Crear"}
              method={(value) => method(value)}
          />
          </div>
      </div>
    );
}

export default ItemCreator;
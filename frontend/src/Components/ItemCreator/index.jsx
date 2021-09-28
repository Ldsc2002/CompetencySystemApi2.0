import React, {useState} from 'react';
//import { withStyles } from '@material-ui/core/styles';
import styles from './itemCreator.module.css';
import Button from '@material-ui/core/Button';
import TextInput from '../TextInput';
import Switch from '@material-ui/core/Switch';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const ItemCreator = (props) => {

    //const [selectedAccount, setSelectedAccount] = useState("")
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")

    const [state, setState] = React.useState(true);
  
    const handleChange = () => {
      setState(!state);
    };
    
    return (      
      <div className={styles.wrapper}>
        <text className={styles.title}>Creación de disposiciones y elementos de conocimiento</text><Typography component="div">
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
            <Button 
              size="medium" 
              variant="outlined" 
              color="secondary"
              onClick={
                () => {
                  ///if (name.length !== 0 || description.length !== 0){
                    props.createKnowledgeElement(name, description)
                  /*
                  } else {
                    alert("Fill all fields")
                  }*/
                }
              }>
              Crear
            </Button>
          </div>
      </div>
    );
}

export default ItemCreator;
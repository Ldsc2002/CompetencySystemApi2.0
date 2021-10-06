import React, {useState} from 'react';
import styles from './editPermission.module.css';
import Button from '@material-ui/core/Button';
import ComboBox from '../ComboBox';
import Switch from '@material-ui/core/Switch';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '../Container';

const EditPermission = (props) => {
    const [selectedAccount, setSelectedAccount] = useState("")
    const [description, setDescription] = useState("")
    const [state, setState] = React.useState(true);
  
    const handleChange = () => {
      setState(!state);
    };

    const config = [
      {
        type:"transferBlock", 
        state: description,
        method: setDescription,
        options: props.accounts
      },
    ]

    return (      
      <div className={styles.wrapper}>
        <p className={styles.title}>Dar permiso de edición</p>
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
                value = {value.state}
                updateMethod = {value.method}
                rows = {value.rows}
              />
            ))}     
          </div>
          <br/>
          <Button 
            size="medium" 
            variant="outlined" 
            color="secondary"
            onClick={
              () => console.log("Prueba")
            }>
            consultar
          </Button>
      </div>
    );
}

export default EditPermission;
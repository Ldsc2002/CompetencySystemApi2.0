import React, {useState} from 'react';
import styles from './itemConsultor.module.css';
import Button from '@material-ui/core/Button';
import ComboBox from '../ComboBox';
import Switch from '@material-ui/core/Switch';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const ItemConsultor = (props) => {
    const [selectedAccount, setSelectedAccount] = useState("")
    
    const [state, setState] = React.useState(true);
  
    const handleChange = () => {
      setState(!state);
    };

    return (      
      <div className={styles.wrapper}>
        <p className={styles.title}>Consulta de disposiciones y elementos de conocimiento</p>
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
        <div>
          <ComboBox
              value = {selectedAccount}
              options = {props.accounts}
              method = {(value) => setSelectedAccount(value)}
              title = {"Seleccione una billetera"}
            /> 
          <br/>
          <br/>
          <Button size="medium" variant="outlined" color="secondary">
            consultar
          </Button>
          </div>
      </div>
    );
}

export default ItemConsultor;
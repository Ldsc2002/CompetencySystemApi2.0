import React, {useState} from 'react';
import styles from './competencyConsultor.module.css';
import Button from '@material-ui/core/Button';
import ComboBox from '../ComboBox';

const CompetencyConsultor = (props) => {
    const [selectedAccount, setSelectedAccount] = useState("")
    
    return (      
      <div className={styles.wrapper}>
        <text className={styles.title}>Consulta de nivel</text>
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

export default CompetencyConsultor;
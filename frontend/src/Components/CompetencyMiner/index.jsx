import React, {useState} from 'react';
import styles from './competencyMiner.module.css';
import Button from '@material-ui/core/Button';
import ComboBox from '../ComboBox';
import AlertButton from '../AlertButton';
import TextField from "@material-ui/core/TextField";

const CompetencyMiner = (props) => {
    const [selectedCompetency, setSelectedCompetency] = useState("")
    const [selectedAccount, setSelectedAccount] = useState("")
    const [amount, setAmount] = useState(1)

    const handleChange = (event) => {
      setAmount(event.target.value);
    };
    
    const method = async () => {
      if (
        selectedCompetency != "" && amount > 0 && selectedAccount != ""
      ){
        const array = props.competencys;
        const obj = array.find( ({ name }) => name === selectedCompetency )
        const result = await props.competencysMethod(selectedAccount, obj.blockId, amount)

      } else {
        alert("Seleccione un campo")
      }
    }

  
    return (      
      <div className={styles.wrapper}>
        <p className={styles.title}>Minar competencias</p>
        <div>          
          <ComboBox
            value = {selectedAccount}
            options = {props.accounts}
            method = {(value) => setSelectedAccount(value)}
            title = {"Seleccione una billetera"}
          /> 
          <br/>
          <ComboBox
              value = {selectedCompetency}
              options = {props.competencys ? props.competencys.map((competencys) => {return competencys.name } ) : []}
              method = {(value) => setSelectedCompetency(value)}
              title = {"Seleccione una competencia"}
            /> 
          <br/>
          <TextField
            id="standard-number"
            label="Number"
            type="number"
            value={amount}
            onChange={handleChange}
          />
          <br/>
          <br/>
          <AlertButton
            text={"Minar"}
            method={(value) => method(value)}
          />
          </div>
      </div>
    );
}

export default CompetencyMiner;
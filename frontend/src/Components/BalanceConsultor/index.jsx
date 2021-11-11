import React, {useState} from 'react';
import styles from './balanceConsultor.module.css';
import Button from '@material-ui/core/Button';
import ComboBox from '../ComboBox';
import AlertButton from '../AlertButton';
import TextField from "@material-ui/core/TextField";

const BalanceConsultor = (props) => {
    const [selectedAccount, setSelectedAccount] = useState("")

    const method = async () => {
      if (
        selectedAccount != "" 
      ){
        const result = await props.balanceMethod(selectedAccount)
        return {
          "title": "Balance", 
          "balance": result
        }
      } else {
        alert("Seleccione un campo")
      }
    }

    return (      
      <div className={styles.wrapper}>
        <div style={{display:"flex", justifyContent: "space-between", width: '100%'}}>
        <p className={styles.title}>Consultar Balance</p>
        <AlertButton
          text={"?"}
        />
        </div>
        <div>          
          <ComboBox
            value = {selectedAccount}
            options = {props.accounts}
            method = {(value) => setSelectedAccount(value)}
            title = {"Seleccione una billetera"}
          /> 
          <br/>
          <AlertButton
            text={"Consultar balance"}
            method={(value) => method(value)}
          />
          </div>
      </div>
    );
}

export default BalanceConsultor;
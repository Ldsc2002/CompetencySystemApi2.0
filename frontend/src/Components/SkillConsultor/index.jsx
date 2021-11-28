import React, {useState} from 'react';
import styles from './skillConsultor.module.css';
import ComboBox from '../ComboBox';
import AlertButton from '../AlertButton';

const SkillConsultor = (props) => {
    const [selectedAccount, setSelectedAccount] = useState("")
    const [selectedItem, setSelectedItem] = useState("")
    
    const handleChange = () => {
      setSelectedItem("");
    };

    const competencys = props.competencys ? props.competencys.map(competency => {return competency.name}) : [];
    const accounts = props.accounts ? props.accounts : [];
    
    const helpMethod = async () => {
      return {
        "title":"Módulo de consulta de habilidades",
        "text":"Este módulo se utiliza para la consulta de habilidades que tiene una billetera para una determinada competencia"
      }
    }

    const method = async () => {
      if (selectedItem != "" ){
        const selectedItemId = props.competencys.map(
          (competency, index) => {
            //console.log("c: ", competency.blockId)
            if (competency.name === selectedItem) return competency.blockId
          }
        ).filter(competency => competency !== undefined )[0]
        const response = await props.method(selectedAccount, selectedItemId) 
        if (response === undefined){
          return {"title": "Registros", "text": "Este usuario no cuenta con esta competencia"}
        } else {
          return {"title": "Registros", "records": response }
        }
      } else {
        return {"title": "Error", "text": "Ingrese todos lo campos de manera adecuada"}
      }
    }
    console.log("competencys", competencys)
    return (      
      <div className={styles.wrapper}>
        <div style={{display:"flex", justifyContent: "space-between", width: '100%'}}>
        <p className={styles.title}>Consulta de habilidades</p>
        <AlertButton
          text={"?"}
          method={(value) => helpMethod(value)}
        />
        </div>
        <div>
          { 
          <ComboBox
              value = {selectedAccount}
              options = {accounts}
              method = {(value) => setSelectedAccount(value)}
              title = {"Seleccione una billetera"}
          />} 
          <br/>
          { 
          <ComboBox
              value = {selectedItem}
              options = {competencys}
              method = {(value) => setSelectedItem(value)}
              title = {"Seleccione una competencia"}
          />} 
          <br/>
          <AlertButton
            text={"Consultar"}
            method={(value) => method(value)}
          />
          </div>
      </div>
    );
}

export default SkillConsultor;
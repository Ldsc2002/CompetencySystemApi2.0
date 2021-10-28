import React, {useState} from 'react';
import styles from './skillConsultor.module.css';
import Button from '@material-ui/core/Button';
import ComboBox from '../ComboBox';
import Switch from '@material-ui/core/Switch';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import AlertButton from '../AlertButton';

const SkillConsultor = (props) => {
    const [selectedAccount, setSelectedAccount] = useState("")
    const [selectedItem, setSelectedItem] = useState("")
    
    const handleChange = () => {
      setSelectedItem("");
    };

    const competencys = props.competencys ? props.competencys.map(competency => {return competency.name}) : [];
    const accounts = props.accounts ? props.accounts : [];
    
    const method = async () => {
      if (selectedItem != "" ){
        const selectedItemId = competencys.map(
          (competency, index) => {
            if (competency === selectedItem) return index
          }
        ).filter(competency => competency !== undefined )[0]
        const response = await props.method(selectedAccount, selectedItemId) 
        const result = (response.map(
          record => { 
            return record.author + " " + (
              record.isAuthorized ? "authorized": "not authorized") + " " 
              + record.value.toString() 
          }
        ))
        return {"title": "Registros", "text": "", "knowledgeElements": result }
        
      } else {
        alert("Seleccione un campo")
      }
    }
    console.log("competencys", competencys)
    return (      
      <div className={styles.wrapper}>
        <p className={styles.title}>Consulta de disposiciones y elementos de conocimiento</p>
        <div>
          { 
          <ComboBox
              value = {selectedAccount}
              options = {accounts}
              method = {(value) => setSelectedAccount(value)}
              title = {"Seleccione una competencia"}
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
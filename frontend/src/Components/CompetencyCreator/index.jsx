import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import styles from './competencyCreator.module.css';
import Container from '../Container';
import ComboBox from '../ComboBox';
import TextInput from '../TextInput';
import Button from '@material-ui/core/Button';
//import Typography from '@material-ui/core/Typography';

const CompetencyCreator = (props) => {
    const [name, setName] = useState("")
    const [selectedAccount, setSelectedAccount] = useState("")
    const [description, setDescription] = useState("")
    const [knwolageElements, setKnwolageElements] = useState( 
      (props.knowledgeElements) ? 
      props.knowledgeElements.map( (value, index) => { return false } ) 
        : 
      []
    )
    const [dispositions, setDispositions] = useState( 
      (props.dispositions) ? 
      props.dispositions.map( (value, index) => { return false } ) 
        : 
      []
    )
      
    const useStyles = makeStyles((theme) => ({
      margin: {
        margin: theme.spacing(1),
      }
    }));

    const config = [
      {
        type:"textInput", 
        title: "Ingrese la descripción de la competencia",
        placeHolder: "",
        rows: 11, 
        state: description,
        method: setDescription
      },
      {
        type:"multiSelect",
        title: "Ingrese sus elementos de conocimiento",
        placeHolder: "Seleccione los elementos a incluir",
        options: props.knowledgeElements , 
        state: knwolageElements,
        method: setKnwolageElements
      },
      {  
        type:"multiSelect",
        title: "Ingrese las disposiciones",
        placeHolder: "Seleccione los elementos a incluir",
        options: props.dispositions,
        state: dispositions,
        method: setDispositions
      },
    ]

    const classes = useStyles();

    return (
      <div className={styles.wrapper}>
          <p className={styles.title}>Creación de competencias</p>
          <ComboBox
              value = {selectedAccount}
              options = {props.accounts}
              method = {(value) => setSelectedAccount(value)}
              title = {"Seleccione una billetera"}
            /> 
          <div style={{display:'flex', justifyContent: 'space-between'}}>
            <TextInput
                placeHolder = {"Ingrese el nombre"}
                value = {name}
                updateMethod = {(newValue) => setName(newValue)}
                rows = {1}
              /> 
            <Button 
              className={classes.margin}
              size="medium" 
              variant="outlined" 
              color="secondary"
              onClick={
                () => {
                  //console.log(knwolageElements.keys((key) => console.log(key)))
                  console.log()
                  console.log(Object.entries(dispositions).filter(entry => entry[1]).map((value) => {return Number(value[0]) + 1}))
                  console.log(name)
                  console.log(description)

                  if (knwolageElements.length !== 0 
                    //&& selectedAccount.length !== 0 
                    && dispositions.length !== 0 
                    && name.length !== 0
                    && description.length !== 0
                  ){
                    const knowledgeValues = Object.entries(knwolageElements).filter(
                      entry => entry[1]
                    ).map(
                      (value) => {return Number(value[0]) + 1}
                    )
                    const dispositionValues = Object.entries(dispositions).filter(
                      entry => entry[1]
                    ).map(
                      (value) => {return Number(value[0]) + 1}
                    )
                    props.createCompetency(
                      selectedAccount,
                      {
                        "name": name,
                        "statement": description,
                        "knowledgeElements": knowledgeValues,
                        "dispositions": dispositionValues
                      }
                    )
                  } else {
                    alert("Fill all fields")
                  }
                }
              }>
              Crear
            </Button>
          </div>
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
            ))     
          }
          </div>
        </div>
    );
}

export default CompetencyCreator;
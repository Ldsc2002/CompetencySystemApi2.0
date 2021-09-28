import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import styles from './competencyCreator.module.css';
import Container from '../Container';
import ComboBox from '../ComboBox';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const CompetencyCreator = (props) => {

    const [selectedAccount, setSelectedAccount] = useState("")
    const [description, setDescription] = useState("")
    const [knwolageElements, setKnwolageElements] = useState(new Array(3).fill(false))
    const [dispositions, setDispositions] = useState(new Array(3).fill(false))
    
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
        options: [
          {
            name: "Op1",
            anotation: ""
          },
          {
            name: "Op2",
            anotation: ""
          },
          {
            name: "Op3",
            anotation: ""
          }
        ],
        state: knwolageElements,
        method: setKnwolageElements
      },
      {  
        type:"multiSelect",
        title: "Ingrese las disposiciones",
        placeHolder: "Seleccione los elementos a incluir",
        options: [
          {
            name: "Op1",
            anotation: ""
          },
          {
            name: "Op2",
            anotation: ""
          },
          {
            name: "Op3",
            anotation: ""
          }
        ],
        state: dispositions,
        method: setDispositions
      },
    ]

    const classes = useStyles();
    
    return (
      <div className={styles.wrapper}>
          <text className={styles.title}>Creación de competencias</text>
          <div style={{display:'flex', justifyContent: 'space-between'}}>
            <ComboBox
              value = {selectedAccount}
              options = {props.accounts}
              method = {(value) => setSelectedAccount(value)}
              title = {"Seleccione una billetera"}
            /> 
            <Button 
              className={classes.margin}
              size="medium" 
              variant="outlined" 
              color="secondary">
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
            ))}     
          </div>
        </div>
    );
}

export default CompetencyCreator;
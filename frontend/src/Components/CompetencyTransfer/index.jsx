import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import styles from './competencyTransfer.module.css';
import Container from '../Container';
import ComboBox from '../ComboBox';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const CompetencyTransfer = (props) => {

    const [selectedAccount, setSelectedAccount] = useState("")
    const [description, setDescription] = useState("")
 
    const useStyles = makeStyles((theme) => ({
      margin: {
        margin: theme.spacing(1),
      }
    }));

    const config = [
      {
        type:"transferBlock", 
        state: description,
        method: setDescription
      },
    ]

    const classes = useStyles();
    
    return (
      <div className={styles.wrapper}>
          <text className={styles.title}>Conceder competencias</text>
          <div style={{display:'flex', justifyContent: 'space-between'}}>
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

export default CompetencyTransfer;
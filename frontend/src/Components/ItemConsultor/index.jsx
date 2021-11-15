import React, {useState} from 'react';
import styles from './itemConsultor.module.css';
import Button from '@material-ui/core/Button';
import ComboBox from '../ComboBox';
import Switch from '@material-ui/core/Switch';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import AlertButton from '../AlertButton';

const ItemConsultor = (props) => {
    const [selectedItem, setSelectedItem] = useState("")
    
    const [state, setState] = React.useState(true);
  
    const handleChange = () => {
      setSelectedItem("");
      setState(!state);
    };

    const dispositions = props.dispositions ? props.dispositions : [];
    const knowledgeElements = props.knowledgeElements ? props.knowledgeElements : [];
    
    const helpMethod = async () => {
      return {
        "title":"",
        "text":""
      }
    }

    const method = async () => {
      if (selectedItem != "" ){
        const array = state ? dispositions : knowledgeElements;
        const obj = array.find( ({ name }) => name === selectedItem )
        const result = state ? await props.dispositionsMethod(obj.id) : await props.knowledgeElementsMethod(obj.id)
        return {"title": result.name, "text": result.meaning }
      } else {
        return {"title": "Error", "text": "Seleccione un campo"}
      }
    }

    return (      
      <div className={styles.wrapper}>
        <div style={{display:"flex", justifyContent: "space-between", width: '100%'}}>
        <p className={styles.title}>Consulta de disposiciones y elementos de conocimiento</p>
        <AlertButton
          text={"?"}
          method={(value) => helpMethod(value)}
        />
        </div>
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
          { 
          <ComboBox
              value = {selectedItem}
              options = { (state ) ? 
                dispositions.map((disposition) => {return disposition.name } ) : 
                knowledgeElements.map((knowledgeElement) => {return knowledgeElement.name } )
              }
              method = {(value) => setSelectedItem(value)}
              title = {state ? "Seleccione la disposición": "Seleccione el elemento de conocimiento" }
          />} 
          <br/>
          <br/>
          <AlertButton
            text={"Consultar"}
            method={(value) => method(value)}
          />
          </div>
      </div>
    );
}

export default ItemConsultor;
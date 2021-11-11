import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
/*
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
*/

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  formControl: {
    margin: theme.spacing(3)
  }
}));

const MultiComboBox = (props) => {
    const classes = useStyles();
    const handleChange = (event) => {
      props.updateMethod({ ...props.value, [event.target.name]: event.target.checked, });
    };
    
    return (
      <>
      <div className={classes.root}>
        
      <FormControl component="fieldset" className={classes.formControl}>
        <FormLabel component="legend">{props.placeHolder}</FormLabel>
        <br/>
        <FormGroup>
          <div style = {{height: props.width ? props.width : 160, overflowY:'scroll'}}>
          { ( props.options ) && 
            props.options.map((option, index) => (          
              <FormControlLabel
                key = {index}
                control={
                  <Checkbox checked={props.value[index]} onChange={handleChange} name={index} />
                }
                label={option.name}
              />
            ))
          }
          </div>
        </FormGroup>
      </FormControl>
    </div>
    </>
  );
}

export default MultiComboBox;
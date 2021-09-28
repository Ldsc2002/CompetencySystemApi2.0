import React from 'react';
import { makeStyles } from "@material-ui/core/styles";

import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles({
  root: {
    minWidth: 275
  },
  title: {
    fontSize: 14
  },
  content: {
    //size: '100%'
  }
});


const TextInput = (props) => {
    const classes = useStyles();
    //const [value, setValue] = React.useState("");
  
    const handleChange = (event) => {
      props.updateMethod(event.target.value);
    };
  
    return (
          <TextField
            className={classes.content} 
            label={props.placeHolder}
            multiline
            rows={props.rows}
            value={props.value}
            onChange={handleChange}
          />
    );
}

export default TextInput;
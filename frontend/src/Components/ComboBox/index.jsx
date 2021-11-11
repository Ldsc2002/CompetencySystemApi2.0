import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
//import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
  
const ComboBox = (props) => {

const handleChange = (event) => {
    props.method(event.target.value);
};

const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 200,
    },
    select: {
        width: props.width ? props.width : 350,
        '&::placeholder': {
            textOverflow: 'ellipsis !important',
        }
    }

  }));

const classes = useStyles();
return(<>
    <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-label">{props.title}</InputLabel>
        <Select
            labelId="demo-simple-select-label"
            className={classes.select}
            //id="demo-simple-select"
            autoWidth={false}
            value={props.value}
            onChange={handleChange}
            InputLabelProps={{
                style: {
                  textOverflow: 'ellipsis',
                } }}
            >
            { props.options &&
                props.options.map(
                    (option) => (<MenuItem key={option} value={option}>{option}</MenuItem>)
                )
            }
            
        </Select>
    </FormControl>
</>)
}


export default ComboBox;
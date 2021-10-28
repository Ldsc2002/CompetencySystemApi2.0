import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import TextInput from '../TextInput';
import MultiComboBox from '../MultiComboBox';
import TransferBlock from '../TransferBlock';
import SelecListElement from '../SelectListElement';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    margin: '1px',
  },
  title: {
    fontSize: 14
  },
  content: {
    //size: '100%'
  }
});

const Container = (props) => {
    const classes = useStyles();
    //console.log(props);
    return (
      <Card className={classes.root} variant="outlined">
        <CardContent>
          <Typography
            className={classes.title}
            color="textSecondary"
            gutterBottom
          >
            {props.title}
          </Typography>
          { props.type === "textInput" &&
            <TextInput
              placeHolder = {props.placeHolder}
              value = {props.value}
              updateMethod = {(newValue) => props.updateMethod(newValue)}
              rows = {props.rows}
            /> 
          }
          { props.type === "multiSelect" &&
            <MultiComboBox
              placeHolder = {props.placeHolder}
              options = {props.options}
              value = {props.value}
              updateMethod = {(newValue) => props.updateMethod(newValue)}
            /> 
          }
          { props.type === "transferBlock" &&
            <TransferBlock
              accounts = {props.options}
              options = {props.extraOptions}
              value = {props.value}
              updateMethod = {(newValue) => props.updateMethod(newValue)}
            /> 
          }
          { props.type === "selectListElement" &&
            <SelecListElement
              skills = {props.extraOptions}
              options = {props.options}
              value = {props.value}
              updateMethod = {(newValue) => props.updateMethod(newValue)}
            /> 
          }
        </CardContent>
      </Card>
    );
}

export default Container;
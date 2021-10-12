import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Title from "./Title";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";
import EmojiObjectsIcon from "@material-ui/icons/EmojiObjects";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  depositContext: {
    flex: 1,
  },
  logoColor: {
    color: theme.palette.getContrastText(theme.palette.primary.main),
    backgroundColor: theme.palette.primary.main,
  },
}));

export default function Dispositions() {
  const classes = useStyles();

  // Hacer un map de las CardHeader para las disposiciones
  return (
    <React.Fragment>
      <Title>Habilidades para desempeñar la competencia</Title>
      <CardActionArea>
        <CardHeader
          avatar={
            <Avatar aria-label="recipe" className={classes.logoColor}>
              <EmojiObjectsIcon />
            </Avatar>
          }
          title={
            <Typography variant="body1" component="p">
              Adaptable
            </Typography>
          }
        />
      </CardActionArea>
      <CardActionArea>
        <CardHeader
          avatar={
            <Avatar aria-label="recipe" className={classes.logoColor}>
              <EmojiObjectsIcon />
            </Avatar>
          }
          title={
            <Typography variant="body1" component="p">
              Colaborativo
            </Typography>
          }
        />
      </CardActionArea>
      <CardActionArea>
        <CardHeader
          avatar={
            <Avatar aria-label="recipe" className={classes.logoColor}>
              <EmojiObjectsIcon />
            </Avatar>
          }
          title={
            <Typography variant="body1" component="p">
              Profesional
            </Typography>
          }
        />
      </CardActionArea>
    </React.Fragment>
  );
}

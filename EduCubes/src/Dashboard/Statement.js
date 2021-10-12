import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Title from "./Title";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";
import EmojiObjectsIcon from "@material-ui/icons/EmojiObjects";
import CardContent from "@material-ui/core/CardContent";
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

export default function Statement() {
  const classes = useStyles();
  let version = "4.0";
  let otorgada = "Universidad del Valle de Guatemala";

  return (
    <React.Fragment>
      <Title>Competencia Random</Title>
      <Typography variant="body2" component="p">
        Otorgada por: {otorgada}
      </Typography>
      <Typography variant="body2" component="p">
        Version: {version}
      </Typography>
      <CardActionArea>
        <CardHeader
          avatar={
            <Avatar aria-label="recipe" className={classes.logoColor}>
              <EmojiObjectsIcon />
            </Avatar>
          }
          title={
            <Typography variant="body1" component="p">
              Descripcion
            </Typography>
          }
        />
        <CardContent>
          <Typography variant="body2" component="p">
            This CardContent is wrapped in a CardActionsArea, so this text and
            the above header are wrapped in a ButtonBase, which means they
            behave like a Button.
          </Typography>
        </CardContent>
      </CardActionArea>
    </React.Fragment>
  );
}

import React, { useRef, useState } from "react";
import AccountCircle from '@material-ui/icons/AccountCircle';
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from '@material-ui/core/InputAdornment';
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Link as RouterLink } from "react-router-dom";
import TextField from "@material-ui/core/TextField";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © UVG "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 4),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  card: {
    display: "flex",
    flexDirection: "column",
  },
  cardMedia: {
    paddingTop: "56.25%", // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));

export function Home({ id }) {
  const classes = useStyles();
  const valueRef = useRef('');
  const [texto, setTexto] = useState();

  const handleChange = () => {
    setTexto(valueRef.current.value);
  }

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  if(!id) {
    return (
      <React.Fragment>
        <main>
          {/* Hero unit */}
          <div className={classes.heroContent}>
            <Container maxWidth="sm">
              <Typography
                component="h1"
                variant="h2"
                align="center"
                color="textPrimary"
                gutterBottom
              >
                Edu-Cubes
                <div justify-content="center" display="flex">
                    <img alt='logo' width="50%" src="/img/cubes.jpg" />
                </div>
              </Typography>
              <Typography
                variant="h5"
                align="center"
                color="textSecondary"
                paragraph
              >
                Inicia sesión a través de Metamask
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                >
                  <Avatar src="/img/metamask2.png" />
                </IconButton>o puedes buscar algún perfil a través de su código de cartera.
              </Typography>
              <div className={classes.heroButtons}>
                <Grid container spacing={2} justifyContent="center">
                  <Grid item xs={10}>
                    <TextField
                      fullWidth
                      id="codigo-cartera"
                      label="Código"
                      variant="outlined"
                      inputRef={valueRef}
                      onChange={handleChange}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <AccountCircle />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>                
                </Grid>
                <Grid container spacing={2} justifyContent="center">               
                  <Grid item>
                    <Button
                      component={RouterLink}
                      to={"/perfil?id="+texto}
                      variant="contained"
                      color="primary"
                      onClick={scrollToTop}
                    >
                      Buscar
                    </Button>
                  </Grid>
                </Grid>
              </div>
            </Container>
          </div>
        </main>
        {/* Footer */}
        <footer>
        <Container className={classes.cardGrid} maxWidth="md">
            <Typography variant="h6" align="center" gutterBottom>
              Basado en el estándar CC2020 
            </Typography>
            <Typography
              variant="subtitle1"
              align="center"
              color="textSecondary"
              component="p"
            >
              Universidad del Valle de Guatemala
            </Typography>
            <Copyright />
          </Container>
        </footer>
        {/* End footer */}
      </React.Fragment>
    );
  }
  return (
    <React.Fragment>
      <main>
        {/* Hero unit */}
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="textPrimary"
              gutterBottom
            >
              Edu-Cubes
              <div justify-content="center" display="flex">
                  <img alt='logo' width="50%" src="/img/cubes.jpg" />
              </div>
              <Button
                component={RouterLink}
                to={"/perfil?id="+id} 
                variant="contained"
                color="primary"
                onClick={scrollToTop}
              >
                Ver mi perfil
              </Button>
            </Typography>
            <Typography
              variant="h5"
              align="center"
              color="textSecondary"
              paragraph
            >
              Puedes buscar algún perfil a través de su código de cartera.
            </Typography>
            <div className={classes.heroButtons}>
              <Grid container spacing={2} justifyContent="center">
                <Grid item xs={10}>
                  <TextField
                    fullWidth
                    id="codigo-cartera"
                    label="Código"
                    variant="outlined"
                    inputRef={valueRef}
                    onChange={handleChange}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <AccountCircle />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>                
              </Grid>
              <Grid container spacing={2} justifyContent="center">               
                <Grid item>
                  <Button
                    component={RouterLink}
                    to={"/perfil?id="+texto}
                    variant="contained"
                    color="primary"
                    onClick={scrollToTop}
                  >
                    Buscar
                  </Button>
                </Grid>
              </Grid>
            </div>
          </Container>
        </div>
      </main>
      {/* Footer */}
      <footer>
      <Container className={classes.cardGrid} maxWidth="md">
          <Typography variant="h6" align="center" gutterBottom>
            Basado en el estándar CC2020 
          </Typography>
          <Typography
            variant="subtitle1"
            align="center"
            color="textSecondary"
            component="p"
          >
            Universidad del Valle de Guatemala
          </Typography>
          <Copyright />
        </Container>
      </footer>
      {/* End footer */}
    </React.Fragment>
  );
}

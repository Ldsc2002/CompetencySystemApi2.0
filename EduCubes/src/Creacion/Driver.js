import React from "react";
import { useParams } from "react-router-dom";
import Content from "../Dashboard/Content";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";
import AccountCircle from '@material-ui/icons/AccountCircle';
import Avatar from "@material-ui/core/Avatar";
import CompetenciesTable from "../Dashboard/CompetenciesTable";
import Dispositions from "../Dashboard/Dispositions";
import KnowledgeElementsTable from "../Dashboard/KnowledgeElementsTable";
import HomeIcon from "@material-ui/icons/Home";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Statement from "../Dashboard/Statement";
import { Link as RouterLink } from "react-router-dom";
import UpdateElementKnowledge from "../Dashboard/UpdateElementKnowledge";
import AddDisposition from "../Dashboard/AddDisposition";;

const useStyles = makeStyles((theme) => ({
  headerContainer: {
    position: "relative",
    height: "100px",
  },
  header: {
    display: "flex",
    position: "absolute",
    width: "calc(100%)",
    top: "-70px",
    alignItems: "flex-end",
    "& > *": {
      margin: `${theme.spacing(3)}px ${theme.spacing(1)}px`,
    },
  },
  spacer: {
    flexGrow: "1",
  },
  avatar: {
    border: `3px solid white`,
    width: theme.spacing(13),
    height: theme.spacing(13),
    boxShadow: theme.shadows[3],
  },
  actionGroup: {
    display: "flex",
    width: "330px",
    justifyContent: "flex-end",
    marginRight: 0,
  },
  fixedHeight: {
    height: 300,
  },
  summaryCards: {
    display: "flex",
    flexWrap: "wrap",
  },
  summaryCard: {
    margin: theme.spacing(1),
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  tripCard: {
    margin: theme.spacing(1),
    padding: theme.spacing(2),
  },
}));

export function SummaryCard({ title, value, component }) {
  const classes = useStyles();
  return (
    <Paper elevation={2} className={classes.summaryCard}>
      <Typography color={"textSecondary"} variant="h5" gutterBottom>
        {title}
      </Typography>
      {component || (
        <Typography color={"primary"} variant="h3">
          {value}
        </Typography>
      )}
    </Paper>
  );
}

export default function Driver({ id }) {
  const { driverId } = useParams();
  const classes = useStyles();
  const loading = false;

  // Se obtiene el identificador id de la URL
  const search = window.location.search;
  const params = new URLSearchParams(search);

  // Identificador de busqueda de perfil
  const identifier = params.get('id');

  // Identificador de busqueda de competencia
  const competency = params.get('comp');
  console.log(identifier);
  console.log(competency);

  // Aqui hay que cargar la informacion de web 3
  // Obtener la informacion del perfil
  // Obtener la informacion sobre las competencias
  // Obtener los permisos que tiene el usuario actual (o si solo es visitante)
  let driver = { name: "David Soto", id: id, img: "/img/profilePlaceholder.png" };
  let updateAuthorization = true;

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  if (loading) {
    return (
      <Content>
        <CircularProgress />
      </Content>
    );
  }

  // Determinar si se visualizara el perfil o alguna competencia en especifico
  if (competency) {
    // Obtener la informacion de la competencia

    // Determinar si el usuario logueado tiene permiso para actualizar una competencia
    if (updateAuthorization) {
      return (
        <Content>
          <div
            style={{
              height: "200px",
              backgroundPosition: "center",
              backgroundSize: "cover",
              filter: "contrast(75%)",
              backgroundImage: "url(/img/wallpaper2.jpg)",
            }}
          />
          <div className={classes.headerContainer}>
            <div className={classes.header}>
              <Avatar
                alt={driver.name}
                src={driver.img}
                classes={{ root: classes.avatar, circle: classes.circle }}
              />
              <Typography variant={"h4"}>{driver.name}</Typography>
              <div className={classes.spacer} />
              <div className={classes.actionGroup}>
                <Button
                  color="primary"
                  variant="contained"
                  to={"/perfil?id="+identifier}
                  component={RouterLink}
                  startIcon={<AccountCircle />}
                  onClick={scrollToTop}
                >
                  Perfil
                </Button>
                <div className={classes.spacer} />
                <Button
                  color="primary"
                  variant="contained"
                  to={"/"}
                  component={RouterLink}
                  startIcon={<HomeIcon />}
                  onClick={scrollToTop}
                >
                  Inicio
                </Button>
              </div>
            </div>
          </div>
          <SummaryCard title={"Titulo de competencia"} component={<Statement />} />
          <SummaryCard title={"Elementos de conocimiento"} component={<KnowledgeElementsTable />} />
          <SummaryCard title={"Actualizar elemento de conocimiento"} component={<UpdateElementKnowledge />} />
          <SummaryCard title={"Disposiciones"} component={<Dispositions />} />
          <SummaryCard title={"Agregar disposición"} component={<AddDisposition />} />
        </Content>
      );        
    }
    // Si no tiene permiso hacer return de la pantalla de competencia normal
    return (
      <Content>
        <div
          style={{
            height: "200px",
            backgroundPosition: "center",
            backgroundSize: "cover",
            filter: "contrast(75%)",
            backgroundImage: "url(/img/wallpaper2.jpg)",
          }}
        />
        <div className={classes.headerContainer}>
          <div className={classes.header}>
            <Avatar
              alt={driver.name}
              src={driver.img}
              classes={{ root: classes.avatar, circle: classes.circle }}
            />
            <Typography variant={"h4"}>{driver.name}</Typography>
            <div className={classes.spacer} />
            <div className={classes.actionGroup}>
              <Button
                color="primary"
                variant="contained"
                to={"/perfil?id="+identifier}
                component={RouterLink}
                startIcon={<AccountCircle />}
                onClick={scrollToTop}
              >
                Perfil
              </Button>
              <div className={classes.spacer} />
              <Button
                color="primary"
                variant="contained"
                to={"/"}
                component={RouterLink}
                startIcon={<HomeIcon />}
                onClick={scrollToTop}
              >
                Inicio
              </Button>
            </div>
          </div>
        </div>
        <SummaryCard title={"Titulo de competencia"} component={<Statement />} />
        <SummaryCard title={"Elementos de conocimiento"} component={<KnowledgeElementsTable />} />
        <SummaryCard title={"Disposiciones"} component={<Dispositions />} />
      </Content>
    );  
  } else {
    const competencies = 5;
    const knowledge = 21;
    return (
      <Content>
        <div
          style={{
            height: "200px",
            backgroundPosition: "center",
            backgroundSize: "cover",
            filter: "contrast(75%)",
            backgroundImage: "url(/img/wallpaper2.jpg)",
          }}
        />
        <div className={classes.headerContainer}>
          <div className={classes.header}>
            <Avatar
              alt={driver.name}
              src={driver.img}
              classes={{ root: classes.avatar, circle: classes.circle }}
            />
            <Typography variant={"h4"}>{driver.name}</Typography>
            <div className={classes.spacer} />
            <div className={classes.actionGroup}>
              <Button
                color="primary"
                variant="contained"
                to={"/"}
                component={RouterLink}
                startIcon={<HomeIcon />}
                onClick={scrollToTop}
              >
                Inicio
              </Button>
            </div>
          </div>
        </div>
        <div className={classes.summaryCards}>
          <SummaryCard title={"Cantidad de competencias"} value={competencies} />
          <SummaryCard title={"Elementos de conocimiento"} value={knowledge} />
        </div>
        <SummaryCard title={"Competencias obtenidas"} component={<CompetenciesTable />} />
      </Content>
    );
  }
}

import React from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Link as RouterLink, useLocation } from "react-router-dom";
import Icon from "@material-ui/core/Icon";
import Avatar from "@material-ui/core/Avatar";
import PalettePicker from "../Theme/PalettePicker";
export const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  logo: {
    color: "white",
    textDecoration: "none",
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up("sm")]: {
      width: '100%',
      marginLeft: 0,
      backgroundColor: `#${theme.palette.primary[300].substring(1)}77`,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  active: {
    backgroundColor: theme.palette.action.selected,
  },
}));

function ResponsiveDrawer(props) {
  const { container, setCurrentTheme, currentTheme, id } = props;
  const classes = useStyles();
  const theme = useTheme();
  const { pathname } = useLocation();
  const isHome = false; // pathname === "/";
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  /* Modifying the source code from the template example to use the react router pathname hook to set
  selected prop and to use the react router component prop */
  let drawer = (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <List>
        {[
          { text: "inicio", icon: "home" },
          { text: "componentes", icon: "apps" },
          { text: "configuraciones", icon: "settings" },
        ].map(({ text, icon }, index) => (
          <ListItem
            component={RouterLink}
            selected={pathname === `/${text}`}
            to={`/${text}`}
            button
            key={text}
          >
            <ListItemIcon>
              <Icon>{icon}</Icon>
            </ListItemIcon>
            <ListItemText primary={text.toUpperCase()} />
          </ListItem>
        ))}
      </List>
      <Divider />
    </div>
  );

  // Si estamos logueados con Metamask entonces mostrar el elemento de menu Perfil
  if(id) {
    drawer = (
      <div>
        <div className={classes.toolbar} />
        <Divider />
        <List>
          {[
            { text: "inicio", icon: "home" },
            { text: "perfil", icon: "person" },
            { text: "crear", icon: "add" },
            { text: "gestiones", icon: "assignment" },
            // { text: "componentes", icon: "apps" },
            // { text: "configuraciones", icon: "settings" },
          ].map(({ text, icon }, index) => (
            text === "perfil" ? 
            <ListItem
              component={RouterLink}
              selected={pathname === `/${text}`}
              to={`/${text}?id=${id}`}
              button
              key={text}
            >
              <ListItemIcon>
                <Icon>{icon}</Icon>
              </ListItemIcon>
              <ListItemText primary={text.toUpperCase()} />
            </ListItem>
            : <ListItem
              component={RouterLink}
              selected={pathname === `/${text}`}
              to={`/${text}`}
              button
              key={text}
            >
              <ListItemIcon>
                <Icon>{icon}</Icon>
              </ListItemIcon>
              <ListItemText primary={text.toUpperCase()} />
            </ListItem>
          ))}
        </List>
        <Divider />
      </div>
    );    
  } else {

  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <div
        style={{
          height: "64px",
          backgroundPosition: "center",
          backgroundSize: "cover",
          filter: "contrast(75%)",
          backgroundImage: "url(/img/wallpaper2.jpg)",
          position: "absolute",
          top: "0px",
          width: "100%",
          zIndex: -2,
        }}
      />
      <AppBar position="sticky" className={isHome ? "" : classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            to={"/"}
            component={RouterLink}
            className={classes.logo}
          >
            Edu-Cubes
          </Typography>
          <div style={{ flexGrow: 1 }}></div>
          <PalettePicker
            setCurrentTheme={setCurrentTheme}
            currentTheme={currentTheme}
          />
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="end"
            onClick={handleDrawerToggle}
          >
            <Avatar src="/img/cubes.jpg" />
          </IconButton>
        </Toolbar>
      </AppBar>
      {isHome && !mobileOpen ? (
        <div />
      ) : (
        <nav aria-label="mailbox folders">
          {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
          <Hidden smUp implementation="css">
            <Drawer
              container={container}
              variant="temporary"
              anchor={theme.direction === "rtl" ? "right" : "left"}
              open={mobileOpen}
              onClose={handleDrawerToggle}
              classes={{
                paper: classes.drawerPaper,
              }}
              ModalProps={{
                keepMounted: true, // Better open performance on mobile.
              }}
            >
              {drawer}
            </Drawer>
          </Hidden>
        </nav>
      )}
    </div>
  );
}

ResponsiveDrawer.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  container: PropTypes.instanceOf(
    typeof Element === "undefined" ? Object : Element
  ),
};

export default ResponsiveDrawer;

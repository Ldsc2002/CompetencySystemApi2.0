import React, {useState, useEffect} from "react";
import AppBarAndDrawer from "./AppBarAndDrawer/AppBarAndDrawer";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Home } from "./Home/Home";
import { ThemeProvider } from "@material-ui/core/styles";
import { useTheme } from "./theme";
import { DataProvider } from "./Providers/DataProvider";
import Creacion from "./Creacion/Creacion";
import Gestiones from "./Gestiones/Gestiones";
import Driver from "./Creacion/Driver";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { configureStore } from "@reduxjs/toolkit";
import peopleReducer from "./ReduxTable/peopleSlice";
import { Provider } from "react-redux";

// import Components from "./Components/Components";
// import Settings from "./Settings/Settings";

export default function App() {
  const ethereum = window.ethereum;

  const [ addr, setAddr ] = useState('');
  
  useEffect(() => {
    async function onInit() {
      if (!window.ethereum) {
        setAddr(null)
      } else {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const account = accounts[0];
        setAddr(account)
      }
  }
  onInit();
  }, []);

  if(ethereum) {
    ethereum.on('accountsChanged', function (accounts) {
      setAddr(accounts[0]);
    });
  }

  const store = configureStore({
    reducer: {
      people: peopleReducer,
    },
  });
  const [currentTheme, setCurrentTheme] = useTheme();
  return (
    <>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <ThemeProvider theme={currentTheme}>
          <Provider store={store}>
            <DataProvider>
              <Router>
                <div>
                  <AppBarAndDrawer
                    currentTheme={currentTheme}
                    setCurrentTheme={setCurrentTheme}
                    id={addr}
                  />
                  {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
                  <Switch>
                    <Route path="/perfil">
                      <Driver id={addr} />
                    </Route>
                    <Route exact path="/crear">
                      <Creacion />
                    </Route>
                    <Route path="/gestiones">
                      <Gestiones />
                    </Route>
                    {/* <Route path={`/people/:driverId`}>
                      <Driver />
                    </Route>
                    <Route path="/componentes">
                      <Components />
                    </Route>
                    <Route path="/configuraciones">
                      <Settings
                        currentTheme={currentTheme}
                        setCurrentTheme={setCurrentTheme}
                      />
                    </Route> */}
                    <Route path="/">
                      <Home id={addr}/>
                    </Route>
                  </Switch>
                </div>
              </Router>
            </DataProvider>
          </Provider>
        </ThemeProvider>
      </MuiPickersUtilsProvider>
    </>
  );
  
}

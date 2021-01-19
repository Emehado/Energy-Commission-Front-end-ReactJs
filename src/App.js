import React from 'react';
import {Route, Switch, Redirect} from "react-router-dom"
import {LoaderContextProvider} from "./context/DrawerContext";
import './App.css';
import Home from "./pages/Home";
import Register from "./components/Register";
import License from "./components/License";
import NotFound from "./components/NotFound";
import registers from "./config/registers.js";
import Renew from "./pages/Renew";

const App = () => {
    return (
        <div className="App">
            <LoaderContextProvider>
                <Switch>
                    <Route path={"/license/:id"} component={License}/>
                    <Route path={"/register"} exact component={Register}/>
                    {registers[0].licenseTypes.map((licenseType) => <Route key={licenseType.name}
                                                                                    path={`/register/renewable/${licenseType.name}`}
                                                                                    exact component={Register}/>)}
                    {registers[1].licenseTypes.map((licenseType) => <Route key={licenseType.name}
                                                                                    path={`/register/electricity/${licenseType.name}`}
                                                                                    exact component={Register}/>)}
                    {registers[2].licenseTypes.map((licenseType) => <Route key={licenseType.name}
                                                                                    path={`/register/naturalGas/${licenseType.name}`}
                                                                                    exact component={Register}/>)}
                    <Route path={"/renew"} component={Renew}/>
                    <Route path={"/not-found"} component={NotFound}/>
                    <Route path={"/"} exact component={Home}/>
                    <Redirect to={"not-found"}/>
                </Switch>
            </LoaderContextProvider>
        </div>
    );
}

export default App;

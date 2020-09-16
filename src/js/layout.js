import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import injectContext from "./store/appContext";
import Home from './views/home'
import Login from './views/login';
import Planes from './views/planes';
import Footer from './components/footer';
import NavegacionAdm from './components/navegacionAdm';
import DashboardAdm from './views/dashboardAdm'
import ListadoEdificioAdm from './views/listadoEdificioAdm'

const Layout = () => {
    return (
        <>
            <BrowserRouter>
                <Switch>
                <Route exact path='/listadoEdificioAdm' component={ListadoEdificioAdm} />
                    <Route exact path='/dashboardAdm' component={DashboardAdm} />
                    <Route exact path='/navegacionAdm' component={NavegacionAdm} />
                    <Route exact path='/login' component={Login} />
                    <Route exact path='/' component={Home} />
                    <Route exact path='/planes' component={Planes} />
                    <Route render={() => <h1 className="notfound">Not found!</h1>} />
                </Switch>
                <Footer />
            </BrowserRouter>
        </>
    )
};

export default injectContext(Layout);
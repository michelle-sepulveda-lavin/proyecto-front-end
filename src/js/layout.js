import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import injectContext from "./store/appContext";
import Home from './views/home'
import Login from './views/login';
import Planes from './views/planes';
import Footer from './components/footer';
<<<<<<< HEAD
import NavegacionAdm from './components/navegacionAdm';
import DashboardAdm from './views/dashboardAdm'
import ListadoEdificioAdm from './views/listadoEdificioAdm'
=======
import ModifyPlans from './views/planes-SA';
import MenuNavegacion from './views/superAdmin/menuNavegacion';
import CrearEdificios from './views/crearEdificios';
>>>>>>> ac3e34aeb7a53eac13e98aed2c373ac20f43350a

const Layout = () => {
    return (
        <>
            <BrowserRouter>
                <Switch>
<<<<<<< HEAD
                <Route exact path='/listadoEdificioAdm' component={ListadoEdificioAdm} />
                    <Route exact path='/dashboardAdm' component={DashboardAdm} />
                    <Route exact path='/navegacionAdm' component={NavegacionAdm} />
=======
                    <Route exact path='/crearedificio' component={CrearEdificios} />
>>>>>>> ac3e34aeb7a53eac13e98aed2c373ac20f43350a
                    <Route exact path='/login' component={Login} />
                    <Route exact path='/' component={Home} />
                    <Route exact path='/planes' component={Planes} />
                    <Route exact path='/superAdmin/planes' component={ModifyPlans} />
                    <Route render={() => <h1 className="notfound">Not found!</h1>} />
                </Switch>
                <Footer />
            </BrowserRouter>
        </>
    )
};

export default injectContext(Layout);
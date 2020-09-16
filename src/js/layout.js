import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import injectContext from "./store/appContext";
import Home from './views/home'
import Login from './views/login';
import Planes from './views/planes';
import Footer from './components/footer';
import ModifyPlans from './views/planes-SA';
import MenuNavegacion from './views/superAdmin/menuNavegacion';
import CrearEdificios from './views/crearEdificios';

const Layout = () => {
    return (
        <>
            <BrowserRouter>
                <Switch>
                    <Route exact path='/crearedificio' component={CrearEdificios} />
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
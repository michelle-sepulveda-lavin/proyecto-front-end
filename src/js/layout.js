import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import injectContext from "./store/appContext";
import Home from './views/home'
import Login from './views/login';
import Planes from './views/planes';
import Footer from './components/footer';
import ListadoEdificioAdm from './views/superAdmin/listadoEdificioAdm'
import ModifyPlans from './views/planes-SA';
import CrearEdificios from './views/superAdmin/crearEdificios';
import SidebarPage from './components/SidebarPage';
import Dashboard from './views/dashboard';
import Contactos from './views/superAdmin/contactos';
import Conserjes from './views/admin/conserjes';
import DepartamentosAdmin from './views/admin/departamentosAdmin';
import BoletinesAdmin from './views/admin/boletinesAdmin';
import GastosAdmin from './views/admin/gastosAdmin';
import DepartamentosConserje from './views/conserjes/departamentosConserje';
import BoletinesConserje from './views/conserjes/boletinesConserje';
import PaqueteriaConserje from './views/conserjes/paqueteriaConserje';
import GastosConserje from './views/conserjes/gastosConserje';
import GastosUser from './views/user/gastosUser';
import RecuperacionContraseña from './views/recuperacionContraseña';


const Layout = () => {
    return (
        <>
            <BrowserRouter>
                <Switch>
                    <Route exact path='/usuario/gastos-comunes' component={GastosUser} />
                    <Route exact path='/conserje/gastos-comunes' component={GastosConserje} />
                    <Route exact path='/conserje/paqueteria' component={PaqueteriaConserje} />
                    <Route exact path='/conserje/boletines' component={BoletinesConserje} />
                    <Route exact path='/conserje/departamentos' component={DepartamentosConserje} />
                    <Route exact path='/admin/gastos-comunes' component={GastosAdmin} />
                    <Route exact path='/admin/boletines' component={BoletinesAdmin} />
                    <Route exact path='/admin/departamentos' component={DepartamentosAdmin} />
                    <Route exact path='/conserjes' component={Conserjes} />
                    <Route exact path='/contactos' component={Contactos} />
                    <Route exact path='/listado-edificios' component={ListadoEdificioAdm} />
                    <Route exact path='/dashboard' component={Dashboard} />
                    <Route exact path='/recuperacion-password/:token' component={RecuperacionContraseña} />
                    <Route exact path='/crearedificio' component={CrearEdificios} />
                    <Route exact path='/login' component={Login} />
                    <Route exact path='/' component={Home} />
                    <Route exact path='/planes' component={Planes} />
                    <Route exact path='/sidebar' component={SidebarPage} />
                    <Route exact path='/superAdmin/planes' component={ModifyPlans} />
                    <Route render={() => <h1 className="notfound">Not found!</h1>} />
                </Switch>
                <Footer />
            </BrowserRouter>
        </>
    )
};

export default injectContext(Layout);
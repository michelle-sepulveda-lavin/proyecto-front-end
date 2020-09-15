import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import injectContext from "./store/appContext";
import Home from './views/home';
import Footer from './views/footer';
import MenuNavegacion from './views/superAdmin/menuNavegacion'

const Layout = () => {
    return (
        <>
            <BrowserRouter>
                <Switch>
                    {/* <Route exact path='/' component={Login} />
                    <Route exact path='/' component={Planes} /> */}
                    <Route exact path='/' component={Home} />
                    <Route render={() => <h1 className="notfound">Not found!</h1>} />
                </Switch>
                <Footer />
            </BrowserRouter>
        </>
    )
};

export default injectContext(Layout);
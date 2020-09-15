import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import injectContext from "./store/appContext";
import Home from './views/home'
import Planes from './views/planes';

const Layout = () => {
    return (
        <>
            <BrowserRouter>
                <Switch>
                    <Route exact path='/' component={Home} />
                    <Route exact path='/planes' component={Planes} />
                </Switch>
            </BrowserRouter>
        </>
    )
};

export default injectContext(Layout);
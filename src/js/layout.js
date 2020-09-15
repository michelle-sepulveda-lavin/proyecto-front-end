import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import injectContext from "./store/appContext";
import Home from './views/home'
import Login from './views/login';

const Layout = () =>{
    return(
        <>
            <BrowserRouter>
                <Switch>
                    <Route exact path='/login' component={Login} />
                    <Route exact path='/' component={Home} />
                </Switch>
            </BrowserRouter>
        </>
    )
};

export default injectContext(Layout);
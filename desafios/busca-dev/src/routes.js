import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import User from './pages/User';

function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/user" exact component={User} />
            </Switch>
        </BrowserRouter>
    )
}

export default Routes;
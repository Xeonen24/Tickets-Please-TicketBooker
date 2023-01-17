import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from '../pages/Home';
import Catalog from '../pages/Catalog';
import Detail from '../pages/detail/Detail';
import Signup from '../pages/signup/signup';
import Login from '../pages/login/login';

const Routes = () => {
    return (
        <Switch>
            <Route
                path='/:category/search/:keyword'
                component={Catalog}
            />
            <Route
                path='/:category/:id'
                component={Detail}
            />
            <Route
                path='/:category'
                component={Catalog}
            />
            <Route
                path='/'
                exact
                component={Home}
            />
            <Route path="/signup" component={Signup} />
            <Route path="/login" component={Login} />
        </Switch>
    );
}

export default Routes;
import React from 'react'
import { BrowserRouter, Switch, Route} from 'react-router-dom'
import {AuthProvider} from './contexts/AuthContext'
import Landing from "./modules/pages/Landing"
import Main from "./modules/pages/Main"
import Login from "./modules/pages/Login"
import Signup from "./modules/pages/Signup"
import Account from "./modules/pages/Account"
import ForgotPassword from './modules/pages/ForgotPassword'

import './css/routes.css'
import PrivateRoute from './modules/component/PrivateRoute'

const Routes = () => {
    return (
        <BrowserRouter>
            <AuthProvider>
                <Switch>
                    <Route exact path='/' component={Landing} />
                    <Route exact path='/login' component={Login}/>
                    <Route exact path='/forgot-password' component={ForgotPassword}/>
                    <Route exact path='/signup' component={Signup}/>
                    <PrivateRoute exact path='/browse' component={Main} />
                    <Route exact path='/account'
                    component={Account} />
                </Switch>
            </AuthProvider>
        </BrowserRouter>
    )
}

export default Routes

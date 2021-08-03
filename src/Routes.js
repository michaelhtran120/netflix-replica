import React from 'react'
import { BrowserRouter, Switch, Route} from 'react-router-dom'
import {AuthProvider} from './contexts/AuthContext'
import Landing from "./modules/pages/Landing"
import Main from "./modules/pages/Main"
import Signin from "./modules/pages/Login"
import Signup from "./modules/pages/Signup"

import './css/routes.css'
import { auth } from './configs/firebase'

const Routes = () => {
    return (
        <BrowserRouter>
            <AuthProvider>
                <Switch>
                    <Route exact path='/' component={Landing} />
                    <Route exact path='/login' component={Signin}/>
                    <Route exact path='/signup' component={Signup}/>
                    <Route exact path='/browse' component={Main} />
                </Switch>
            </AuthProvider>
        </BrowserRouter>
    )
}

export default Routes

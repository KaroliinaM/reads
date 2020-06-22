import React from 'react'
import {Route, Redirect} from 'react-router-dom'

const PrivateRoute= ({component: Component, path, isAuth, ...rest}) => (
    <Route path={path} >
        {isAuth?
            <Component {...rest}/>:   
            <Redirect to='/login' />}
    </Route>
)

export default PrivateRoute
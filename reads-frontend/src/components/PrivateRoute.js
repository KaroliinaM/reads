import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'

const PrivateRoute = ({ component: Component, path, isAuth, ...rest }) => (
  <Route path={path} >
    {isAuth
      ? <Component {...rest}/>
      : <Redirect to='/login' />}
  </Route>
)

PrivateRoute.propTypes = {
  component: PropTypes.func.isRequired,
  path: PropTypes.string.isRequired,
  isAuth: PropTypes.bool.isRequired
}

export default PrivateRoute

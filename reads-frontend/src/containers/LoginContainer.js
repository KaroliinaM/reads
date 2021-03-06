import React, { useState } from 'react'
import { useHistory, Link } from 'react-router-dom'
import BookService from '../services/BookService'
import Input from '../components/Input'
import UserService from '../services/UserService'
import { handleError } from '../helpers/helpers'
import PropTypes from 'prop-types'

const LoginContainer = ({ setUser, notifyUser }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const history = useHistory()

  const handleLogin = (event) => {
    event.preventDefault()
    const user = {
      username,
      password
    }
    UserService.login(user)
      .then(data => {
        setUser(data)
        BookService.setToken(data.token)
        window.localStorage.setItem('loggedUser', JSON.stringify(data))
        const path = data.taste_tested ? '/' : '/rate'
        history.push(path)
      })
      .catch(error => {
        handleError(notifyUser, error)
      })
  }

  return (
    <div className='form-container'>
      <form className='form-element' onSubmit={handleLogin} >
        <Input id='login-username' label='username' type='text' value={username} onChange={(e) => setUsername(e.target.value)} />
        <Input id='login-password' label='password' type='password' value={password} onChange={(e) => setPassword(e.target.value)}/>
        <button id='login-button' className='form-button' type='submit'>kirjaudu</button>
      </form>
      <Link id='link-to-register' to='/register'>register</Link>
    </div>
  )
}

LoginContainer.propTypes = {
  setUser: PropTypes.func.isRequired,
  notifyUser: PropTypes.func
}

export default LoginContainer

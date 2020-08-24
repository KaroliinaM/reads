import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import Input from '../components/Input' 
import UserService from '../services/UserService'
import { handleError } from '../helpers/helpers'
import PropTypes from 'prop-types'

const RegisterContainer = ({ notifyUser }) => {
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const history = useHistory()

  const handleRegister = (event) => {
    event.preventDefault()
    const user = {
      email,
      username,
      password
    }
    UserService.register(user)
      .then(result => {
        notifyUser({ style: 'notification-success', text: 'user created' })
        history.push('/login')
      })
      .catch(e => {
        handleError(notifyUser, e)
      })
  }

  return (
    <div className='form-container'>
      <form onSubmit={handleRegister} >
        <Input id='register-email' label='e-mail' type='text' value={email} onChange={(e) => setEmail(e.target.value)}/>
        <Input id='register-username' label='username' type='text' value={username} onChange={(e) => setUsername(e.target.value)} />
        <Input id='register-password' label='password' type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
        <button id='register-button' className='form-button' type='submit'>register</button>
      </form>
    </div>
  )
}

RegisterContainer.propTypes = {
  notifyUser: PropTypes.func.isRequired
}

export default RegisterContainer

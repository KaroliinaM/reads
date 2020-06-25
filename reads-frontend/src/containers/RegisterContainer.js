import React, {useState} from 'react'
import {useHistory} from 'react-router-dom'
import Input from '../components/Input' 

const RegisterContainer = ({notifyUser}) => {
    const [email, setEmail] = useState("")
    const [username, setUsername] =useState("")
    const [password, setPassword] = useState("")

    const history=useHistory()

    const handleRegister = (event) => {
        event.preventDefault()
        const user={
            email,
            username,
            password
        }
        fetch('/user/register', {
            method: 'post',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        .then(response => {
            if(response.ok) {
                notifyUser('user created')
                history.push('/login')
            }
            else {
                notifyUser('error during registration')
                console.log('error')
            }
        })
    }

    return(
        <div className='form-container'>
            <form onSubmit={handleRegister} >
                <Input label='e-mail' type='text' value={email} onChange={(e) => setEmail(e.target.value)}/>
                <Input label='username' type='text' value={username} onChange={(e) => setUsername(e.target.value)} />
                <Input label='password' type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
                <button className='form-button' type='submit'>register</button>
            </form>
        </div>
    )
}

export default RegisterContainer
import React, {useState} from 'react'
import {useHistory} from 'react-router-dom'
import BookService from '../services/BookService'
import Input from '../components/Input'
import { Link } from 'react-router-dom'

const LoginContainer = ({setUser}) => {
    const [username, setUsername]=useState("")
    const [password, setPassword]=useState("")
    const history=useHistory()

    const handleLogin=(event)=>{
        event.preventDefault()
        const user={
            username,
            password
        }
        fetch('/user/login', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        .then(response=> {
            console.log(response)
            if(!response.ok) {
                throw response
            }
            return response.json()
        })
        .then(data => {
            console.log('data', data)
            console.log(data.token)
            setUser(data)
            BookService.setToken(data.token)
            window.localStorage.setItem('loggedUser', JSON.stringify(data))
            const path=data.taste_tested? '/':'/rate'
            history.push(path)
        })
        .catch(error => {
            if(error.status===401) {
                notifyUser('login failed')
                setUsername('')
                setPassword('')
            } else {
                notifyUser('system error')
            }
        })

       /*  <div>username<input value={username} onChange={(e)=>setUsername(e.target.value)} /></div>
        <div>password<input value={password} onChange={(e)=> setPassword(e.target.value)} /></div>
        <button type='submit'>kirjaudu</button> */
    }

    return(
        <div className='form-container'>
            <form className='form-element' onSubmit={handleLogin} >
                <Input label='username' type='text' value={username} onChange={(e)=>setUsername(e.target.value)} />
                <Input label='password' type='password' value={password} onChange={(e)=> setPassword(e.target.value)}/>
                <button className='form-button' type='submit'>kirjaudu</button>
            </form>
            <Link to='/register'>register</Link>
        </div>
    )
}

export default LoginContainer
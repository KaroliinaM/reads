import React, {useState} from 'react'
import {useHistory} from 'react-router-dom'
import BookService from '../services/BookService'

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
        .then(response=> response.json())
        .then(data => {
            console.log(data.token)
            setUser(data)
            BookService.setToken(data.token)
            window.localStorage.setItem('loggedUser', JSON.stringify(data))
            const path=data.taste_tested? '/':'/rate'
            history.push(path)
        })
    }

    return(
        <form onSubmit={handleLogin} >
            <div>username<input value={username} onChange={(e)=>setUsername(e.target.value)} /></div>
            <div>password<input value={password} onChange={(e)=> setPassword(e.target.value)} /></div>
            <button type='submit'>kirjaudu</button>
        </form>
    )
}

export default LoginContainer
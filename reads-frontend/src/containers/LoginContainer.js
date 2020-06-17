import React, {useState} from 'react'
import BookService from '../services/BookService'

const LoginContainer = ({setUser}) => {
    const [username, setUsername]=useState("")
    const [password, setPassword]=useState("")

    const handleLogin=(event)=>{
        event.preventDefault()
        const user={
            username,
            password
        }
        fetch('http://localhost:3001/user/login', {
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
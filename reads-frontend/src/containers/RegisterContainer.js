import React, {useState} from 'react'

const RegisterContainer = () => {
    const [email, setEmail] = useState("")
    const [username, setUsername] =useState("")
    const [password, setPassword] = useState("")

    const handleRegister = (event) => {
        event.preventDefault()
        const user={
            email,
            username,
            password
        }
        fetch('http://localhost:3001/user/register', {
            method: 'post',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        .then(response => response.json())
        .then(data => {
            console.log(data)
            setEmail("")
            setUsername("")
            setPassword("")
        })
        console.log(user)
    }

    return(
        <form onSubmit={handleRegister} >
            <div>sähköposti<input value={email} onChange={(e) => setEmail(e.target.value)} /></div>
            <div>käyttäjätunnus<input value={username} onChange={(e) => setUsername(e.target.value)} /></div>
            <div>salasana<input value={password} onChange={(e) => setPassword(e.target.value)} /></div>
            <button type='submit'>rekisteröidy</button>
        </form>
    )
}

export default RegisterContainer
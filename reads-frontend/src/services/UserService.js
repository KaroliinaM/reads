const login = (user) => {
    return fetch('/user/login', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
    .then(response=> {
        if(!response.ok) {
            throw response
        }
        return response.json()
    })
    .then(data => {
        return data
    })
} 

export default {
    login
}
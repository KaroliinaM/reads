const login = (user) => {
  return fetch('/user/login', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  })
    .then(response => {
      if (!response.ok) {
        throw response
      }
      return response.json()
    })
}

const register = (user) => {
  return fetch('/user/register', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  })
    .then(response => {
      if (!response.ok) {
        throw response
      }
      return response.json()
    })
}

export default {
  login,
  register
}

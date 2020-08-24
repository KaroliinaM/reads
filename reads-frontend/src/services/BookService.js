let token = null

const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

const getReadLists = () => {
  return fetch('/readlists', {
    method: 'get',
    headers: {
      Authorization: token
    }
  })
    .then(response => response.json())
}

const postNewList = (newList) => {
  return fetch('/readlists', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token
    },
    body: JSON.stringify(newList)
  })
    .then(response => response.json())
}

const getReadList = (id) => {
  return fetch(`/readlists/${id}`, {
    method: 'get',
    headers: {
      Authorization: token
    }
  })
    .then(response => response.json())
}

const addBookToList = (book) => {
  return fetch('/books', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token
    },
    body: JSON.stringify(book)
  })
    .then(response => response.json())
    .then(data => {
      return data
    })
}

const getBookByIsbn = (isbn) => {
  return fetch(`/book/${isbn}`)
    .then(response => response.json())
}

const getBookDetails = (id) => {
  return fetch(`/books/${id}`, {
    method: 'get',
    headers: {
      Authorization: token
    }
  })
    .then(response => response.json())
    .then(data => {
      return data
    })
}

const postRating = (data) => {
  return fetch('/recommendations/rate', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token
    },
    body: JSON.stringify(data)
  })
    .then(response => response.json())
}

const getRatingSample = () => {
  return fetch('/recommendations/sample', {
    method: 'get',
    headers: {
      Authorization: token
    }
  })
    .then(response => response.json())
}

const getRecommendations = () => {
  return fetch('/recommendations/list', {
    method: 'get',
    headers: {
      Authorization: token
    }
  })
    .then(response => response.json())
}

const setRatingDone = () => {
  return fetch('/recommendations/rated', {
    method: 'put',
    headers: {
      Authorization: token
    }
  })
}

export default {
  getReadLists: getReadLists,
  postNewList: postNewList,
  getReadList: getReadList,
  getBookByIsbn: getBookByIsbn,
  addBookToList: addBookToList,
  getBookDetails: getBookDetails,
  postRating: postRating,
  getRatingSample: getRatingSample,
  getRecommendations: getRecommendations,
  setRatingDone: setRatingDone,
  setToken,
  token
}

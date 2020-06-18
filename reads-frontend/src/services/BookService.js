import React from 'react'

let token=null

const setToken=(newToken)=> {
    console.log('täälä')
    token=`Bearer ${newToken}`
    console.log('token', token)
}

const getReadLists = () => {
    console.log('haku', token)
    return fetch('http://localhost:3001/readlists', {
        method: 'get',
        headers: {
            Authorization: token
        }
    })
    .then(response => response.json())
}

const postNewList = (newList) => {
    return fetch('http://localhost:3001/readlists', {
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
    return fetch(`http://localhost:3001/readlists/${id}`, {
        method: 'get',
        headers: {
            Authorization: token
        }
    })
    .then(response => response.json())
}

const addBookToList = (book) => {
    return fetch('http://localhost:3001/books', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token
        },
        body: JSON.stringify(book)
    })
    .then(response => response.json())
    .then(data => {
        console.log('success', data)
    })
}

const getBookByIsbn = (isbn) => {
    return fetch(`http://localhost:3001/book/${isbn}`)
    .then(response => response.json())
}

const getBookDetails = (id) => {
    return fetch(`http://localhost:3001/books/${id}`, {
        method: 'get',
        headers: {
            Authorization: token
        }
    })
    .then(response => response.json())
    .then(data => {
        console.log(data)
        return data
        //setBook(data)
    })
}

const postRating = (data) => {
    return fetch('http://localhost:3001/recommendations/rate', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            Authorization: token
        },
        body: JSON.stringify(data)
    })
    .then(response=> response.json())
}

const getRatingSample=()=> {
    return fetch('http://localhost:3001/recommendations/sample', {
        method: 'get',
        headers: {
            Authorization: token
        }
    })
    .then(response => response.json())
}

const getRecommendations= () => {
    return fetch('http://localhost:3001/recommendations/list', {
        method: 'get',
        headers: {
            Authorization: token
        }
    })
    .then(response => response.json())
}

export default{
    getReadLists: getReadLists,
    postNewList: postNewList,
    getReadList: getReadList,
    getBookByIsbn: getBookByIsbn,
    addBookToList: addBookToList,
    getBookDetails: getBookDetails,
    postRating: postRating,
    getRatingSample: getRatingSample,
    getRecommendations: getRecommendations,
    setToken,
    token 
}


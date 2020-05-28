import React from 'react'

const getReadLists = () => {
    return fetch('http://localhost:3001/readlists')
    .then(response => response.json())
}

const postNewList = (newList) => {
    return fetch('http://localhost:3001/readlists', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newList)
    })
    .then(response => response.json())
}

const getReadList = (id) => {
    return fetch(`http://localhost:3001/readlists/${id}`)
    .then(response => response.json())
}

const getBookByIsbn = (isbn) => {
    return fetch(`http://localhost:3001/book/${isbn}`)
    .then(response => response.json())
}

export default{
    getReadLists: getReadLists,
    postNewList: postNewList,
    getReadList: getReadList,
    getBookByIsbn: getBookByIsbn 
}


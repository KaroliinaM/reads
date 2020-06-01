import React, {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import Book from '../components/Book'

const BookDetailsContainer = () => {
    const [book, setBook] = useState({})
    const id=useParams().id
    console.log(id)
    useEffect(() => {
        fetch(`http://localhost:3001/books/${id}`)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            setBook(data)
        })
    }, [id])
    return (
        <>ggg</>
    )
}

export default BookDetailsContainer
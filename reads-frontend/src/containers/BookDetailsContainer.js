import React, {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import Book from '../components/Book'
import BookService from '../services/BookService'

const BookDetailsContainer = () => {
    const [book, setBook] = useState(null)
    const id=useParams().id
    console.log(id)
    useEffect(() => {
        BookService.getBookDetails(id)
        .then(data => setBook(data))
/*         fetch(`http://localhost:3001/books/${id}`)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            setBook(data)
        }) */
    }, [id])
    return (
        <>
            {book && <Book book={book} />}
        </>
    )
}

export default BookDetailsContainer
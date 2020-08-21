import React, {useState, useEffect} from 'react'
import Rating from 'react-rating'
import {useHistory} from 'react-router-dom'
import Book from '../components/Book'
import BookService from '../services/BookService'
import ListPicker from '../components/ListPicker'
import Library from '../components/Library'
import BookDetails from '../components/BookDetails'
import LibraryService from '../services/LibraryService'

const BookDetailsContainer = (props) => {
    const [book, setBook] = useState(props.location.state.book)
    const [readLists, setReadLists] = useState([])
    const [library, setLibrary] = useState([])
    const history=useHistory()

    useEffect(() => {
        BookService.getReadLists()
        .then(data => setReadLists(data))
    },[])

    useEffect(()=> {
        const author=book.authors[0]
        LibraryService.getBooks(author)
        .then(result=> {
            const books=Array.from(new Set(result))
            setLibrary(books)
        })
    }, [book])

    const label='<'

    const handleBack=(e)=> {
        e.preventDefault()
        history.goBack()
    }



    return (
        <>
            <button className='button' onClick={handleBack}>{label}</button>
            <BookDetails book={book} setBook={setBook} readLists={readLists} library={library} />
        </>
    )
}


export default BookDetailsContainer
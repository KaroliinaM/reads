import React, {useState, useEffect} from 'react'
import Rating from 'react-rating'
import {useHistory} from 'react-router-dom'
import Book from '../components/Book'
import BookService from '../services/BookService'
import ListPicker from '../components/ListPicker'

const BookDetailsContainer = (props) => {
    const [book, setBook] = useState(props.location.state.book)
    const [readLists, setReadLists] = useState([])
    const history=useHistory()

    useEffect(() => {
        BookService.getReadLists()
        .then(data => setReadLists(data))
    },[])

    const handleChange=(e)=>{
        console.log(e)
        const ratedBook = {...book, rated:e}
        BookService.postRating(ratedBook)
        .then(response => console.log(response))
    }

    const addBookToList = (listId) => {
        const bookOnList={...book, readlist_id: listId}
        BookService.addBookToList(bookOnList)
        .then(response => {
            setBook(bookOnList)
        })
    }
    const label='<'

    const handleBack=(e)=> {
        e.preventDefault()
        history.goBack()
    }



    return (
        <>
            <button className='button' onClick={handleBack}>{label}</button>
            {readLists.length>0 && (
                <div className='book-card-container'>
                    <Book book={book} />
                    <div id='rating-part'> 
                        <Rating
                            stop={10}
                            fractions={2}
                            initialRating={book.rated}
                            onChange={handleChange} 
                        />
                    </div>
                    <ListPicker readLists={readLists} selected={book.readlist_id} addBookToList={addBookToList} />
                </div>
            )}
        </>
    )
}


export default BookDetailsContainer
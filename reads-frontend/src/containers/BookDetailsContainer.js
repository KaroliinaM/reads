import React, {useState, useEffect} from 'react'
import Rating from 'react-rating'
import Book from '../components/Book'
import BookService from '../services/BookService'
import ListPicker from '../components/ListPicker'

const BookDetailsContainer = (props) => {
    const [book, setBook] = useState(props.location.state.book)
    const [readLists, setReadLists] = useState([])
    console.log('book', props.location.state)
    console.log('book', props.location.state.book)

    useEffect(() => {
        BookService.getReadLists()
        .then(data => setReadLists(data))
    },[])

    const handleChange=(e)=>{
        console.log(e)
        const ratedBook = {...book, rated:e}
/*         const ratedBook = {
          title: bookByIsbn.title,
          isbn: bookByIsbn.isbn,
          isbn13: bookByIsbn.isbn13,
          image_url: bookByIsbn.image_url,
          description: bookByIsbn.description,
          authors: bookByIsbn.authors,
          rated: e
        } */
        BookService.postRating(ratedBook)
        .then(response => console.log(response))
    }

    const addBookToList = (listId) => {
        const bookOnList={...book, readlist_id: listId}
/*         const book = {
          title: bookByIsbn.title,
          isbn: bookByIsbn.isbn,
          isbn13: bookByIsbn.isbn13,
          image_url: bookByIsbn.image_url,
          description: bookByIsbn.description,
          authors: bookByIsbn.authors,
          readlist_id:listId
        } */
        BookService.addBookToList(bookOnList)
        .then(response => console.log(response))
    }



    return (
        <>
            {readLists.length>0 && (
                <>
                    <Book book={book} />
                    <Rating
                        stop={10}
                        fractions={2}
                        onChange={handleChange} 
                    />
                    {console.log('readlists', readLists)}
                    <ListPicker readLists={readLists} addBookToList={addBookToList} />
                </>
            )}
        </>
    )
}


export default BookDetailsContainer
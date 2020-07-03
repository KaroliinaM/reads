import React, {useState, useEffect} from 'react'
import Rating from 'react-rating'
import Book from '../components/Book'
import BookService from '../services/BookService'

const BookDetailsContainer = (props) => {
    const [book, setBook] = useState(props.location.state.book)
    console.log('book', props.location.state)
    console.log('book', props.location.state.book)

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

    return (
        <>
            {book && (
                <>
                    <Book book={book} />
                    <Rating
                        stop={10}
                        fractions={2}
                        onChange={handleChange} 
                    />
                </>
            )}
        </>
    )
}

export default BookDetailsContainer
import React from 'react'
import Book from '../components/Book'
import ListPicker from '../components/ListPicker'
import Library from '../components/Library'
import BookService from '../services/BookService'
import Rating from 'react-rating'
import PropTypes from 'prop-types'

const BookDetails = ({ book, setBook, readLists, library }) => {
  const handleChange = (e) => {
    const ratedBook = { ...book, rated: e }
    BookService.postRating(ratedBook)
      .then(response => {
        setBook(response)
      })
  }

  const addBookToList = (listId) => {
    const bookOnList = { ...book, readlist_id: listId }
    BookService.addBookToList(bookOnList)
      .then(response => {
        setBook(response.result)
      })
  }

  return (
    <>
      {readLists.length > 0 && (
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
          <Library library={library} book={book} />
        </div>
      )}
    </>
  )
}

BookDetails.propTypes = {
  book: PropTypes.object.isRequired,
  setBook: PropTypes.func,
  readLists: PropTypes.array.isRequired,
  library: PropTypes.array.isRequired
}

export default BookDetails

import React from 'react'
import PropTypes from 'prop-types'

const Book = ({ book }) => {
  return (
    <div className='book-container'>
      <img src={book.image_url} alt="cover" />
      <div className='book-info-container'>
        <h1 className='title'>{book.title}</h1>
        <h2 className='author'>{book.authors[0]}</h2>
        <p>{book.description}</p>
      </div>
    </div>
  )
}

Book.propTypes = {
  book: PropTypes.object.isRequired
}

export default Book

import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Library = ({ library, book }) => {

  const [visible, setVisible] = useState(false)

  const checkLibrary = () => {
    return library.includes(book.title.toUpperCase()) ? <p className='in-library'>In library</p> : <p className='not-in-library'>Not in library</p>
  }

  const booksFromAuthor = () => {
    return library.map(libraryBook => {
      return <p key={libraryBook}>{libraryBook}</p>
    })
  }

  const buttonText = visible ? 'Hide books' : 'Show library books from author'

  return (
    <>
      {checkLibrary()}
      <button onClick={() => setVisible(!visible)}>{buttonText}</button>
      {visible && booksFromAuthor()}
    </>)
}

Library.propTypes = {
  library: PropTypes.array.isRequired,
  book: PropTypes.object.isRequired
}

export default Library

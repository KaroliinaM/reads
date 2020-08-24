import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import BookService from '../services/BookService'
import BookDetails from '../components/BookDetails'
import LibraryService from '../services/LibraryService'
import PropTypes from 'prop-types'

const BookDetailsContainer = (props) => {
  const [book, setBook] = useState(props.location.state.book)
  const [readLists, setReadLists] = useState([])
  const [library, setLibrary] = useState([])
  const history = useHistory()

  useEffect(() => {
    BookService.getReadLists()
      .then(data => setReadLists(data))
  }, [])

  useEffect(() => {
    const author = book.authors[0]
    LibraryService.getBooks(author)
      .then(result => {
        const books = Array.from(new Set(result))
        setLibrary(books)
      })
  }, [book])

  const label = '<'

  const handleBack = (e) => {
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

BookDetailsContainer.propTypes = {
  location: PropTypes.object.isRequired
}

export default BookDetailsContainer

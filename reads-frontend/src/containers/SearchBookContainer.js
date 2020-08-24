import React, { useState, useEffect } from 'react';
import BookService from '../services/BookService'
import LibraryService from '../services/LibraryService'
import BookDetails from '../components/BookDetails'
import { useHistory, useLocation } from 'react-router-dom'

const SearchBookContainer = () => {
  const history = useHistory()
  const location = useLocation()

  const [isbn, setIsbn] = useState('')
  const [bookByIsbn, setBookByIsbn] = useState(location.state ? location.state.book : undefined)
  const [readLists, setReadLists] = useState([])
  const [library, setLibrary] = useState([])

  const primary = !!location.state

  useEffect(() => {
    let isMounted = true
    BookService.getReadLists()
      .then(data => {
        if (isMounted)setReadLists(data)
      })
    return () => { isMounted = false }
  }, [])

  useEffect(() => {
    if (bookByIsbn) {
      const author = bookByIsbn.authors[0]
      LibraryService.getBooks(author)
        .then(result => {
          const books = Array.from(new Set(result))
          setLibrary(books)
        })
    }
  }, [bookByIsbn])

  const resultOnSearchPage = (data) => {
    if (!primary) {
      history.push({
        pathname: '/etsi',
        state: { book: data }
      })
    } else {
      setBookByIsbn(data)
    }
  }

  const submitForm = (event) => {
    event.preventDefault()
    BookService.getBookByIsbn(isbn)
      .then(data => {
        resultOnSearchPage(data)
      })
  }

  const searchResult = () => {
    if (bookByIsbn) {
      return (
        <>
          {bookByIsbn.title
            ? <BookDetails book={bookByIsbn} setBook={setBookByIsbn} readLists={readLists} library={library} />
            : <p>No results found</p>
          }
        </>
      )
    }
  }

  return (
    <div>
      <h1 className='listTitle'>Find books</h1>
      <form onSubmit={submitForm}>
        <input id='search-input' className = 'input' placeholder='search books by isbn' value={isbn} onChange={(e) => setIsbn(e.target.value)} />
        <button id='search-btn' className = 'button' type='submit'>search</button>
      </form>
      {searchResult()}
    </div>
  )
}

export default SearchBookContainer

import React, {useState, useEffect} from 'react';
import Book from '../components/Book'
import ListPicker from '../components/ListPicker'
import BookService from '../services/BookService'
import Rating from 'react-rating'
import { useHistory, useLocation } from 'react-router-dom'


const SearchBookContainer =()=> {

  const history=useHistory()
  const location=useLocation()

  const [isbn, setIsbn]=useState('')
  const [bookByIsbn, setBookByIsbn]=useState(location.state? location.state.book: undefined)
  const [readLists, setReadLists] = useState([])

  
  const primary=!!location.state
  console.log('location', location.state)

  useEffect(() => {
    BookService.getReadLists()
    .then(data => setReadLists(data))
  },[])

  const resultOnSearchPage= (data) => {
    if(!primary) {
      history.push({
        pathname: '/etsi',
        state: { book: data }
      })
    } else {
      console.log('täällä')
      setBookByIsbn(data)
    }
  }

  const submitForm = (event) => {
    event.preventDefault()
    BookService.getBookByIsbn(isbn)
    .then(data => {
      console.log('data', data)
      if(data) {
        resultOnSearchPage(data)
      } else {
        console.log('ei löydy')
      }      
    })
  }

  const addBookToList = (listId) => {
    const book = {
      title: bookByIsbn.title,
      isbn: bookByIsbn.isbn,
      isbn13: bookByIsbn.isbn13,
      image_url: bookByIsbn.image_url,
      description: bookByIsbn.description,
      authors: bookByIsbn.authors,
      readlist_id:listId
    }
    BookService.addBookToList(book)
    .then(response => {
      const newBookByIsbn={...bookByIsbn, readlist_id:listId}
      setBookByIsbn(newBookByIsbn)
    })

  }

  const handleChange=(e)=>{
    const book = {
      title: bookByIsbn.title,
      isbn: bookByIsbn.isbn,
      isbn13: bookByIsbn.isbn13,
      image_url: bookByIsbn.image_url,
      description: bookByIsbn.description,
      authors: bookByIsbn.authors,
      rated: e
    }
    BookService.postRating(book)
    .then(response => console.log(response))
  }

  const searchResult = ()=> {
    if(bookByIsbn) {
      return (
        <>
          {bookByIsbn.title? (
            <div className='book-card-container'>
              <Book book={bookByIsbn} />
              <div id='rating-part'>
                <Rating
                stop={10}
                fractions={2}
                onChange={handleChange}
                />
              </div>
            <ListPicker readLists={readLists} selected={bookByIsbn.readlist_id} addBookToList={addBookToList} />
            </div>)
            : <p>No results found</p>
          }
      </>
    )}
  }


return(
  <div>
    <h1 className='listTitle'>Find books</h1>
    <form onSubmit={submitForm}>
      <input id='search-input' className = 'input' value={isbn} onChange={(e)=>setIsbn(e.target.value)} />
      <button id='search-btn' className = 'button' type='submit'>search</button>
    </form>
    {console.log('bookbyisbn', bookByIsbn)}
    {searchResult()}
  </div>
)}

export default SearchBookContainer;
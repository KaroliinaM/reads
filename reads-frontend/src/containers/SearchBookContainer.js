import React, {useState, useEffect} from 'react';
import Book from '../components/Book'
import ListPicker from '../components/ListPicker'
import BookService from '../services/BookService'
import Rating from 'react-rating'
import BookDetails from '../components/BookDetails'
import { useHistory, useLocation } from 'react-router-dom'


const SearchBookContainer =()=> {

  const history=useHistory()
  const location=useLocation()

  const [isbn, setIsbn]=useState('')
  const [bookByIsbn, setBookByIsbn]=useState(location.state? location.state.book: undefined)
  const [readLists, setReadLists] = useState([])
  const [library, setLibrary] = useState([])
  
  const primary=!!location.state

  useEffect(() => {
    BookService.getReadLists()
    .then(data => setReadLists(data))
  },[])

  useEffect(()=> {
    if(bookByIsbn) {
      const author=bookByIsbn.authors[0]
      const authorString=author.split(' ').join('+')
      fetch(`/library?author=${authorString}`)
      .then(response=> response.json())
      .then(result=> {
        const books=Array.from(new Set(result))
        setLibrary(books)
    })}
}, [bookByIsbn])

  const resultOnSearchPage= (data) => {
    if(!primary) {
      console.log('hep')
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

  const searchResult = ()=> {
    if(bookByIsbn) {
      return (
        <>
          {bookByIsbn.title?
            <BookDetails book={bookByIsbn} setBook={setBookByIsbn} readLists={readLists} library={library} />
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
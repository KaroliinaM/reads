import React, {useState, useEffect} from 'react';
import Book from '../components/Book'
import ListPicker from '../components/ListPicker'
import BookService from '../services/BookService'


const SearchBookContainer =()=> {
  const [isbn, setIsbn]=useState('')
  const [bookByIsbn, setBookByIsbn]=useState(null)
  const [readLists, setReadLists] = useState([])

  useEffect(() => {
    BookService.getReadLists()
    .then(data => setReadLists(data))
  },[])

  //const bookByIsbn=books.find(b=>  b.isbn===isbn)
  const submitForm = (event) => {
    event.preventDefault()
    console.log(isbn)
    BookService.getBookByIsbn(isbn)
    .then(data => {
        console.log(data)
        console.log(data.authors[0])
        setBookByIsbn(data)
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
    .then(response => console.log(response))

  }


return(
  <div>
    <form onSubmit={submitForm}>
      <input value={isbn} onChange={(e)=>setIsbn(e.target.value)} />
      <button type='submit'>lähetä</button>
    </form>
    {bookByIsbn && 
      <>
        <Book book={bookByIsbn} />
        <ListPicker readLists={readLists} addBookToList={addBookToList} />
      </>
    }
  </div>
)}

export default SearchBookContainer;
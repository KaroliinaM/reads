import React, {useState} from 'react';
import Book from '../components/Book'

const SearchBookContainer =()=> {
  const [isbn, setIsbn]=useState('')
  const [bookByIsbn, setBookByIsbn]=useState(null)

  //const bookByIsbn=books.find(b=>  b.isbn===isbn)
  const submitForm = (event) => {
    event.preventDefault()
    console.log(isbn)
    
    fetch(`http://localhost:3001/book/${isbn}`)
      .then(response => response.json())
      .then(data => {
        console.log(data)
        setBookByIsbn(data)
      })
  }


return(
  <div>
    <form onSubmit={submitForm}>
      <input value={isbn} onChange={(e)=>setIsbn(e.target.value)} />
      <button type='submit'>lähetä</button>
    </form>
    {bookByIsbn && 
      <Book book={bookByIsbn} />
    }
  </div>
)}

export default SearchBookContainer;
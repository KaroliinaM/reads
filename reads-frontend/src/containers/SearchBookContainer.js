import React, {useState, useEffect} from 'react';
import Book from '../components/Book'
import ListPicker from '../components/ListPicker'


const SearchBookContainer =()=> {
  const [isbn, setIsbn]=useState('')
  const [bookByIsbn, setBookByIsbn]=useState(null)
  const [readLists, setReadLists] = useState([])

  useEffect(() => {
    fetch('http://localhost:3001/readlists')
    .then(response => response.json())
    .then(data => setReadLists(data))
  },[])

  //const bookByIsbn=books.find(b=>  b.isbn===isbn)
  const submitForm = (event) => {
    event.preventDefault()
    console.log(isbn)
    
    fetch(`http://localhost:3001/book/${isbn}`)
      .then(response => response.json())
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
      description: bookByIsbn.description,
      author: bookByIsbn.authors[0],
      readlist_id:listId
    }
    fetch('http://localhost:3001/books', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(book)
    })
    .then(response => response.json())
    .then(data => {
      console.log('success', data)
    })
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
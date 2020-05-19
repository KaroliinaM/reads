import React, {useState} from 'react';
import Book from './components/Book'

const App =({books})=> {
  const [isbn, setIsbn]=useState('')

  const bookByIsbn=books.filter(b=>  b.isbn===isbn)

return(
  <div>Hello World
    <input value={isbn} onChange={(e)=>setIsbn(e.target.value)} />
    {bookByIsbn.length>0 && 
      <Book book={bookByIsbn[0]} />
    }
    
    
  </div>
)}

export default App;

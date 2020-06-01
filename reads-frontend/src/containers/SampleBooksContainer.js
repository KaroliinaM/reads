import React, { useEffect, useState } from 'react'

const SampleBooksContainer = () => {
    const [books, setBooks] = useState([])

    useEffect(()=> {
        fetch('http://localhost:3001/recommendations/sample')
        .then(response => response.json())
        .then(data => setBooks(data))
    },[])

    if(books.length>0) {
        return books.map(book => {
            return <p key={book.title}>{book.title}</p>
        })
    }

    return(
        
        <></>
    )
}

export default SampleBooksContainer
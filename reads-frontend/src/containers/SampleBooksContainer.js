import React, { useEffect, useState } from 'react'
import ReadListItem from '../components/ReadListItem'

const SampleBooksContainer = () => {
    const [books, setBooks] = useState([])

    useEffect(()=> {
        fetch('http://localhost:3001/recommendations/sample')
        .then(response => response.json())
        .then(data => setBooks(data))
    },[])

    if(books.length>0) {
        return books.map(book => {
            return <ReadListItem key={book.title} item={book} />
        })
    }

    return(
        
        <></>
    )
}

export default SampleBooksContainer
import React, { useEffect, useState } from 'react'
import ReadListItem from '../components/ReadListItem'
import Rating from 'react-rating'

const SampleBooksContainer = () => {
    const [books, setBooks] = useState([])

    useEffect(()=> {
        fetch('http://localhost:3001/recommendations/sample')
        .then(response => response.json())
        .then(data => setBooks(data))
    },[])

    const handleChange= (book, e) =>{
        console.log('value', e, book)
        const data= {...book, rated: 3}
        console.log(data)
        fetch('http://localhost:3001/recommendations/rate', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response=> response.json())
        .then(result => console.log(result))
    }

    if(books.length>0) {
        return books.map(book => {
            return (<div key={book.title}>
                        <ReadListItem item={book} />
                        <Rating 
                            stop={10} 
                            fractions={2}
                            onChange={(e)=>handleChange(book, e)} 
                        /> 
                    </div>)
        })
    }

    return <></>
}

export default SampleBooksContainer
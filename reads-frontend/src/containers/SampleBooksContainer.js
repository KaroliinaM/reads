import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import ReadListItem from '../components/ReadListItem'
import Rating from 'react-rating'
import BookService from '../services/BookService'

const SampleBooksContainer = () => {
    const [books, setBooks] = useState([])
    const [done, setDone] = useState(false)

    useEffect(()=> {
        BookService.getRatingSample()
/*         fetch('http://localhost:3001/recommendations/sample')
        .then(response => response.json()) */
        .then(data => setBooks(data))
    },[])

    const handleChange= (book, e) =>{
        console.log('value', e, book)
        console.log('type', typeof e)
        const data= {...book, rated: e}
        console.log(data)
        BookService.postRating(data)
/*         fetch('http://localhost:3001/recommendations/rate', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response=> response.json()) */
        .then(result => {
            console.log(result)
            setBooks(books.map(book=> book.readgeekid === data.readgeekid? data : book))
            if(!done) {
                setDone(true)
                BookService.setRatingDone()
            }
        })
    }

    const bookList = () => {
        if(books.length>0) {
            return books.map(book => {
                return (<div key={book.title}>
                            <ReadListItem item={book} />
                            <Rating 
                                stop={10} 
                                fractions={2}
                                initialRating={book.rated}
                                onChange={(e)=>handleChange(book, e)} 
                            /> 
                        </div>)
            })
        }
        return <></>
    }

    
    return (
    <>
        <h1 className='listTitle'>Rate books</h1>
        <p>Recommendations are based on the books you've rated</p>
        {bookList()}
        <Link to='/'>
            <button 
                className='form-button'
                disabled={!done}
            >
            Ready!
            </button>
        </Link>
    </>)


    
}

export default SampleBooksContainer
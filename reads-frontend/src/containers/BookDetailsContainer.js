import React, {useState, useEffect} from 'react'
import Rating from 'react-rating'
import {useHistory} from 'react-router-dom'
import Book from '../components/Book'
import BookService from '../services/BookService'
import ListPicker from '../components/ListPicker'
import Library from '../components/Library'

const BookDetailsContainer = (props) => {
    const [book, setBook] = useState(props.location.state.book)
    const [readLists, setReadLists] = useState([])
    const [library, setLibrary] = useState([])
    const history=useHistory()

    useEffect(() => {
        BookService.getReadLists()
        .then(data => setReadLists(data))
    },[])

    useEffect(()=> {
        const author=book.authors[0]
        const authorString=author.split(' ').join('+')
        fetch(`/library?author=${authorString}`)
        .then(response=> response.json())
        .then(result=> {
            const books=Array.from(new Set(result))
            setLibrary(books)
        })
    }, [book])

    const handleChange=(e)=>{
        console.log(e)
        const ratedBook = {...book, rated:e}
        BookService.postRating(ratedBook)
        .then(response => console.log(response))
    }

    const addBookToList = (listId) => {
        console.log('readlist', listId)
        const bookOnList={...book, readlist_id: listId}
        BookService.addBookToList(bookOnList)
        .then(response => {
            console.log('addedBook', response.result)
            setBook(response.result)
        })
    }

    const label='<'

    const handleBack=(e)=> {
        e.preventDefault()
        history.goBack()
    }



    return (
        <>
            <button className='button' onClick={handleBack}>{label}</button>
            {readLists.length>0 && (
                <div className='book-card-container'>
                    <Book book={book} />
                    <div id='rating-part'> 
                        <Rating
                            stop={10}
                            fractions={2}
                            initialRating={book.rated}
                            onChange={handleChange} 
                        />
                    </div>
                    <ListPicker readLists={readLists} selected={book.readlist_id} addBookToList={addBookToList} />
                    <Library library={library} book={book} />
                </div>
            )}
        </>
    )
}


export default BookDetailsContainer
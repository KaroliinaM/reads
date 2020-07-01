import React, {useState, useEffect} from 'react'
import {useParams, Link} from 'react-router-dom'
import ReadListItem from '../components/ReadListItem'
import BookService from '../services/BookService'

const ReadListContainer = () => {
    const [readList, setReadList] = useState([])
    const id=useParams().id

    useEffect(() => {
        BookService.getReadList(id)
        .then(data => {
            console.log(data)
            setReadList(data)
        })
    }, [id])

    return (
        <>
            {readList.map(book => {
                return(<Link key={book.id} to={{pathname: `/book/${book.id}`, state:{book}}}><ReadListItem key={book.id} item={book} /></Link>)
            })}
        </>
    )
}

export default ReadListContainer
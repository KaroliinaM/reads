import React, {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
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
                return(<ReadListItem key={book.id} item={book} />)
            })}
        </>
    )
}

export default ReadListContainer
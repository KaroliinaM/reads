import React, {useState, useEffect} from 'react'
import {useParams, Link} from 'react-router-dom'
import ReadListItem from '../components/ReadListItem'
import BookService from '../services/BookService'
import Breadcrumbs from '../components/Breadcrumbs'

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
            <Breadcrumbs site='list details' />
            {readList.map(book => {
                return(<Link className='readlist-link-box' key={book.id} to={{pathname: `/book/details`, state:{book}}}><ReadListItem key={book.id} item={book} /></Link>)
            })}
        </>
    )
}

export default ReadListContainer
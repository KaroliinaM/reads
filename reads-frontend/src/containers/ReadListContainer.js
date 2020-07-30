import React, {useState, useEffect} from 'react'
import {useParams, Link} from 'react-router-dom'
import ReadListItem from '../components/ReadListItem'
import BookService from '../services/BookService'
import Breadcrumbs from '../components/Breadcrumbs'

const ReadListContainer = () => {
    const [readList, setReadList] = useState([])
    const [readLists, setReadLists] =useState([])
    const id=useParams().id
    const nrId=Number(id)

    useEffect(() => {
        BookService.getReadLists()
        .then(data => {
            setReadLists(data)
        })
    }, [id])

    useEffect(() => {
        BookService.getReadList(id)
        .then(data => {
            setReadList(data)
        })
    }, [id])

    const listName=readLists.find(l=> l.id===nrId)

    return (
        <>
            <Breadcrumbs site='list details' />
            {listName && <h1 className='listTitle'>{listName.name}</h1>}
            {readList.map(book => {
                return(<Link className='readlist-link-box' key={book.id} to={{pathname: `/book/details`, state:{book}}}><ReadListItem key={book.id} item={book} /></Link>)
            })}
        </>
    )
}

export default ReadListContainer
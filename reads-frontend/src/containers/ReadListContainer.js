import React, {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import ReadListItem from '../components/ReadListItem'

const ReadListContainer = () => {
    const [readList, setReadList] = useState([])
    const id=useParams().id

    useEffect(() => {
        fetch(`http://localhost:3001/books/${id}`)
        .then(response => response.json())
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
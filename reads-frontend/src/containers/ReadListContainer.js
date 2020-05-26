import React, {useState, useEffect} from 'react'
import ReadListItem from '../components/ReadListItem'

const ReadListContainer = ({id}) => {
    const [readList, setReadList] = useState([])

    useEffect(() => {
        fetch('http://localhost:3001/books/')
        .then(response => response.json())
        .then(data => {
            console.log(data)
            setReadList(data)
        })
    }, [])

    return (
        <>
                {readList.map(book => {
                    return(<ReadListItem key={book.id} item={book} />)
                })}
        </>
    )
}

export default ReadListContainer
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import ReadListItem from '../components/ReadListItem'
import BookService from '../services/BookService'

const RecommendContainer = () => {

    const [recommendations, setRecommendations] = useState([])

    useEffect(() => {
        BookService.getRecommendations()
        .then(data => setRecommendations(data))
    }, [])

    const listRecommendations = () => {
        return recommendations.map(book => {
            return <Link className='readlist-link-box' key={book.readgeekid} to={{pathname: `/book/details`, state:{book}}}><ReadListItem item={book} /></Link>
        }) 
    }

    return(
        <>
            <h1 className='listTitle'>Recommendations</h1>
            {listRecommendations()}
        </>
    )
}

export default RecommendContainer
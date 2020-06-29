import React, { useState, useEffect } from 'react'
import ReadListItem from '../components/ReadListItem'
import BookService from '../services/BookService'

const RecommendContainer = () => {

    const [recommendations, setRecommendations] = useState([])

    useEffect(() => {
        BookService.getRecommendations()
        .then(data => setRecommendations(data))
    }, [])

    const listRecommendations = () => {
        return recommendations.map(recommendation => {
            return <ReadListItem item={recommendation} />
        }) 
    }

    return(
        <>
            <h1 className='listTitle'>Recommendations</h1>
            {listRecommendations()}
        </>
    )


/*     return recommendations.map(recommendation => {
        return <ReadListItem item={recommendation} />
    }) */
}

export default RecommendContainer
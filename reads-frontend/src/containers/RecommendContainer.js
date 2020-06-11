import React, { useState, useEffect } from 'react'
import ReadListItem from '../components/ReadListItem'

const RecommendContainer = () => {

    const [recommendations, setRecommendations] = useState([])

    useEffect(() => {
        fetch('http://localhost:3001/recommendations/list')
        .then(response => response.json())
        .then(data => setRecommendations(data))
    }, [])


    return recommendations.map(recommendation => {
        return <ReadListItem item={recommendation} />
    })
}

export default RecommendContainer
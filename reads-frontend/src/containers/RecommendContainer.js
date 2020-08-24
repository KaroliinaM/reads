import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import ReadListItem from '../components/ReadListItem'
import FilterBooks from '../components/FilterBooks'
import BookService from '../services/BookService'

const RecommendContainer = () => {

    const [recommendations, setRecommendations] = useState([])
    const [genre, setGenre] =useState(null)

    const genres=Array.from(new Set(recommendations.map(r=>r.genre)))

    const filteredRecommendations=genre? 
    recommendations.filter(r=> r.genre===genre)
    :recommendations

    useEffect(() => {
        let isMounted=true
        BookService.getRecommendations()
        .then(data => {
            if(isMounted)setRecommendations(data)
        })
        return ()=> {isMounted=false}
    }, [])


    const listRecommendations = () => {
    if(recommendations.length===0) {
            return <p>processing, wait for a moment</p>
        }
        return filteredRecommendations.map(book => {
            return <Link className='readlist-link-box' key={book.isbn} to={{pathname: `/book/details`, state:{book}}}><ReadListItem item={book} /></Link>
        }) 
    }

    return(
        <>
            <Link to='/recommendations'><h1 className='listTitle'>Recommendations</h1></Link>
            <FilterBooks genres={genres} genre={genre} setGenre={setGenre} />
            {listRecommendations()}
        </>
    )
}

export default RecommendContainer
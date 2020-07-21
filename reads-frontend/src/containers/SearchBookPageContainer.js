import React from 'react'
import Breadcrumbs from '../components/Breadcrumbs'
import SearchBookContainer from './SearchBookContainer'

const SearchBookPageContainer = () => {
    return (
        <div className='page-container'>
            <Breadcrumbs site='search' />
            <SearchBookContainer />
        </div>
    )
}

export default SearchBookPageContainer
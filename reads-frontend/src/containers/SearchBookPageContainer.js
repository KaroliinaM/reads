import React from 'react'
import Breadcrumbs from '../components/Breadcrumbs'
import SearchBookContainer from './SearchBookContainer'

const SearchBookPageContainer = () => {
    return (
        <>
            <Breadcrumbs site='search' />
            <SearchBookContainer />
        </>
    )
}

export default SearchBookPageContainer
import React from 'react'

const FilterBooks = ({genres, genre, setGenre}) => {

    const setFilter=(selectedGenre)=> {
        return ()=> {
            selectedGenre===genre? setGenre(null): setGenre(selectedGenre)
        }
    }

    return genres.map(g => {
        return <button key={g} className={g===genre? 'btn-listpicker-selected':'btn-listpicker'}  onClick={setFilter(g)}>{g}</button>
    })
}

export default FilterBooks
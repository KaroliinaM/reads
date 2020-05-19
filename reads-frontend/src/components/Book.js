import React from 'react'

const Book = ({book}) => {
    return(
        <div className='book-container'>
            <img src={book.image} alt="Smiley face" />
            <div className='book-info-container'>
                <h1>{book.title}</h1>
                <h2>{book.authors[0]}</h2>
                <p>{book.description}</p>
            </div>
        </div>
    )
}

export default Book
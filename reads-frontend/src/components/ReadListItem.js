import React from 'react'

const ReadListItem = ({item}) => (
    <div>
        <p>{item.title}</p>
        <p>{item.author}</p>
        <p>{item.description}</p>
    </div>
)

export default ReadListItem
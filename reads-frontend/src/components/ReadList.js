import React from 'react'
import {Link} from 'react-router-dom'

const ReadList = ({list}) => (
    <div className='readlist-link-box'>
        <Link className='readlist-link'to={`/list/${list.id}`} >{list.name}</Link>
    </div>
)

export default ReadList
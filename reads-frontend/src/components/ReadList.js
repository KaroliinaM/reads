import React from 'react'
import {Link} from 'react-router-dom'

const ReadList = ({list}) => (
    <div>
        <Link to={`/list/${list.id}`} >{list.name}</Link>
    </div>
)

export default ReadList
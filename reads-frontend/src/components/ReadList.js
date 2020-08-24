import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

const ReadList = ({ list }) => (
  <div className='readlist-link-box'>
    <Link id='link-to-readlist' className='readlist-link'to={`/list/${list.id}`} >{list.name}</Link>
  </div>
)

ReadList.propTypes = {
  list: PropTypes.object.isRequired
}

export default ReadList

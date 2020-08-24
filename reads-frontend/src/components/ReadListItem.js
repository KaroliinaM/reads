import React from 'react'
import PropTypes from 'prop-types'

const ReadListItem = ({ item }) => (
  <div className="booklist-item-container" >
    <h2 className="title">{item.title}</h2>
    <h3 className="author">{item.authors[0]}</h3>
    <p>{item.description}</p>
  </div>
)

ReadListItem.propTypes = {
  item: PropTypes.object.isRequired
}

export default ReadListItem

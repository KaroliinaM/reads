import React from 'react'
import PropTypes from 'prop-types'

const Notification = ({ message }) => {
  return (
    <div className='notification-container'>
      {message && <p className={message.style}>{message.text}</p>}
    </div>
  )
}

Notification.propTypes = {
  message: PropTypes.string
}

export default Notification

import React from 'react'


const Notification = ({message}) => {
    return (
    <div className='notification-container'>
        {message && <p className={message.style}>{message.text}</p>}
    </div>
    )
}

export default Notification
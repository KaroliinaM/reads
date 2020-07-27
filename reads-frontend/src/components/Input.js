import React from 'react'

const Input = ({id, label, type, value, onChange}) => {
    return(
        <div>
            <div className='form-label'>
            {label}
            </div>
            <input
                className='form-input'
                id={id}
                type={type}
                value={value}
                onChange={onChange}
            />
        </div>

    )

}

export default Input
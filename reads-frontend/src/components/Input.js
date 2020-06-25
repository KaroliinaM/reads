import React from 'react'

const Input = ({label, type, value, onChange}) => {
    return(
        <div>
            <div className='form-label'>
            {label}
            </div>
            <input
                className='form-input'
                type={type}
                value={value}
                onChange={onChange}
            />
        </div>

    )

}

export default Input
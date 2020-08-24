import React from 'react'
import PropTypes from 'prop-types'

const Input = ({ id, label, type, value, onChange }) => {
  return (
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

Input.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired
}

export default Input

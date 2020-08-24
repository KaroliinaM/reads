import React from 'react'
import PropTypes from 'prop-types'

const AddReadListForm = ({ listInput, setListInput, submitForm }) => (
  <form onSubmit={submitForm}>
    <input id='add-list-input' value={listInput} onChange={(e) => setListInput(e.target.value)} />
    <button id='add-list-btn' disabled={listInput.length === 0} type='submit'>Add list</button>
  </form>
)

AddReadListForm.propTypes = {
  listInput: PropTypes.string.isRequired,
  setListInput: PropTypes.func.isRequired,
  submitForm: PropTypes.func.isRequired
}

export default AddReadListForm

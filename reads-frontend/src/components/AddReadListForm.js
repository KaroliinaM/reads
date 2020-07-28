import React from 'react'

const AddReadListForm = ({listInput, setListInput, submitForm}) =>(
    <form onSubmit={submitForm}>
        <input id='add-list-input' value={listInput} onChange={(e) => setListInput(e.target.value)} />
        <button id='add-list-btn' type='submit'>Add list</button>
    </form>
)

export default AddReadListForm
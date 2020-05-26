import React from 'react'

const AddReadListForm = ({listInput, setListInput, submitForm}) =>(
    <form onSubmit={submitForm}>
        <input value={listInput} onChange={(e) => setListInput(e.target.value)} />
        <button type='submit'>Lisää</button>
    </form>
)

export default AddReadListForm
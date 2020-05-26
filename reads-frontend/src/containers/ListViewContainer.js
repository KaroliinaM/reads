import React, {useState, useEffect} from 'react'
import AddReadListForm from '../components/AddReadListForm'

const ListViewContainer = () => {
    const [readLists, setReadLists] = useState([])
    const [listInput, setListInput] = useState('')
    const [inputVisible, setInputVisible] = useState(false)

    useEffect(() => {
        console.log('useEffect')
        fetch('http://localhost:3001/readlists')
        .then(response => response.json())
        .then(data => setReadLists(data))
    }, [])

    const toggleVisibility = () => setInputVisible(!inputVisible)

    const submitForm = (event) => {
        event.preventDefault()
        console.log(listInput)
        const newList = {
            name: listInput
        }
        fetch('http://localhost:3001/readlists', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newList)
        })
        .then(response => response.json())
        .then(data => {
            console.log('data',data)
            setReadLists(readLists.concat(data))
            setListInput('')
        })
        .catch(e => console.log(e))
    } 

    return(
        <>
            <ul>
                {readLists.map(list=>{
                    return<li key={list.id}>{list.name}</li>
                })}
                <button onClick={toggleVisibility}>toggle</button>
                {inputVisible && <AddReadListForm
                    listInput={listInput}
                    setListInput={setListInput}
                    submitForm={submitForm}
                />}
            </ul>
        </>

    )
}

export default ListViewContainer

import React, {useState, useEffect} from 'react'

const ListViewContainer = () => {
    const [readLists, setReadLists] = useState([])
    const [listInput, setListInput] = useState('')

    useEffect(() => {
        console.log('useEffect')
        fetch('http://localhost:3001/readlists')
        .then(response => response.json())
        .then(data => setReadLists(data))
    }, [])

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
                <form onSubmit={submitForm}>
                    <input value={listInput} onChange={(e) => setListInput(e.target.value)} />
                    <button type='submit'>Lisää</button>
                </form>
                {readLists.map(list=>{
                    return<li key={list.id}>{list.name}</li>
                })}
            </ul>
        </>

    )
}

export default ListViewContainer

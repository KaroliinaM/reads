import React, {useState, useEffect} from 'react'
import AddReadListForm from '../components/AddReadListForm'
import ReadList from '../components/ReadList'
import BookService from '../services/BookService'

const ListViewContainer = () => {
    const [readLists, setReadLists] = useState([])
    const [listInput, setListInput] = useState('')
    const [inputVisible, setInputVisible] = useState(false)

    useEffect(() => {
       BookService.getReadLists()
        .then(data => setReadLists(data))
    }, [])

    const toggleVisibility = () => setInputVisible(!inputVisible)

    const submitForm = (event) => {
        event.preventDefault()
        console.log(listInput)
        const newList = {
            name: listInput
        }
        BookService.postNewList(newList)
        .then(data => {
            setReadLists(readLists.concat(data))
            setListInput('')
        })
        .catch(e => console.log(e))
    } 

    return(
        <>
            {readLists.map(list=>{
                return<ReadList key={list.id} list={list} />
            })}
            <button onClick={toggleVisibility}>toggle</button>
            {inputVisible && <AddReadListForm
                listInput={listInput}
                setListInput={setListInput}
                submitForm={submitForm}
            />}
        </>

    )
}

export default ListViewContainer

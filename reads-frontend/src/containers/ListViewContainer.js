import React, {useState, useEffect} from 'react'
import AddReadListForm from '../components/AddReadListForm'
import ReadList from '../components/ReadList'
import BookService from '../services/BookService'

const ListViewContainer = () => {
    const [readLists, setReadLists] = useState([])
    const [listInput, setListInput] = useState('')
    const [inputVisible, setInputVisible] = useState(false)

    useEffect(() => {
        let isMounted=true
       BookService.getReadLists()
        .then(data => {
            if(isMounted)setReadLists(data)
        })
        return ()=> {isMounted=false}
    }, [])

    const toggleVisibility = () => setInputVisible(!inputVisible)

    const submitForm = (event) => {
        event.preventDefault()
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
        <h1 className='listTitle'>Booklists</h1>
        <div className='frontpage-app'>
            {readLists.map(list=>{
                return<ReadList key={list.id} list={list} />
            })}
            <button id='add-list-form-btn' className='readlist-add-button' onClick={toggleVisibility}>Add a list</button>
            {inputVisible && <AddReadListForm
                listInput={listInput}
                setListInput={setListInput}
                submitForm={submitForm}
            />}
        </div>
        </>

    )
}

export default ListViewContainer

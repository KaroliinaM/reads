import React, {useState, useEffect} from 'react'
import AddReadListForm from '../components/AddReadListForm'
import ReadList from '../components/ReadList'
import BookService from '../services/BookService'

const ListViewContainer = () => {
    const [readLists, setReadLists] = useState([])
    const [listInput, setListInput] = useState('')
    const [inputVisible, setInputVisible] = useState(false)

    useEffect(() => {
/*         const loggedUser=window.localStorage.getItem('loggedUser')
        if(loggedUser) {
            const user=JSON.parse(loggedUser)
            console.log(user)
            BookService.setToken(user.token)
            console.log(BookService.token)
        } */
        console.log('haku')
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
        <h1 className='listTitle'>Booklists</h1>
        <div className='frontpage-app'>
            {console.log(readLists)}
            {console.log(BookService.token)}
            {readLists.map(list=>{
                return<ReadList key={list.id} list={list} />
            })}
            <button className='readlist-add-button' onClick={toggleVisibility}>Add a list</button>
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

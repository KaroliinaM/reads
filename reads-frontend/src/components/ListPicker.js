import React from 'react'

const ListPicker = ({readLists, addBookToList}) => {
    return readLists.map(list => {
        return <button key={list.id} onClick={()=>addBookToList(list.id)} >{list.name}</button>
    })
}

export default ListPicker
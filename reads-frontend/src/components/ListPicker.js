import React from 'react'

const ListPicker = ({ readLists, selected, addBookToList }) => {
  const style = (id) => selected === id ? 'btn-listpicker-selected' : 'btn-listpicker'
  return readLists.map(list => {
    return <button className={style(list.id)} key={list.id} onClick={() => addBookToList(list.id)} >{list.name}</button>
  })
}

export default ListPicker

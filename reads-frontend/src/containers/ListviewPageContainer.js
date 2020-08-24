import React from 'react'
import Breadcrumbs from '../components/Breadcrumbs'
import ListviewContainer from './ListViewContainer'

const ListviewPageContainer = () => {
  return (
    <>
      <Breadcrumbs site='readlists' />
      <ListviewContainer />
    </>
  )
}

export default ListviewPageContainer

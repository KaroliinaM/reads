import React from 'react'
import Breadcrumbs from '../components/Breadcrumbs'
import RecommendContainer from './RecommendContainer'

const RecommendPageContainer = () => {
  return (
    <>
      <Breadcrumbs site='recommendations' />
      <RecommendContainer />
    </>
  )
}

export default RecommendPageContainer

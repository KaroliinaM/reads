import React, { useState, useEffect } from 'react'
import SearchBookContainer from './containers/SearchBookContainer'
import SearchBookPageContainer from './containers/SearchBookPageContainer'
import ListViewContainer from './containers/ListViewContainer'
import ListViewPageContainer from './containers/ListviewPageContainer'
import ReadListContainer from './containers/ReadListContainer'
import BookDetailsContainer from './containers/BookDetailsContainer'
import SampleBooksContainer from './containers/SampleBooksContainer'
import RecommendContainer from './containers/RecommendContainer'
import RecommendPageContainer from './containers/RecommendPageContainer'
import RegisterContainer from './containers/RegisterContainer'
import LoginContainer from './containers/LoginContainer'
import PrivateRoute from './components/PrivateRoute'
import Notification from './components/Notification'
import Footer from './components/Footer'
import './form.css'
import BookService from './services/BookService'
import {
  BrowserRouter as Router,
  Switch, Route
} from 'react-router-dom'

const App = () => {
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)

  const setNotification = (notification) => {
    setMessage(notification)
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedUser')
    if (loggedUser) {
      const user = JSON.parse(loggedUser)
      setUser(user)
      BookService.setToken(user.token)
    }
  }, [])

  const logoutClick = () => {
    window.localStorage.removeItem('loggedUser')
    setUser(null)
    BookService.setToken(null)
  }

  return (
    <div className='page-container'>
      {user &&
    <p className='loggedin-user'>{`${user.username} logged in`}<button className='button' onClick={logoutClick}>logout</button></p>}
      <Notification message={message} />
      <Router>
        <Switch>
          <PrivateRoute component={ReadListContainer} path="/list/:id" isAuth={!!user} />
          <PrivateRoute component={ListViewPageContainer} path='/list' isAuth={!!user} />
          <PrivateRoute component={SearchBookPageContainer} path="/etsi" isAuth={!!user} />
          <PrivateRoute component={BookDetailsContainer} path ='/book/details' isAuth={!!user} />
          <PrivateRoute component={SampleBooksContainer} path= '/rate' isAuth={!!user} />
          <PrivateRoute component={RecommendPageContainer} path='/recommendations' isAuth={!!user} />
          <Route path='/register'>
            <RegisterContainer notifyUser={setNotification} />
          </Route>
          <Route path="/">
            {user
              ? (<>
                <SearchBookContainer />
                <ListViewContainer />
                <RecommendContainer />
              </>
              )
              : <LoginContainer setUser={setUser} notifyUser={setNotification} />
            }
          </Route>
        </Switch>
      </Router>
      <Footer />
    </div>
  )
}

export default App

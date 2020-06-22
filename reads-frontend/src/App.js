import React, {useState} from 'react';
import SearchBookContainer from './containers/SearchBookContainer'
import ListViewContainer from './containers/ListViewContainer'
import ReadListContainer from './containers/ReadListContainer'
import BookDetailsContainer from './containers/BookDetailsContainer'
import SampleBooksContainer from './containers/SampleBooksContainer'
import RecommendContainer from './containers/RecommendContainer'
import RegisterContainer from './containers/RegisterContainer'
import LoginContainer from './containers/LoginContainer'
import PrivateRoute from './components/PrivateRoute'
//import BookService from './services/BookService'
import {
  BrowserRouter as Router,
  Switch, Route, Link, Redirect
} from "react-router-dom"

const App =()=> {
  const [user, setUser]=useState(null)


return(
  <Router>
    <div>
      <Link to="/">Listat</Link>
      <Link to="/etsi">etsi</Link>
      <Link to="/rate">rate</Link>
      <Link to="/list">listoja</Link>
      <Link to="/recommendations">suositukset</Link>
    </div>
    <Switch>
      <PrivateRoute component={ReadListContainer} path="/list/:id" isAuth={!!user} />
      <PrivateRoute component={ListViewContainer} path='/list' isAuth={!!user} />
      <PrivateRoute component={SearchBookContainer} path="/etsi" isAuth={!!user} />
      <PrivateRoute component={BookDetailsContainer} path ='/book/:id' isAuth={!!user} />
      <PrivateRoute component={SampleBooksContainer} path= '/rate' isAuth={!!user} />
      <PrivateRoute component={RecommendContainer} path='/recommendations' isAuth={!!user} />
      <Route path='/register'>
        <RegisterContainer />
      </Route>
      <Route path='/login'>
        <LoginContainer setUser={setUser} />
      </Route>
      <Route path="/">
        {user ? 
          (<>
            <SearchBookContainer />
            <ListViewContainer  />
            <RecommendContainer />
          </>
          ): <Redirect to='/login' />}
      </Route>
    </Switch>
  </Router>
)}

export default App;

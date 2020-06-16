import React, {useState} from 'react';
import SearchBookContainer from './containers/SearchBookContainer'
import ListViewContainer from './containers/ListViewContainer'
import ReadListContainer from './containers/ReadListContainer'
import BookDetailsContainer from './containers/BookDetailsContainer'
import SampleBooksContainer from './containers/SampleBooksContainer'
import RecommendContainer from './containers/RecommendContainer'
import RegisterContainer from './containers/RegisterContainer'
import LoginContainer from './containers/LoginContainer'
import {
  BrowserRouter as Router,
  Switch, Route, Link
} from "react-router-dom"

const App =()=> {
  const [user, setUser]=useState(null)


return(
  <Router>
    <div>
      <Link to="/">Listat</Link>
      <Link to="/etsi">etsi</Link>
    </div>
    <Switch>
      <Route path="/list/:id">
        <ReadListContainer />
      </Route>
      <Route path="/etsi">
        <SearchBookContainer />
      </Route>
      <Route path ='/book/:id'>
        <BookDetailsContainer />
      </Route>
      <Route path= '/rate'>
        <SampleBooksContainer />
      </Route>
      <Route path='/recommendations'>
        <RecommendContainer />
      </Route>
      <Route path='/register'>
        <RegisterContainer />
      </Route>
      <Route path="/">
        {user && <ListViewContainer />}
        {!user && <LoginContainer setUser={setUser} />}
      </Route>
    </Switch>
  </Router>
)}

export default App;

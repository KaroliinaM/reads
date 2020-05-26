import React from 'react';
import SearchBookContainer from './containers/SearchBookContainer'
import ListViewContainer from './containers/ListViewContainer'
import ReadListContainer from './containers/ReadListContainer'
import {
  BrowserRouter as Router,
  Switch, Route, Link
} from "react-router-dom"

const App =()=> {


return(
  <Router>
    <div>
      <Link to="/">Listat</Link>
      <Link to="/etsi">etsi</Link>
    </div>
    <Switch>
      <Route path="/etsi">
        <SearchBookContainer />
      </Route>
      <Route path="/">
        <ListViewContainer />
      </Route>
    </Switch>
  </Router>
)}

export default App;

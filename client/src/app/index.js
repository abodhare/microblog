import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import { NavBar } from '../components'
import { UsersList, UsersInsert, UsersUpdate } from '../pages';

import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
    return (
        <Router>
            <NavBar />
            <Switch>
              <Route path="/users/list" exact component={UsersList} />
              <Route path="/users/create" exact component={UsersInsert} />
              <Route
                path="/users/update/:id"
                exact
                component={UsersUpdate}
              />
            </Switch>
        </Router>
    )
}

export default App
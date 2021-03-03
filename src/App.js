

import React from 'react';
import './App.css';

// menggunkan framework css bootstrap
import "bootstrap/dist/css/bootstrap.min.css";

// menggunakan fungsi yang diimport dari react router dom
import { Route, Switch, Link } from 'react-router-dom';

// import modul from components
import AddTutorial from './components/AddTutorials';
import Tutorial from './components/Tutorial';
import TutorialsList from './components/TutorialsList';

function App() {
  return (
    <div>
      <nav className="navbar navbar-expand navbar-light bg-primary">
        <div className="container">
          <a href="/tutorials" className="navbar-brand">
            SangSloop
        </a>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to="/tutorials" className="nav-link">
                Tutorials
            </Link>
            </li>
            <li className="nav-item">
              <Link to="/add" className="nav-link">
                Add
            </Link>
            </li>
          </div>
        </div>
      </nav>

      <div className="container mt-3">
        <Switch>
          <Route exact path="/tutorials" component={TutorialsList} />
          <Route exact path="/add" component={AddTutorial} />
          <Route path="/tutorials/:id" component={Tutorial} />
        </Switch>
      </div>

    </div>
  );
}


export default App;

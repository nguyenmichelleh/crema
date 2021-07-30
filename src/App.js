import './App.css';
import React from 'react';
import Form from "./components/Form";
import Profile from "./components/Profile";
import firebase from 'firebase';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"; 
import { useState, useEffect } from 'react';


function App() {
  

  return (
    <div className="App">
      <header className="App-header">
        <h1>Crema</h1>

      
      <Router>

        <nav>
          <Link to="/"> Home </Link>
          <Link to="/signin"> Sign In </Link>
          <Link to="/cremacal"> CremaCal </Link>
          <Link to="/mycrema"> MyCrema </Link>
        </nav>

        <Switch>
          <Route path="/signin" exact component={Form} />
          <Route path="/mycrema" exact component={Profile} />
        </Switch>

      </Router>


      </header>
    </div>
  );
}

export default App;

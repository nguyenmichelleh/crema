import './App.css';
import React from 'react';
import Form from "./components/Form";
import Profile from "./components/Profile";
import Calendar from "./components/Calendar";
import firebase from 'firebase';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"; 
import { createContext, useContext, useState } from 'react';
import { UserContext, useUser, UserContextProvider} from "./context/userContext"

// define outside of App so that Navbar def is not recreated each render
// useUser allows different parts of your application to listen for changes to the user
// useUser lets you subscribe to changes in the user
// creates a notification and rerendering 
// comparable to an event listener
// will only listen to a change in user

const Navbar = () => {
  const [user] = useUser();

  return (
    <div>{user === null ? "Logged out" : `Hello ${user.firstName} :)`}</div>

  );
};



function App() {  

  return (
    <UserContextProvider>
      <div className="App">
        <header className="App-header">
          <h1>Crema</h1>
        
        <Router>

        <Navbar/>

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
    </UserContextProvider>
  );
}

export default App;

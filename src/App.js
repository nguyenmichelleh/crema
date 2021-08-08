import './App.css';
import React from 'react';
import Home from "./components/Home"
import SignInForm from "./components/SignInForm";
import Profile from "./components/Profile";
import Calendar from "./components/Calendar";
import firebase from 'firebase';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"; 
import { createContext, useContext, useState } from 'react';
import { UserContext, useUser, UserContextProvider} from "./context/userContext"
import {Navbar, Nav, Container, Button, NavItem} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


// define outside of App so that Navbar def is not recreated each render
// useUser allows different parts of your application to listen for changes to the user
// useUser lets you subscribe to changes in the user
// creates a notification and rerendering 
// comparable to an event listener
// will only listen to a change in user


function App() {  

  // set persistence if you don't want refresh to sign you out
  console.log(firebase.auth().currentUser)

  return (
    <UserContextProvider>
      <div className="App">
        <header className="App-header">
        
        <Router>

          <div className="navbarFormat">
            <h3>CREMA</h3>
            <Navbar>
              <Nav>
                <NavItem><Nav.Link as={Link} to="/"> Home </Nav.Link></NavItem>
                <NavItem><Nav.Link as={Link} to="/signin"> Sign In </Nav.Link></NavItem>
                <NavItem><Nav.Link as={Link} to="/cremacal"> CremaCal </Nav.Link></NavItem>
                <NavItem><Nav.Link as={Link} to="/mycrema"> MyCrema </Nav.Link></NavItem>
                {/* <Link to="/mycrema"> MyCrema </Link> */}
                </Nav>
            </Navbar>
          </div>

          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/signin" exact component={SignInForm} />
            <Route path="/mycrema" exact component={Profile} />
            <Route path="/cremacal" exact component={Calendar} />
          </Switch>

        </Router>

        </header>
      </div>
    </UserContextProvider>
  );
}

export default App;

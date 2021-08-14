import './App.css';
import React from 'react';
import Home from "./components/Home"
import SignInForm from "./components/SignInForm";
import Profile from "./components/Profile";
import Calendar from "./components/Calendar";
import LoggedInNavbar from "./components/LoggedInNavbar";
import LoggedOutNavbar from "./components/LoggedOutNavbar"
import firebase from 'firebase';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"; 
import { useEffect, createContext, useContext, useState } from 'react';
import { UserContext, useUser, UserContextProvider} from "./context/userContext"
import {Navbar, Nav, Container, Button, NavItem} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Modal from 'react-modal';


// define outside of App so that Navbar def is not recreated each render
// useUser allows different parts of your application to listen for changes to the user
// useUser lets you subscribe to changes in the user
// creates a notification and rerendering 
// comparable to an event listener
// will only listen to a change in user

const ConditionalNavbar = () => {

  // const [user] = useUser();
  const[currentUser, setUser] = useUser()

  useEffect (() => {

    firebase.auth().onAuthStateChanged(function(user) {
      console.log(`onAuthStateChanged ${JSON.stringify(user)}`)
      // if user !== null (which means Firebase knows Mariela is signed in)
      // then sign in Mariela via the app

      if (user !== null) { // firebase user state

      const dbRef = firebase.database().ref(); // all app sign in for user
      dbRef.child("users").child(user.uid).get().then((snapshot) => {
        if (snapshot.exists()) {

            const userSnapshot = snapshot.val()
            userSnapshot["UID"] = user.uid
            setUser(userSnapshot)

      };
      
    })

      }
    })}, []) // alternative is setUser

  return (

      <div>{ currentUser === null ? <LoggedOutNavbar/> : <LoggedInNavbar/>}</div> // if things start to misalign reinstantiate user and pass here as currentUser

  )
  
}




function App() {  

  // set persistence if you don't want refresh to sign you out
  console.log(firebase.auth().currentUser)

  return (

    <UserContextProvider>
      <div className="App">
        <header className="App-header">
          <h3 className="cremaTitle">CREMA ☺</h3>

            <div className="navbarFormat">
              <ConditionalNavbar/>
            </div>

          </header>
      </div>
    </UserContextProvider>

  )

  // return (
  //   <UserContextProvider>
  //     <div className="App">
  //       <header className="App-header">
        
  //       <Router>

  //         <h3 className="cremaTitle">CREMA ☺</h3>

  //         <div className="navbarFormat">
  //           <Navbar>
  //             <Nav className="ml-auto">
  //               <NavItem><Nav.Link as={Link} to="/"> Home  </Nav.Link></NavItem>
  //               <NavItem><Nav.Link as={Link} to="/signin"> Sign In  </Nav.Link></NavItem>
  //               <NavItem><Nav.Link as={Link} to="/cremacal"> CremaCal  </Nav.Link></NavItem>
  //               <NavItem><Nav.Link as={Link} to="/mycrema"> MyCrema  </Nav.Link></NavItem>
  //               {/* <Link to="/mycrema"> MyCrema </Link> */}
  //               </Nav>
  //           </Navbar>
  //         </div>

  //         <Switch>
  //           <Route path="/" exact component={Home} />
  //           <Route path="/signin" exact component={SignInForm} />
  //           <Route path="/mycrema" exact component={Profile} />
  //           <Route path="/cremacal" exact component={Calendar} />
  //         </Switch>

  //       </Router>

  //       </header>
  //     </div>
  //   </UserContextProvider>
  // );
}

export default App;

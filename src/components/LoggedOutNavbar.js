// import './App.css';
import React from 'react';
import Home from "./Home";
import About from "./About";
import SignInForm from "./SignInForm";
import Profile from "./Profile";
import Calendar from "./Calendar";
import { UserContext, useUser, UserContextProvider} from "../context/userContext"
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"; 
import {Navbar, Nav, Container, Button, NavItem} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const LoggedOutNavbar = () => {

return (
  <Router>

  <Navbar>
    <Nav className="ml-auto">
      <NavItem><Nav.Link as={Link} to="/"> Home  </Nav.Link></NavItem>
      <NavItem><Nav.Link as={Link} to="/about"> About  </Nav.Link></NavItem>
      <NavItem><Nav.Link as={Link} to="/signin"> Sign In  </Nav.Link></NavItem>
      {/* <Link to="/mycrema"> MyCrema </Link> */}
      </Nav>
  </Navbar>

  <Switch>
    <Route path="/" exact component={Home} />
    <Route path="/about" exact component={About} />
    <Route path="/signin" exact component={SignInForm} />
  </Switch>

</Router>

)

};


export default LoggedOutNavbar;

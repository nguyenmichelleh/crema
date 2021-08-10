// import './App.css';
import React from 'react';
import Home from "./Home"
import SignInForm from "./SignInForm";
import Profile from "./Profile";
import Calendar from "./Calendar";
import { UserContext, useUser, UserContextProvider} from "../context/userContext"
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"; 
import {Navbar, Nav, Container, Button, NavItem} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const LoggedInNavbar = () => {

return (
  <Router>

  <Navbar>
    <Nav className="ml-auto">
      <NavItem><Nav.Link as={Link} to="/"> Home  </Nav.Link></NavItem>
      <NavItem><Nav.Link as={Link} to="/cremacal"> CremaCal  </Nav.Link></NavItem>
      <NavItem><Nav.Link as={Link} to="/mycrema"> MyCrema  </Nav.Link></NavItem>
      <NavItem><Nav.Link as={Link} to="/signin"> Sign Out  </Nav.Link></NavItem>
      {/* <Link to="/mycrema"> MyCrema </Link> */}
      </Nav>
  </Navbar>

  <Switch>
    <Route path="/" exact component={Home} />
    <Route path="/signin" exact component={SignInForm} />
    <Route path="/mycrema" exact component={Profile} />
    <Route path="/cremacal" exact component={Calendar} />
  </Switch>

</Router>

)

};


export default LoggedInNavbar;

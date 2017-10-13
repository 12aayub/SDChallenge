import React, { Component } from 'react';
import {
  Nav,
  Navbar,
  NavItem,
  MenuItem
} from 'react-bootstrap'


class NavBar extends Component {

  render() {
    return (
        <Navbar collapseOnSelect>
           <Navbar.Header  >
             <Navbar.Brand >
               <a href="/">SDChallenge</a>
             </Navbar.Brand>
             <Navbar.Toggle />
           </Navbar.Header>
           <Navbar.Collapse>
             <Nav pullRight>
               <NavItem eventKey={1} href="/signup">
                  <span className="glyphicon glyphicon-user"></span>
                  Sign Up
                </NavItem>
               <NavItem eventKey={2} href="/login">
                  <span className="glyphicon glyphicon-log-in"></span>
                  Login
                </NavItem>
             </Nav>
           </Navbar.Collapse>
         </Navbar>

    );
  }
}

export default NavBar;

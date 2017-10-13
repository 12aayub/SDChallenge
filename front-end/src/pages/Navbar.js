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
               <MenuItem eventKey={1} href="/signup">
                  <span className="glyphicon glyphicon-user"></span>
                  Sign Up
                </MenuItem>
               <MenuItem eventKey={2} href="/login">
                  <span className="glyphicon glyphicon-log-in"></span>
                  Login
                </MenuItem>
             </Nav>
           </Navbar.Collapse>
         </Navbar>

    );
  }
}

export default NavBar;

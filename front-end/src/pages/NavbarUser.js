import React, { Component } from 'react';
import {
  Nav,
  Navbar,
  NavItem,
  MenuItem
} from 'react-bootstrap'


class NavBarUser extends Component {

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
             <Nav>
               <NavItem eventKey={1} href="/">Challenges</NavItem>
               <NavItem eventKey={2} href="/profile">My Profile</NavItem>
             </Nav>
             <Nav pullRight>
               <NavItem eventKey={2} href="#">
                  <span className="glyphicon glyphicon-log-out"></span>
                  Sign Out
                </NavItem>
             </Nav>
           </Navbar.Collapse>
         </Navbar>

    );
  }
}

export default NavBarUser;

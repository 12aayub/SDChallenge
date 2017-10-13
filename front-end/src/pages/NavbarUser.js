import React, { Component } from 'react';
import {
  Nav,
  Navbar,
  NavItem,
  MenuItem
} from 'react-bootstrap'


class NavBarUser extends Component {

  handleLogout(){
    this.props.onSubmit()
  }

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
               <MenuItem eventKey={1} href="/">Challenges</MenuItem>
               <MenuItem eventKey={2} href="/profile">My Profile</MenuItem>
             </Nav>
             <Nav pullRight>
               <NavItem eventKey={2} onClick={this.handleLogout.bind(this)}
               id="submit">
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

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
           <img id = "locationIcon2" src = '../locationIcon.png' alt = 'locationIcon'/>
             <Navbar.Brand >
               <a href="/">SDChallenge</a>
             </Navbar.Brand>
             <Navbar.Toggle />
           </Navbar.Header>
           <Navbar.Collapse>
             <Nav>
               <MenuItem eventKey={1} href="/">Challenges</MenuItem>
               <MenuItem eventKey={2} href="/profile">My Profile</MenuItem>
               {
                 this.props.user && (this.props.user.email=="admin@example.com") &&
                 <MenuItem eventKey={3} href="/addactivity">Add Activity</MenuItem>
               }
             </Nav>
             <Nav pullRight>
               <NavItem eventKey={2} onClick={this.props.onSubmit.bind(this)}
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

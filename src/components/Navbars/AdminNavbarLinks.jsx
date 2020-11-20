import React, { Component } from "react";
import { NavItem, Nav } from "react-bootstrap";

import Account from "./Account";
import LogOut from "./Logout";

class AdminNavbarLinks extends Component {
  render() {
    // const notification = (
    //   <div>
    //     <i className="fa fa-globe" />
    //     <b className="caret" />
    //     <span className="notification">5</span>
    //     <p className="hidden-lg hidden-md">Notification</p>
    //   </div>
    // );
    return (
      <div>
        <Nav>
          <NavItem eventKey={1} href="#">
            <i className="fa fa-dashboard" />
            <p className="hidden-lg hidden-md">ElectronicHack Dashboard</p>
          </NavItem>
          {/* <NavItem eventKey={3} href="#">
            <i className="fa fa-search" />
            <p className="hidden-lg hidden-md">Search</p>
          </NavItem> */}
        </Nav>
        <Nav pullRight>
          <NavItem eventKey={1} href="#">
            <Account></Account>
          </NavItem>
          {/* <NavDropdown eventKey={2} title="Dropdown" id="basic-nav-dropdown-right">
            <MenuItem eventKey={2.1}>Action</MenuItem>
            <MenuItem eventKey={2.2}>Another action</MenuItem>
            <MenuItem eventKey={2.3}>Something</MenuItem>
            <MenuItem eventKey={2.4}>Another action</MenuItem>
            <MenuItem eventKey={2.5}>Something</MenuItem>
            <MenuItem divider />
            <MenuItem eventKey={2.5}>Separated link</MenuItem>
          </NavDropdown> */}
          <NavItem eventKey={3} href="#">
            <LogOut></LogOut>
          </NavItem>
        </Nav>
      </div>
    );
  }
}

export default AdminNavbarLinks;

import React, { Component } from "react";
import { connect } from "react-redux";
import { Button } from "reactstrap";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  Container,
  UncontrolledDropdown,
  NavLink,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import { logUserOut } from "../actions";

class NavBarComponent extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.toggleButton = this.toggleButton.bind(this);

    this.state = {
      isOpen: false,
      dropdownOpen: false
    };
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  toggleButton() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  _renderLoginOrLogout() {
    const { isAuth, logUserOut, profile } = this.props;
    if (isAuth) {
      return (
        <UncontrolledDropdown
          nav
          inNavbar
          isOpen={this.state.dropdownOpen}
          toggle={this.toggleButton}
        >
          <DropdownToggle caret color="primary">
            Welcome, {profile.name}
          </DropdownToggle>
          <DropdownMenu right>
            <DropdownItem header>Header</DropdownItem>
            <DropdownItem>View Profile</DropdownItem>
            <DropdownItem divider />
            <DropdownItem onClick={() => logUserOut()}>Logout</DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      );
    }
    return (
      <Nav>
        <NavItem>
          <NavLink href="/login">Login</NavLink>
        </NavItem>
        <NavItem>
          <NavLink />
        </NavItem>
        <NavItem>
          <Button color="success" href="/signup">
            Sign Up
          </Button>
        </NavItem>
      </Nav>
    );
  }
  render() {
    return (
      <div>
        <Navbar color="dark" dark expand="md">
          <Container>
            <NavbarBrand href="/">Home</NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="ml-auto" navbar>
                {this._renderLoginOrLogout()}
              </Nav>
            </Collapse>
          </Container>
        </Navbar>
      </div>
    );
  }
}
const mapStateToProps = ({ auth }) => {
  return {
    isAuth: auth.isAuth,
    profile: auth.profile
  };
};
const NavBar = connect(
  mapStateToProps,
  { logUserOut }
)(NavBarComponent);
export { NavBar };

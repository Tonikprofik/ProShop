import React from "react";
//rafce
import {useDispatch, useSelector} from 'react-redux'
import { LinkContainer } from "react-router-bootstrap";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { logout } from "../actions/userActions";

const Header = () => {
  const dispatch = useDispatch()
  
  const userLogin = useSelector( state => state.userLogin)
  const { userInfo } = userLogin

  const logoutHandler = () => {
    dispatch(logout())
    //console.log('logout')
  }

  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>

          <LinkContainer to="/">
            <Navbar.Brand>Proshop</Navbar.Brand>
          </LinkContainer>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">

              <LinkContainer to="/cart">
                <Nav.Link>
                  <i className="fas fa-shopping-cart"></i>Cart
                </Nav.Link>
                
              </LinkContainer>

              {/* user name/logout  */}
              {userInfo ? (
                <NavDropdown title={userInfo.name} id='username'>
                  
                  <LinkContainer to='/profile'>
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  
                  <NavDropdown.Item onClick={logoutHandler}>Log out</NavDropdown.Item>

                </NavDropdown>
              ): <LinkContainer to="/login">
                <Nav.Link>
                  <i className="fas fa-user"></i>Sign In
                </Nav.Link>
              </LinkContainer>}

              
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;

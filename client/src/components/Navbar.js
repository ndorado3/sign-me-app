import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <Navbar bg="dark" variant="dark">
      <Nav className="me-auto">
        <Nav.Link as={Link} to="/">
          Register
        </Nav.Link>
        <Nav.Link as={Link} to="/LogIn">
          Log In
        </Nav.Link>
        <Nav.Link as={Link} to="/Account">
          Account
        </Nav.Link>
      </Nav>
    </Navbar>
  );
};

export default NavBar;

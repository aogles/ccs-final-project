import { Navbar, Nav, Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const UnauthenticatedHeader = () => {
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="#home">Home</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          <NavLink to="/registration">Register</NavLink>
          <NavLink to="/login">Login</NavLink>
          {/* <NavLink to="/InformationForm">Create your own Article</NavLink> */}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default UnauthenticatedHeader;

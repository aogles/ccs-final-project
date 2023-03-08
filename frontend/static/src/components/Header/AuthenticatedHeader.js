import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Navbar, Nav, Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const AuthenticatedHeader = () => {
  const { logout } = useContext(AuthContext);
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          <NavLink to="/login">Login</NavLink>
          <NavLink to="/registration">Register</NavLink>
          {/* <NavLink to="/InformationForm">Create your own Article</NavLink> */}
          <NavLink to="/">Home</NavLink>
          <NavLink to="nav">Navigation</NavLink>

          <Button onClick={logout}>Logout</Button>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default AuthenticatedHeader;

import { Navbar, Nav, Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";

const UnauthenticatedHeader = () => {
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand className="registrationheader"></Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          <NavLink id="registerlink" to="/registration">
            Register
          </NavLink>
          <NavLink id="loginlink" to="/login">
            Login
          </NavLink>

          <NavLink id="homelink" to="/">
            <FontAwesomeIcon icon={faHouse} />
          </NavLink>

          {/* <NavLink to="/InformationForm">Create your own Article</NavLink> */}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default UnauthenticatedHeader;

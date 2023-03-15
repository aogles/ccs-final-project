import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Navbar, Nav, Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const AuthenticatedHeader = () => {
  const { logout } = useContext(AuthContext);
  return (
    <Navbar id="navbar" bg="dark" expand="lg">
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          <FontAwesomeIcon icon="fa-regular fa-star" />
          <Button>
            <NavLink to="/login">Login</NavLink>
          </Button>

          <Button>
            <NavLink to="/registration">Register</NavLink>
          </Button>

          {/* <NavLink to="/InformationForm">Create your own Article</NavLink> */}
          <Button>
            <NavLink to="/">Home</NavLink>
          </Button>

          <Button>
            <NavLink to="nav">Navigation</NavLink>
          </Button>

          <Button>
            <NavLink to="info">Convoy Information</NavLink>
          </Button>

          <Button>
            <NavLink to="comms">Convoy Chat</NavLink>
          </Button>

          <Button onClick={logout}>Logout</Button>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default AuthenticatedHeader;

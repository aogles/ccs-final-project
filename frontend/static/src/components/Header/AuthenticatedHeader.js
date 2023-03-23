import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Navbar, Nav, Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

const AuthenticatedHeader = () => {
  const { logout } = useContext(AuthContext);
  return (
    <Navbar id="navbar" bg="dark" expand="lg">
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          <h1>
            <span>☆ </span>U.S ARMY
          </h1>

          {/* <NavLink to="/InformationForm">Create your own Article</NavLink> */}

          <NavLink id="navlinks" to="/">
            Home
          </NavLink>

          <NavLink id="navlinks" to="nav">
            Navigation
          </NavLink>

          <NavLink id="navlinks" to="convoys">
            Convoy Information
          </NavLink>

          <NavLink id="navlinks" to="comms">
            Convoy Chat
          </NavLink>

          <Button onClick={logout}>Logout</Button>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default AuthenticatedHeader;

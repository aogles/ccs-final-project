import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Navbar, Nav, Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import Container from "react-bootstrap/esm/Container";

const AuthenticatedHeader = () => {
  const { logout } = useContext(AuthContext);
  return (
    <>
      <h1 to="/">
        <span>☆ </span>U.S ARMY
      </h1>
      <Navbar id="navbar" expand="lg">
        <Navbar.Toggle
          id="navtoggle"
          aria-controls="basic-navbar-nav"
          className="ms-1"
        />
        <Navbar.Collapse id="basic-navbar-nav" className="mt-5">
          <Nav className="m-auto">
            {/* <NavLink to="/InformationForm">Create your own Article</NavLink> */}
            <NavLink id="navlinks" to="convoys">
              Information
            </NavLink>
            <NavLink id="navlinks" to="nav">
              Navigation
            </NavLink>

            <NavLink id="navlinks" to="comms">
              Communications
            </NavLink>

            <Button
              className="logoutbutton w-25 m-auto"
              id="logoutbutton"
              onClick={logout}
            >
              Logout
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};

export default AuthenticatedHeader;

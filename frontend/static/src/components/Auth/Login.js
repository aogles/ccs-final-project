import { useState, useContext } from "react";

import { Navigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import { AuthContext } from "../../context/AuthContext";

const INITIAL_STATE = {
  username: "",
  password: "",
  email: "",
};

const LoginForm = () => {
  const { isAuth, login } = useContext(AuthContext);
  const [user, setUser] = useState(INITIAL_STATE);

  const handleInput = (event) => {
    const { name, value } = event.target;
    setUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleError = (err) => {
    console.warn(err);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(user);
    login(user);
  };

  if (isAuth) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <div className="loginPage">
        <h1>Welcome to Convoy Commander</h1>
        <div className="loginForm">
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter username"
                name="username"
                value={user.username}
                onChange={handleInput}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                name="email"
                value={user.email}
                onChange={handleInput}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                name="password"
                value={user.password}
                onChange={handleInput}
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Login
            </Button>

            <p>
              Don't have an account? Click
              <NavLink to="/register">here</NavLink>
              to register.
            </p>
          </Form>
        </div>
      </div>
    </>
  );
};

export default LoginForm;

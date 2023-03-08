import { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Navigate } from "react-router-dom";

const RegistrationForm = () => {
  const { isAuth, registration } = useContext(AuthContext);
  const [error, setError] = useState(null);
  const [user, setUser] = useState({
    username: "",
    email: "",
    password1: "",
    password2: "",
  });

  const handleInput = (event) => {
    const { name, value } = event.target;
    setUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    console.log("firing");
    event.preventDefault();
    if (user.password1 === user.password2) {
      console.log(user);
      registration(user);
    } else {
      setError("passwords do not match!");
    }
    if (isAuth) {
      return <Navigate to="/login" />;
    }

    // const options = {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //     "X-CSRFToken": Cookies.get("csrftoken"),
    //   },
    //   body: JSON.stringify(user),
    // };
    // const response = await fetch("/dj-rest-auth/registration/", options).catch(
    //   handleError
    // );
    // if (!response.ok) {
    //   throw new Error("Network response was not ok!");
    // }
    // const data = await response.json();
    // Cookies.set("Authorization", `Token ${data.key}`);
    // navigate("/login");
  };

  return (
    <>
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

        <Form.Group className="mb-3" controlId="formBasicPassword1">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            name="password1"
            value={user.password1}
            onChange={handleInput}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword2">
          <Form.Label>Please Verify Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Verify password"
            name="password2"
            value={user.password2}
            onChange={handleInput}
            required
          />
          <div style={{ color: "red" }}>{error}</div>
        </Form.Group>

        <Button className="register-button" variant="primary" type="submit">
          Register
        </Button>
      </Form>
    </>
  );
};

export default RegistrationForm;

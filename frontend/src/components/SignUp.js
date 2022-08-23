import React, { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import MainScreen from "./MainScreen";
import { Link } from "react-router-dom";
import "./SignUp.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const submitHandler = async (e) => {
    e.preventDefault();

    if (!name || !email || !password || !confirmpassword) {
      return;
    }
    if (password !== confirmpassword) {
      return;
    }
    console.log(name, email, password);
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        "api/signup",
        {
          name,
          email,
          password,
        },
        config
      );
      console.log(data);
      // <Navigate to="/" />;

      localStorage.setItem("userInfo", JSON.stringify(data));
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <MainScreen title="REGISTER">
      <div className="loginContainer">
        <Form onSubmit={submitHandler}>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="name"
              value={name}
              placeholder="Enter name"
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              value={email}
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={password}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="confirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              value={confirmpassword}
              placeholder="Confirm Password"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Form.Group>

          {/* {picMessage && (
            <ErrorMessage variant="danger">{picMessage}</ErrorMessage>
          )} */}

          <Form.Group className="mb-3" controlId="formFileSm">
            <Form.Label>Profile Picture</Form.Label>
          </Form.Group>

          <Button className="mt-2" variant="primary" type="submit">
            Register
          </Button>
        </Form>
        <Row className="py-3">
          <Col>
            Have an Account ? <Link to="/signin">Login</Link>
          </Col>
        </Row>
      </div>
    </MainScreen>
  );
}

export default SignUp;

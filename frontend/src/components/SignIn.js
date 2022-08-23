import { Button, Col, Form, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import MainScreen from "./MainScreen";
import "./SignIn.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const LoginScreen = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      return;
    }

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.post(
        "api/login",
        { email, password },
        config
      );

      localStorage.setItem("userInfo", JSON.stringify(data));
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <MainScreen title="LOGIN">
      <div className="loginContainer">
        <Form onSubmit={submitHandler}>
          <Form.Group className="mb-3" controlId="formPlaintextEmail">
            <Form.Label column sm="2">
              Email Address
            </Form.Label>
            <Col sm="8">
              <Form.Control
                value={email}
                type="email"
                placeholder="Enter Your Email Address"
                onChange={(e) => setEmail(e.target.value)}
              />
            </Col>
          </Form.Group>

          <Form.Group className="mb-4" controlId="formPlaintextPassword">
            <Form.Label column sm="2">
              Password
            </Form.Label>
            <Col sm="8">
              <Form.Control
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
              />
            </Col>
          </Form.Group>

          <Button className="ml-3" variant="primary" type="submit">
            Submit
          </Button>
        </Form>

        <Row className="py-3 ml-0">
          <Col>
            New User ? <Link to="/signup">Register Here</Link>
          </Col>
        </Row>
      </div>
    </MainScreen>
  );
};

export default LoginScreen;

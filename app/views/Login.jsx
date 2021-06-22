import React, { useState } from "react";
import Layout from "./shared/Layout";
import { Form, Button, Container, Alert } from "react-bootstrap";

const Login = (props) => {
  console.log("Loginnn");
  console.log(props);

  const { user, logErr, retainedDetails } = props;
  console.log('LOGIN ... empty');
  console.log(user, logErr, retainedDetails);

  //check ?? - If there is an input before submitting else empty string
  const [email, setEmail] = useState(retainedDetails[0]?? '');
  const [password, setPassword] = useState(retainedDetails[1]??'');

 
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    console.log(event.target.value);

    switch (name) {
      case "email":
        setEmail(value);
        break;
      case "password":
        setPassword(value);
        break;
        default:
    }
  }

  
  return (
    <Layout user={user}>
      <>
        <Container fluid="md">
          <Form
            className="border rounded p-5 mt-5"
            method="POST"
            action="login"
            id="loginForm"
          >
            <h1>LOGIN</h1>
            {logErr && logErr.map((err) => (
              <Alert variant="danger" key={err}>
                {err}
              </Alert>
            )) }

            <Form.Group controlId="formBasicEmail">
              <Form.Label size="lg">Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                name="email"
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                name="password"
                onChange={handleInputChange}
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Container>
      </>
    </Layout>
  );
};
export default Login;

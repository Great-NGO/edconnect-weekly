import React, { useState } from "react";
import Layout from "./shared/Layout";
import { Form, Button, Container, Alert } from "react-bootstrap";
// import { useHistory } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState([]);
//   const history = useHistory();

  const handleFormSubmit = (evt) => {
    evt.preventDefault();

    console.log("OKKKKKKKKKK");

    const formData = {
      email: email,
      password: password,
    };

    fetch("/api/login", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(async (resp) => {
        let data = await resp.json();

        console.log(formData);

        if (resp.status === 200) {
          console.log("Login Success: ", data);
          document.cookie = `uid=${data.data.id};path=/`;
        //   history.push("/");
          window.location.href = "/";
          return resp;
        } else if (resp.status !== 200) {
          console.log(resp.errors);
          setError("Invalid email/password");
        }
      })
      .catch((err) => {
        console.log(`Submission error: ${err}`);
      });
  };

  return (
    <Layout>
      <>
        <Container fluid="md">
          <Form className="border rounded p-5 mt-5" onSubmit={handleFormSubmit}>
            <h1>LOGIN</h1>
            {error.length > 1 ? (
              <Alert variant="danger" key={error}>
                {error}
              </Alert>
            ) : null}
            <Form.Group controlId="formBasicEmail">
              <Form.Label size="lg">Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                name="email"
                onChange={(evt) => {
                  setEmail(evt.target.value);
                  console.log(evt.target.value);
                }}
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                name="password"
                onChange={(evt) => {
                  setPassword(evt.target.value);
                  console.log(evt.target.value);
                }}
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

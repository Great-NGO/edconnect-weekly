import React, { useState, useEffect } from "react";
import Layout from "./shared/Layout";
import { Form, Col, Button, Container, Alert } from "react-bootstrap";
import { useHistory } from "react-router-dom";

//Three fetch is done, the first two is to get the list of program and graduation years from their respective APIs to populate our sign up form select tag, the next is to extract input and make a post request
const Signup = () => {
  //First Fetch request - Program Data, which returns a list of programs. It is put in a useEffect so it runs only once
  const [programData, setProgramData] = useState([]);

  //Second Fetch request - Graduation Years Data, which returns a list of graduation years. It is put in a useEffect so it runs only once
  const [gradYearData, setGradYearData] = useState([]);

  useEffect(() => {
    fetch("/api/programs")
      .then((response) => response.json())
      .then((data) => {
        console.log("The returned list of Programs for the fetch are: " + data);
        setProgramData(data);
      })
      .catch((err) => console.log("Program Data error is: " + err));

    fetch("/api/graduationYears")
      .then((response) => response.json())
      .then((data) => {
        console.log(
          "The returned list of Graduation Years from the graduationYears API are: ",
          data
        );
        setGradYearData(data);
      })
      .catch((err) => console.log("Graduation Year error is: " + err));
  }, []);

  const [state, setState] = useState([]);
  const [error, setError] = useState();
  const history = useHistory;

  /* Using and declaring the useState hook and onChange Event to get the users input */

  /* END OF DECLARATION */

  // Handling Input
  const handleInputChange = (evt) => {
    const value = evt.target.value;
    //spread the state back into the new state value
    setState({ ...state, [evt.target.name]: value });
    console.log(evt.target.value);
  };

  //Cookie function
  function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
  }
  // Submission Logic
  const handleFormSubmit = (event) => {
    event.preventDefault();

    console.log("WORKINGGGGG");

    fetch("/api/register", {
      method: "POST",
      body: JSON.stringify(state),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        console.log(res);
        return res.json();
      })
      .then((data) => {
        if (data.status === "ok") {
          console.log("YESoo");
          setCookie("uid", data.data.id, "30");
          history.push("/");
          return data;
        } 
        if (data.status !== "ok") {
          let err = data;
          setError(err.errors);
          console.log(err);
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
            <Form.Row>
              <h1>Sign Up</h1>
              {error &&
                error.map((err) => <Alert variant="danger">{err}</Alert>)}
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col} controlId="formGridFirstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="First name"
                  value={state.firstName}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridLastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Last name"
                  value={state.lastName}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>
            </Form.Row>

            <Form.Row>
              <Form.Group as={Col} controlId="formGroupEmail">
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter your email"
                  value={state.email}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={state.password}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>
            </Form.Row>

            <Form.Row>
              <Form.Group as={Col} controlId="formGridProgram">
                <Form.Label>Program</Form.Label>
                <Form.Control
                  as="select"
                  // defaultValue="Choose..."
                  value={state.program}
                  onChange={handleInputChange}
                  required
                >
                  <option>Choose...</option>
                  {programData &&
                    programData.map((progData) => (
                      <option key={progData}>{progData}</option>
                    ))}
                </Form.Control>
              </Form.Group>

              <Form.Group as={Col} controlId="formGridMatricNo">
                <Form.Label>Matriculation Number</Form.Label>
                <Form.Control
                  placeholder="e.g 16/2020"
                  value={state.matricNo}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridGradYear">
                <Form.Label>Graduation Year</Form.Label>
                <Form.Control
                  as="select"
                  // defaultValue="Choose..."
                  value={state.gradYear}
                  onChange={handleInputChange}
                  required
                >
                  <option>Choose...</option>
                  {gradYearData &&
                    gradYearData.map((gradYData) => (
                      <option key={gradYData}>{gradYData}</option>
                    ))}
                </Form.Control>
              </Form.Group>
            </Form.Row>

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Container>
      </>
    </Layout>
  );
};

export default Signup;

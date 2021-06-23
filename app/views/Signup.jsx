import React, { useState } from "react";
// import React from "react";
import Layout from "./shared/Layout";
import { Form, Col, Button, Container, Alert } from "react-bootstrap";


const Signup = (props) => {
  console.log(props);
  const { programs, gradYears, error, retainedDetails, user } = props; //errors
  console.log(programs, gradYears, retainedDetails);   //errors

  const [firstName, setFirstName] = useState(retainedDetails[0]?.firstName || '');
  const [lastName, setLastName] = useState(retainedDetails[0]?.lastName || '');
  const [email, setEmail] = useState(retainedDetails[0]?.email || '');
  const [password, setPassword] = useState(retainedDetails[0]?.password || '');
  const [matricNumber, setMatricNumber] = useState(retainedDetails[0]?.matricNumber || '');
  const [program, setProgram] = useState(retainedDetails[0]?.program || '');
  const [graduationYear, setGraduationYear] = useState(retainedDetails[0]?.graduationYear || '');


  const handleInputChange = (event) => {
    const { name, value } = event.target;

    console.log(event.target.value);

    switch (name) {
      case "firstName":
        setFirstName(value);
        break;
      case "lastName":
        setLastName(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "password":
        setPassword(value);
        break;
      case "program":
        setProgram(value);
        break;
      case "matricNumber":
        setMatricNumber(value);
        break;
      case "graduationYear":
        setGraduationYear(value);
        break;
      default:
    }
  };


  return (
    <Layout user={user}>
      <>
        <Container fluid="md">
          <Form className="border rounded p-5 mt-5" method="post" action="signup" id="signupForm">
            <h1>Sign Up</h1>
            {error &&
              error.map((err) => (
                <Alert variant="danger" key={err}>
                  {err}
                </Alert>
              ))}

            <Form.Row>
              <Form.Group as={Col} controlId="formGridFirstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="First name"
                  value={firstName}
                  name="firstName"
                  onChange={handleInputChange}
                  // required
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridLastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Last name"
                  value={lastName}
                  name="lastName"
                  onChange={handleInputChange}
                />
              </Form.Group>
            </Form.Row>

            <Form.Row>
              <Form.Group as={Col} controlId="formGroupEmail">
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  name="email"
                  onChange={handleInputChange}
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={password}
                  name="password"
                  onChange={handleInputChange}
                />
              </Form.Group>
            </Form.Row>

            <Form.Row>
              <Form.Group as={Col} controlId="formGridProgram">
                <Form.Label>Program</Form.Label>
                <Form.Control
                  as="select"
                  // defaultValue="Choose..."
                  value={program}
                  name="program"
                  onChange={handleInputChange}
                >
                  <option>Choose...</option>
                  {programs &&
                    programs.map((progData) => (
                      <option key={progData}>{progData}</option>
                    ))}
                </Form.Control>
              </Form.Group>

              <Form.Group as={Col} controlId="formGridMatricNo">
                <Form.Label>Matriculation Number</Form.Label>
                <Form.Control
                  placeholder="e.g 16/2020"
                  value={matricNumber}
                  name="matricNumber"
                  onChange={handleInputChange}
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridGradYear">
                <Form.Label>Graduation Year</Form.Label>
                <Form.Control
                  as="select"
                  // defaultValue="Choose..."
                  value={graduationYear}
                  name="graduationYear"
                  onChange={handleInputChange}
                >
                  <option>Choose...</option>
                  {gradYears &&
                    gradYears.map((gradYData) => (
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


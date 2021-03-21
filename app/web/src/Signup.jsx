import React, { useState, useEffect } from "react";
import Layout from "./shared/Layout";
import { Form, Col, Button, Container, Alert } from "react-bootstrap";
import { useHistory } from "react-router-dom";
// import cookie from "cookie";

//Three fetch is done, the first two is to get the list of program and graduation years from their respective APIs to populate our sign up form select tag, the next is to extract input and make a post request
const Signup = () => {
  // For history routing
  const history = useHistory();

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

 
  /* Using and declaring the useState hook and onChange Event to get the users input */
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [program, setProgram] = useState();
  const [matricNo, setMatricNo] = useState("");
  const [gradYear, setGradYear] = useState();

  // For Error Div
  const [error, setError] = useState([]);

  /* END OF DECLARATION */

  // Submission Logic
  const handleFormSubmit = (event) => {
    event.preventDefault();
    console.log("WORKINGGGGG");

    const formData = {
      firstname: firstName,
      lastname: lastName,
      email: email,
      password: password,
      program: program,
      matricNumber: matricNo,
      graduationYear: gradYear,
    };

    fetch("/api/register", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: { "Content-Type": "application/json" },
    })
      .then(async (res) => {
        console.log(formData);

        if (res.status === 200) {
          let data = await res.json();

          console.log("200 !!");
          // cookie.createCookie("uid", data.data.id, "30");
          document.cookie = `uid=${data.data.id};path=/;max-age=60*60*24*30`;
          history.push("/");

          return res;
        } 
        else if (res.status !== 200) {
          let err = await res.json();
          console.log("Not 200!");
          setError(err.errors);
        }
      })
      .catch((err) => {
        console.log(`Submission error: ${err}`);
      });
  };

  //For Handling Input 
  const handleInputChange = (event) => {
    const { name, value } = event.target;

    console.log(event.target.value);

    switch (name) {
      case "firstName":
        setFirstName(value);
        // console.log(event.target.value)
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
      case "matricNo":
        setMatricNo(value);
        break;
      case "gradYear":
        setGradYear(value);
        break;
      default:
    }
  };

  return (
    <Layout>
      <>
        <Container fluid="md">
          <Form className="border rounded p-5 mt-5" onSubmit={handleFormSubmit}>
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
                  value={matricNo}
                  name="matricNo"
                  onChange={handleInputChange}
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridGradYear">
                <Form.Label>Graduation Year</Form.Label>
                <Form.Control
                  as="select"
                  // defaultValue="Choose..."
                  value={gradYear}
                  name="gradYear"
                  onChange={handleInputChange}
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


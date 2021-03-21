import React, { useState} from "react";
import Layout from "./shared/Layout";
import { Form, Button, Container, Alert } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import {getCookie} from './cookie';

const CreateProject = (props) => {

  const [name, setName] = useState('');
  const [abstract, setAbstract] = useState("");
  const [authors, setAuthors] = useState([]);
  const [tags, setTags] = useState([]);
  const [error, setError] = useState([]);
  let history = useHistory();

 

  const handleInputChange = (evt) => {
    const eventTarget = evt.target;

    const { name, value } = eventTarget;

    //Cases to handle inputs values from all our form elements
    switch (name) {
      case "name":
        setName(value);
        console.log(evt.target.value);
        break;
      case "abstract":
        setAbstract(value);
        console.log(evt.target.value);
        break;
      case "authors":
        setAuthors(value.split(","));
        console.log(evt.target.value);
        break;
      case "tags":
        setTags(value.split(" "));
        console.log(evt.target.value);
        break;
      default:
        console.log("Default - Check your code");
    }
  };

  // useEffect(() => {
    if(!getCookie('uid')) {
      history.push("/login");
    }
    // },[]);
  

  const handleFormSubmit = (event) => {
    event.preventDefault();
    console.log("Hmm");

    const createProjectFromData = {
      name: name,
      abstract: abstract,
      authors: authors,
      tags: tags,
    };

    fetch("/api/projects", {
      method: "POST",
      body: JSON.stringify(createProjectFromData),
      headers: {
        "Content-Type": "application/json",
      },
    }).then(async (resp) => {
      let data = await resp.json();
      if (resp.status === 200) {
        console.log("SUCCESS!... Project Creation a success");
        history.push("/");
        // window.location.href = "/"; /* You can also do this*/
      } else if (resp.status !== 200) {
        console.log(data.errors);
        setError(data.errors);
      }
    });
  };


  return (
    <Layout>
      <>
        <Container fluid="md">
          <Form className="border rounded p-5 mt-5" onSubmit={handleFormSubmit}>
            <h1>Submit Project</h1>
            {error &&
              error.map((err) => (
                <Alert variant="danger" key={err}>
                  {err}
                </Alert>
              ))}
            <Form.Group controlId="Form.ControlInput1">
              <Form.Label>Project Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter project name"
                name="name"
                value={name}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group controlId="Form.ControlTextarea1">
              <Form.Label>Project Abstract</Form.Label>
              <Form.Control
                as="textarea"
                rows={7}
                name="abstract"
                value={abstract}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group controlId="Form.ControlInput2">
              <Form.Label>Authors</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter author names (separated by comma)"
                name="authors"
                value={authors}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group controlId="Form.ControlInput3">
              <Form.Label>Tags</Form.Label>
              <Form.Control
                type="text"
                placeholder="Use # to tag project with different topics (e.g. #javascript #mongodb)"
                name="tags"
                value={tags}
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
export default CreateProject;

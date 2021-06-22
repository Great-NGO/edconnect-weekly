import React, { useState} from "react";
import Layout from "./shared/Layout";
import { Form, Button, Container, Alert } from "react-bootstrap";


const CreateProject = (props) => {

  const { user, subErr, retainedDetails } = props;

  console.log(retainedDetails);

  const [name, setName] = useState(retainedDetails[0] ?? '');
  const [abstract, setAbstract] = useState(retainedDetails[1] ?? '');
  const [authors, setAuthors] = useState(retainedDetails[2] ?? []);
  const [tags, setTags] = useState(retainedDetails[3] ?? []);

  
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
        setAuthors(value);
        console.log(evt.target.value);
        break;
      case "tags":
        setTags(value);
        console.log(evt.target.value);
        break;
      default:
        console.log("Default - Check your code");
    }
  };


  return (
    <Layout user={user}>
      <>
        <Container fluid="md">
          <Form className="border rounded p-5 mt-5" method="POST" action="/projects/submit" id="createProjectForm">
            <h1>Submit Project</h1>
            {subErr &&
              subErr.map((err) => (
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

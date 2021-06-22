// import React, { useState,  } from "react";
import React from "react";
import { Jumbotron, Container, Row, Col, Card } from "react-bootstrap";
import Layout from "./shared/Layout";

const Home = (props) => {
 console.log(props);

const {allProjects, user} = props;
console.log(allProjects, user);

  return (
    <Layout user={user}>
      <>
        <Jumbotron className="jumbotron">
          <h2>Welcome to Project Explorer</h2>
          <p className="lead">
            Project Explorer is a repository for final year projects across all
            departments at your institution. You can submit your project and
            search projects submitted by others to learn from.
          </p>
          <p>
            <a className="btn btn-primary" href="Signup">
              Get Started
            </a>
            <a className="btn btn-secondary" href="Login">
              Login 
            </a>
          </p>
        </Jumbotron>
        <Container fluid="md">
          <Row className="showcase">
            {allProjects&&allProjects.slice(0,4).map((project) => (
                <Col key={project.id} className="projCard" size="md">
                  <Card>
                    <Card.Body >
                    
                      <Card.Title> <a href={`/project/${project.id}`}>{project.name} </a>  </Card.Title>
                      <Card.Link href="#">
                        {project.authors.join(",")}
                      </Card.Link>
                      <Card.Text>{project.abstract}</Card.Text>
                      <Card.Link href="#"> {project.tags.join('#')}</Card.Link>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
          </Row>
        </Container>
      </>
    </Layout>
  );
};
export default Home;

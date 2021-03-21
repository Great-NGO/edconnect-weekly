import React, { useState, useEffect } from "react";
import Layout from "./shared/Layout";
import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";

const Project = () => {
  const params = useParams();

  const [projName, setProjName] = useState("");
  const [projAbstract, setProjAbstract] = useState("");
  const [projAuthors, setProjAuthors] = useState([]);
  const [projTags, setProjTags] = useState([]);
  const [createdBy, setCreatedBy] = useState("");

  // const projtagsStyle = {
  //   style : "dodgerblue",
  //   fontSize: "15px"
  // }

  useEffect(() => {
    let id = params.id;
    console.log(`The id is: ${id}`);
    fetch(`/api/projects/${id}`)
      .then((response) => {
        console.log(response);
        return response.json();
      })
      .then((data) => {
        console.log(data);
        console.log(`The Project ID is: ${data.id}`);
        // console.log(data.firstname);
        setProjName(data.name);
        console.log(`Project name: ${data.name}`);

        setProjAbstract(data.abstract);
        console.log(`Project abstract: ${data.abstract}`);

        setProjAuthors(data.authors);
        console.log(`Project authors: ${data.authors}`);

        setProjTags(data.tags);
        console.log(`Project Tags: ${data.tags}`);

        //Updating CreatedBy part
        fetch(`/api/users/${data.createdBy}`).then(async (response) => {
          let createdByData = await response.json();
          console.log(
            `IT was created By: ${createdByData.firstname} ${createdByData.lastname}`
          );
          setCreatedBy(`${createdByData.firstname} ${createdByData.lastname}`);
        });
      })
      .catch((err) => {
        console.log("Error is: ", err);
      });
  }, [params.id]);

  return (
    <Layout>
      <>
        <Container fluid="md">
          <nav className="container" id="headerNav">
            <div>
              <h1 id="project_name" value={projName}>
                {projName}
              </h1>
            </div>
            <div className="row  align-items-center" id="vpRow1">
              <div className="col-md-10">
                <div className="row">
                  <div className="col-md-4">
                    Created by
                    <p id="project_author">{createdBy}</p>
                  </div>

                  <div className="col-md-4">
                    Date Created
                    <p> 03/03/2020 </p>
                  </div>

                  <div className="col-md-4">
                    Last Updated
                    <p> 04/04/2020 </p>
                  </div>
                </div>
              </div>

              <div className="col-md-2">
                <a className="btn btn-primary" href="#edit" id="editBtn">
                  Edit Project
                </a>
              </div>
            </div>
          </nav>

          <section className="container">
            <div className="row">
              <div className="col-md-6" id="project_abstract">
                <h3>Project Abstract</h3>
                <hr></hr>
                <p value={projAbstract}>{projAbstract}</p>
              </div>

              <div className="col-md-6">
                <h3>Project Details</h3>

                <div className="card">
                  <div className="card-header">
                    <strong>Author(s)</strong>
                  </div>

                  <div className="card-block" id="project_authors">
                    {projAuthors&&projAuthors.map((authors) => (
                      
                        <>
                        <p className='card-text' key={authors.id}>{authors}</p> 
                        <hr></hr>
                      </>
                    ))}
                  </div>

               

                  <div className="card-footer" id="project_tags">
                    {projTags &&
                      projTags.map((tags) => {
                        return (
                          <>
                            <small
                              style={{ color: "dodgerblue", fontSize: "15px" }}
                            >
                              {tags}{" "}
                            </small>
                          </>
                        );
                      })}
                  </div>

                  <div className="card mt-3">
                    <div className="card-header">
                      <strong>Project files</strong>
                    </div>

                    <div className="card-block" id="vpCardBlock">
                      <p className="card-text">No file uploaded yet</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </Container>
      </>
    </Layout>
  );
};
export default Project;

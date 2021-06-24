import React from "react";
import Layout from "./shared/Layout";
import { Container } from "react-bootstrap";

const Project = (props) => {
  // const params = useParams();

  const { user, projName, projAbstract, projAuthors, projTags, createdBy} = props

  return (
    <Layout user={user}>
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

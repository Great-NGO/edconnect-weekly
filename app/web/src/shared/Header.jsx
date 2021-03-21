import React, { useState, useEffect } from "react";
import { Nav, Navbar, Form, FormControl, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
 //Get Cookie function.. We import the getCookie function from our file cookie.js
import { getCookie } from '../cookie';

 
const Header = () => {
 

  const usernameStyle = {
    display: "inline-block",
    color: "#B5B5B5",
    paddingTop: "8px",
  };

  // History hook.. for url navigation instead of using the windows.location property
  const history = useHistory();

  //Username text
  const [usernameText, setUsernameText] = useState("");
  // if(getCookie(`uid`)){}
  useEffect(() => {
    // if (getCookie(`uid`)) {
      fetch(`/api/users/${getCookie(`uid`)}`)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log(data);
          console.log(`ID: ${data.id}; Firstname: ${data.firstname}`);
          console.log();

          setUsernameText(`Hi, ${data.firstname}`);
        })
        .catch((err) => {
          console.log("The Error is: ", err);
        });
    // }
  }, []);

  function logoutLinkClick(e) {
    e.preventDefault();
    document.cookie = `uid=;expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    // window.location.href = "/";
    history.push("/"); /* It appears to be redirect even faster than windows location */
  }

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Navbar.Brand href="/">Project Explorer</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Form inline>
            <FormControl
              type="text"
              placeholder="Search Projects"
              className="mr-sm-2"
            />
            <Button variant="outline-light" className="navSearchBtn">Search</Button>
          </Form>
          <Nav.Link href="#projects">Projects</Nav.Link>
          <Nav.Link href="/projects/submit">Submit</Nav.Link>
        </Nav>
        <Nav>
          {getCookie(`uid`) !== "" ? (
            <>
              <span id="username" style={usernameStyle}>
                {usernameText}
              </span>

              <Nav.Link href="/" id="logout" onClick={logoutLinkClick}>
                Logout
              </Nav.Link>
            </>
          ) : (
            <>
              <Nav.Link href="/Signup" id="signup">
                Sign Up
              </Nav.Link>
              <Nav.Link eventKey={2} href="/Login" id="login">
                Login
              </Nav.Link>
            </>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};
export default Header;

import React from "react";
import { Nav, Navbar, Form, FormControl, Button} from "react-bootstrap";

const Header = () => {
  return (
    // <>
    //   <nav
    //     className="navbar navbar-expand-md navbar-dark bg-secondary"
    //     id="mainNavbar"
    //   >
    //     <a href="index.html" className="navbar-brand">
    //       Project Explorer
    //     </a>

    //     <button
    //       className="navbar-toggler"
    //       type="button"
    //       data-toggle="collapse"
    //       data-target="#navHeaderCollapse"
    //       aria-controls="#navHeaderCollapse"
    //       aria-expanded="false"
    //       aria-label="Toggle navigation"
    //     >
    //       <span className="navbar-toggler-icon"></span>
    //     </button>

    //     <div className="collapse navbar-collapse" id="#navLinks">
    //       {/* <form className="form-inline my-2 my-lg-0 pull-xs-left" method="POST" action="" enctype="text/plain">
    //             <input className="form-control" type="search" aria-label="Search" placeholder="Search Projects">&nbsp;  </input>
    //             <button className="btn btn-outline-light my-2 my-sm-0" type="submit">Search</button>
    //         </form> */}
    //       <Form inline>
    //         <FormControl
    //           type="text"
    //           placeholder="Search Projects"
    //           className="mr-sm-2"
    //         />
    //         <Button variant="outline-light">&nbsp;Search</Button>
    //       </Form>

    //       <ul className="navbar-nav mr-auto">
    //         <li className="nav-item">
    //           <a className="nav-link" href="search.html" title="Projects">
    //             Projects
    //           </a>
    //         </li>
    //         <li className="nav-item">
    //           <a
    //             className="nav-link"
    //             href="createProject.html"
    //             title="Submit Project"
    //           >
    //             Submit
    //           </a>
    //         </li>
    //       </ul>

    //       <ul className="navbar-nav mr-sm-2">
    //         <li className="nav-item">
    //           <a className="nav-link" href="register.html" title="Sign up">
    //             Sign up
    //           </a>
    //         </li>
    //         <li className="nav-item">
    //           <a className="nav-link" href="login.html" title="Login Page">
    //             Login
    //           </a>
    //         </li>
    //       </ul>
    //     </div>
    //   </nav>
    // </>

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
            <Button variant="outline-light">Search</Button>
          </Form>
          <Nav.Link href="#projects">Projects</Nav.Link>
          <Nav.Link href="CreateProject">Submit</Nav.Link>
        </Nav>
        <Nav>
          <Nav.Link href="Signup">Sign Up</Nav.Link>
          <Nav.Link eventKey={2} href="Login">Login</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};
export default Header;

import React from "react";
import { Nav, Navbar, Form, FormControl, Button } from "react-bootstrap";

 
const Header = (props) => {

   const { user } = props;
   console.log("Header");
   
  //  console.log(props); //console.log(props.user); //
   console.log(user);
    // console.log(`The user firstname is: ${user.firstname}`);

  const usernameStyle = {
    display: "inline-block",
    color: "#B5B5B5",
    paddingTop: "8px",
  };
 
  // const [usernameText, setUsernameText] = useState("");

  //If there is a user, set the firstname
  // useEffect(() => {
  //   if(user){
  //     setUsernameText(`Hi, ${user.firstname}`);
    
  //     }
  // }, [])
  let usernameText;
  if(user) {
    usernameText = `Hi, ${user.firstname}`;
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
          
          {user ? (
            <>
              <span id="username" style={usernameStyle}>
              {usernameText}
              </span>

              <Nav.Link href="/logout" id="logout">
                Logout
              </Nav.Link>
            </>
          ) : 
            <>
              <Nav.Link href="/signup" id="signup">
                Sign Up
              </Nav.Link>
              <Nav.Link eventKey={2} href="/login" id="login">
                Login
              </Nav.Link>
            </>
          }
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};
export default Header;


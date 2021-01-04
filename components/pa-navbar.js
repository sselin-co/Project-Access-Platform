import React from "react";
import styles from "../styles/Home.module.css";

// I know this is in __app.js as a global stylesheet. However, removing this line will center the PA logo for some reason.
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Nav,
  Navbar,
  NavDropdown,
  Form,
  FormControl,
  Button,
  Dropdown,
} from "react-bootstrap";
import SignUpModal from "./signup-modal";
import Image from "next/image";


export default function PaNavbar() {
  const [signUpModalShow, setSignUpModalShow] = React.useState(false);

  function handleSignUpModalHide() {
    setSignUpModalShow(false);
  }

  return (
    
    <Navbar expand="lg" className={styles.navbar} variant="dark" sticky="top">
      <Navbar.Brand href="/">
        <Image
          src="/austria.png"
          width={125}
          height={60}
          className="d-inline-block align-top"
          alt="Project Access logo"
        />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          <Button
            href="./api/auth/signin/Credentials"
            variant="outline-light"
            className={styles.navbarButton}
          >
            Log In
          </Button>
          <Button
            onClick={() => setSignUpModalShow(true)}
            variant="warning"
            className={styles.navbarButton}
          >
            Sign Up
          </Button>
          
          <SignUpModal show={signUpModalShow} onHide={handleSignUpModalHide} />
        </Nav>
      </Navbar.Collapse>
    </Navbar>
    
  )
}

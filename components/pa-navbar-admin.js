import React, { useEffect, useState } from "react";
import { signOut } from "next-auth/client";
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
  Col,
  Row,
} from "react-bootstrap";
import Image from "next/image";
import Admin from "../pages/api/utils/Admin";

export default function PaNavbarAdmin(props) {
  const [username, setUserName] = useState("");

  useEffect(() => {
    Admin.nameReturn(props.email, "firstname").then((data) => {
      setUserName(data);
      //console.log(props.email);
    });
  });

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
          <Nav.Link
            href="/"
            activeclassname="active"
            className={styles.navLink}
          >
            Applications
          </Nav.Link>
          <Nav.Link href="/admin/course-builder" className={styles.navLink}>
            Course Builder
          </Nav.Link>
          <Nav.Link
            href="/admin/student-assignments"
            className={styles.navLink}
          >
            Students
          </Nav.Link>

          <Button
            onClick={signOut}
            variant="outline-light"
            className={styles.navbarButton}
          >
            Log Out
          </Button>
          <Button
            //onClick={nameDisplay}
            variant="warning"
            className={styles.navbarButton}
          >
            {username}
          </Button>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

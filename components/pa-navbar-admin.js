import React from "react";
import styles from "../styles/Home.module.css";
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

export default function PaNavbarAdmin() {
  return (
    <Navbar expand="lg" className={styles.navbar} variant="dark" sticky="top">
      <Navbar.Brand href="/">
        <Row>
          <Col>
            <Image
              src="/austria.png"
              width={125}
              height={60}
              className="d-inline-block align-top"
              alt="Project Access logo"
            />
          </Col>
          <Col>
            <h7>
              Welcome, <b>Admin</b>
            </h7>
          </Col>
        </Row>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          <Nav.Link
            href="#home"
            activeclassname="active"
            className={styles.navLink}
          >
            Applications
          </Nav.Link>
          <Nav.Link href="#link" className={styles.navLink}>
            Course Builder
          </Nav.Link>
          <Nav.Link href="#link" className={styles.navLink}>
            Students
          </Nav.Link>
          <Button variant="warning" className={styles.navbarButton} href="/">
            Sign Out
          </Button>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

import React from 'react';
import styles from '../styles/Home.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Nav, Navbar, NavDropdown, Form, FormControl, Button, Dropdown } from 'react-bootstrap'

export default function PaNavbar() {
        return( <Navbar expand="lg" className={styles.navbar} variant="dark" sticky="top">
        <Navbar.Brand href="#home">
          <img
            src="/austria.png"
            width="100"
            height="50"
            className="d-inline-block align-top"
            alt="Project Access logo"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              <Nav.Link href="#home" className = {styles.navLink}>Start</Nav.Link>
              <Nav.Link href="#link" className = {styles.navLink}>Bootcamp</Nav.Link>
              <Nav.Link href="#link" className = {styles.navLink}>Become a mentor</Nav.Link>
              <Dropdown>
                <Dropdown.Toggle variant="warning" id="dropdown-basic" className = {styles.navLink+ ' ' +styles.navDropdown}>
                  Log In
                </Dropdown.Toggle>
                <Dropdown.Menu menuAlign={{ lg: 'left' }}>
                <Form>
                  <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" />
                    <Form.Text className="text-muted">
                      We'll never share your email with anyone else.
                    </Form.Text>
                  </Form.Group>

                  <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" />
                  </Form.Group>
                  <Form.Group controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Check me out" />
                  </Form.Group>
                  <Button variant="primary" type="submit">
                    Submit
                  </Button>
                </Form>
                </Dropdown.Menu>
              </Dropdown>
            </Nav>
          </Navbar.Collapse>
      </Navbar>)
      
}

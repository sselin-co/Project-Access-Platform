import React, { useState } from "react";
import styles from "../styles/Home.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Modal, Form, Col, Alert, Container } from "react-bootstrap";

import Student from "../pages/api/utils/Student";

export default function SignUpModal(props) {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [validated, setValidated] = useState(false);
  const [invalid, setInvalid] = useState(false);
  const [show, setShow] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    event.stopPropagation();
    if (form.checkValidity() === false) {
      setInvalid(true);
    } else {
      setInvalid(false);
      setShow(true);
      Student.signUp(emailAddress, fname, lname, password);
    }
    setValidated(true);
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Sign Up</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h5 className={styles.signUpModalTitle}>
          Create an account to get exclusive access to our events and the
          ability to apply for our program.
        </h5>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Form.Row>
            <Col>
              <Form.Label>First Name</Form.Label>
              <Form.Control
                pattern="[a-zA-Z]+"
                required
                value={fname}
                onChange={(e) => setFname(e.target.value)}
                placeholder="Enter first name"
              />
              <Form.Control.Feedback type="invalid">
                Please provide a valid first name.
              </Form.Control.Feedback>
            </Col>
            <Col>
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                pattern="[a-zA-Z]+"
                required
                value={lname}
                onChange={(e) => setLname(e.target.value)}
                placeholder="Enter last name"
              />
              <Form.Control.Feedback type="invalid">
                Please provide a valid last name.
              </Form.Control.Feedback>
            </Col>
          </Form.Row>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              required
              value={emailAddress}
              onChange={(e) => setEmailAddress(e.target.value)}
              type="email"
              placeholder="Enter email"
            />
            <Form.Control.Feedback type="invalid">
              Please provide a valid email.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              pattern="^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Password"
            />
            {!invalid && (
              <Form.Text className="text-muted">
                Minimum 8 characters, at least 1 letter, 1 number and 1 special
                character
              </Form.Text>
            )}
            <Form.Control.Feedback type="invalid">
              Minimum 8 characters, at least 1 letter, 1 number and 1 special
              character
            </Form.Control.Feedback>
          </Form.Group>
          <Container>
            <Form.Row>
              <Col>
                <Button
                  type="submit"
                  variant="primary"
                  className={styles.navbarButton}
                >
                  Create Account
                </Button>
              </Col>
              <Col>
                {!invalid && show && (
                  <Alert
                    variant="success"
                    onClose={() => setShow(false)}
                    dismissible
                  >
                    <p>
                      All good! You can{" "}
                      <a href="./api/auth/signin/Credentials">log in</a> now
                    </p>
                  </Alert>
                )}
              </Col>
            </Form.Row>
          </Container>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Form.Text className="text-muted">Already have an account?</Form.Text>
        <Button
          href="./api/auth/signin/Credentials"
          variant="warning"
          className={styles.navbarButton}
        >
          Log In
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

// const Airtable = require('airtable');
// const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(process.env.AIRTABLE_BASE_ID);
import React, { useState } from "react";
import styles from "../styles/Home.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Button,
  Modal,
  Form,
  Col,
} from "react-bootstrap";

import Student from '../pages/api/utils/Student';

export default function SignUpModal(props) {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [validated, setValidated] = useState(false);

  const validate = ({ firstName, lastName }) => {
    return {
      firstName: !firstName || firstName.trim().length === 0
        ? "First Name is required"
        : false,
      lastName:
        !lastName || lastName.trim().length === 0
          ? "Last Name is required"
          : false
    };
  };

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    else{
    setValidated(true);
      event.preventDefault();
      event.stopPropagation();
      Student.signUp(emailAddress, fname, lname, password);
    }
    //console.log(validated);
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
              <Form.Control pattern="[a-zA-Z]+" required value={fname} onChange={(e) => setFname(e.target.value)} placeholder="Enter first name" />
              <Form.Control.Feedback type="invalid">
                Please provide a valid first name.
              </Form.Control.Feedback>
            </Col>
            <Col>
              <Form.Label>Last Name</Form.Label>
              <Form.Control pattern="[a-zA-Z]+" required value={lname} onChange={(e) => setLname(e.target.value)} placeholder="Enter last name" />
              <Form.Control.Feedback type="invalid">
                Please provide a valid first name.
              </Form.Control.Feedback>
            </Col>
          </Form.Row>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control required value={emailAddress} onChange={(e) => setEmailAddress(e.target.value)} type="email" placeholder="Enter email" />
            <Form.Control.Feedback type="invalid">
              Please provide a valid email.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control pattern="^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$" required value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" />
            {!validated && <Form.Text className="text-muted">
              Minimum 8 characters, at least 1 letter, 1 number and 1 special character
            </Form.Text>}
            <Form.Control.Feedback type="invalid">
              Minimum 8 characters, at least 1 letter, 1 number and 1 special character
            </Form.Control.Feedback>
          </Form.Group>
          <Button
            type="submit"
            variant="primary"
            className={styles.navbarButton}
          >
            Create Account
          </Button>
        </Form>
      </Modal.Body>
      {/* <Modal.Footer>
        <Form.Text className="text-muted">Already have an account?</Form.Text>
        <Button
          onClick={props.onHide}
          variant="warning"
          className={styles.navbarButton}
        >
          Log In
        </Button>
      </Modal.Footer> */}
    </Modal>
  );
}

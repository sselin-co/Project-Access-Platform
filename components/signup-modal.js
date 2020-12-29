import React, { useState } from "react";
import styles from "../styles/Home.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Modal, Form, Col } from "react-bootstrap";

export default function SignUpModal(props) {
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
        <Form>
          <Form.Row>
            <Col>
              <Form.Label>First Name</Form.Label>
              <Form.Control placeholder="Enter first name" />
            </Col>
            <Col>
              <Form.Label>Last Name</Form.Label>
              <Form.Control placeholder="Enter last name" />
            </Col>
          </Form.Row>
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
            <Form.Check type="checkbox" label="Stay logged in" />
          </Form.Group>
          <Button
            type="submit"
            variant="primary"
            className={styles.navbarButton}
          >
            Submit
          </Button>
        </Form>
      </Modal.Body>
      {/* // Need ability to navigate between components */}
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

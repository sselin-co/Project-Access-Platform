import React from "react";
import styles from "../styles/Home.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Modal, Form } from "react-bootstrap";

export default function LoginModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Log In</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
            {/* <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text> */}
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
            href="/admin/admin-dashboard"
          >
            Submit
          </Button>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Form.Text className="text-muted">Don't have an account yet?</Form.Text>
        <Button
          onClick={props.onHide}
          variant="warning"
          className={styles.navbarButton}
        >
          Sign Up
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

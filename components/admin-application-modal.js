import React from "react";
import styles from "../styles/Home.module.css";
import { Button, Modal, Form, Row, Col } from "react-bootstrap";

export default function AdminApplicationModal(props) {
  const Message = () => {
    switch (props.status) {
      case "written app submitted":
        return (
          <p>
            Would you like to approve the application for <b>{props.name}</b>?
          </p>
        );
      case "written app passed":
        return (
          <p>
            An invite to consultation email will be sent to <b>{props.name}</b>.
            Would you like to proceed?
          </p>
        );
      case "consultation scheduled":
        return (
          <p>
            Has the consultation for <b>{props.name}</b> been completed?
          </p>
        );
      case "consultation in review":
        return (
          <p>
            An acceptance email will be sent to <b>{props.name}</b>. would you
            like to proceed?
          </p>
        );
      case "accepted":
        break;
      case "rejected":
        break;
      case "appealing":
        break;
      default:
        return "Would you like to pass this application?";
    }
  };

  return (
    <Modal
      {...props}
      size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Confirmation Dialog
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Col>
            <Message />
          </Col>
        </Row>
      </Modal.Body>
    </Modal>
  );
}

import React, { useState } from "react";
import styles from "../styles/Home.module.css";
import { Button, Modal, Form, Row, Col } from "react-bootstrap";
import Admin from "../pages/api/utils/Admin";
import Router from "next/router";

export default function ReviewModal(props) {
    
    return (
        <Modal variant="success" {...props}>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Feedback from Instructor
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row>
                    {props.review && <Col>
                        {props.review}
                    </Col>}
                    {!props.review && <Col>
                        Your instructor is yet to submit a feedback
                    </Col>}
                </Row>
            </Modal.Body>
        </Modal>
    );
}

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Student from "../pages/api/utils/Student";
import styles from "../styles/Home.module.css";
import { Button, Modal, Form, Row, Col } from "react-bootstrap";
import Admin from "../pages/api/utils/Admin";
import Router from "next/router";

export default function SubmitAssignmentModal(props) {
    var nextStage;
    const [submission, setSubmission] = useState("");
    const { register, handleSubmit } = useForm();

    const onSubmit = (data) => {
        
        setSubmission(data);
        confirmHandler();
        //console.log(props.cid, props.level, submission);
    }

    const Message = () => {
        if (props.rejectclicked == true) {
            return (
                <p>
                    You are about to reject <b>{props.name}</b>. Are you sure you want to
          do this?
                </p>
            );
        } else {
            switch (props.status) {
                case "written app submitted":
                    nextStage = "written app passed";
                    return (
                        <p>
                            Would you like to approve the application for <b>{props.name}</b>?
                        </p>
                    );
                case "written app passed":
                    nextStage = "consultation scheduled";
                    return (
                        <p>
                            An invite to consultation email will be sent to{" "}
                            <b>{props.name}</b>. Would you like to proceed?
                        </p>
                    );
                case "consultation scheduled":
                    nextStage = "consultation in review";
                    return (
                        <p>
                            Has the consultation for <b>{props.name}</b> been completed?
                        </p>
                    );
                case "consultation in review":
                    nextStage = "accepted";
                    return (
                        <p>
                            An acceptance email will be sent to <b>{props.name}</b>. Would you
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
        }
    };

    const confirmHandler = async () => {
        try {
            //if (props.rejectclicked == "true") {
                await Student.submitAssignment(props.cid, props.level, submission);
                setTimeout(function () {
                    console.log("Succesful update");
                    //location.reload();
                }, 1000);
           // } 
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <Modal {...props}>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Submit Assignment
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <input ref={register} type="file" name="picture" />
                    <button>Upload assignment</button>
                
                    {/* <Row>
                        <Col>
                            <Message />
                        </Col>
                    </Row>
                    <Row>
                        <Col className="d-flex justify-content-center">
                            <Button onClick={props.onHide} variant="danger">
                                Cancel
                        </Button>
                        </Col>
                        <Col />
                        <Col className="d-flex justify-content-center">
                            <Button onClick={confirmHandler} variant="success">
                                Confirm
                            </Button>
                        </Col>
                    </Row> */}
                </Form>
            </Modal.Body>
        </Modal>
    );
}

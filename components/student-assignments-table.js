import React, { useState } from "react";
import styles from "../styles/Home.module.css";
import Image from "next/image";
import Link from "next/link";
import { Button, Modal, Table, Form } from "react-bootstrap";
import useSwr from "swr";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
  PaginationListStandalone,
  SizePerPageDropdownStandalone,
} from "react-bootstrap-table2-paginator";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import Loading from "../components/loading";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function StudentAssignmentsTable(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [modalText, setModalText] = useState("");
  const onFormSubmit = (e) => {
    const formData = new FormData(e.target),
      formDataObj = Object.fromEntries(formData.entries());

    const updatedData = {
      content: formDataObj,
    };
    const otherParam = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify(updatedData),
    };
    console.log(otherParam);
    e.preventDefault();
  };

  const style = {
    paddingTop: "1.5rem",
    paddingRight: "2rem",
    marginBottom: "2rem",
  };
  const { data, error } = useSwr(
    `/api/admin/accepted-students/${props.studentid}`,
    fetcher
  );
  if (error)
    return <div>Failed to load applicant information. Error: {error}</div>;
  if (!data) return <Loading />;

  const FeedbackButton = (props) => {
    return (
      <div>
        <Button
          variant="primary"
          onClick={() => {
            setShow(true);
            setModalText(data.student.first_name + data.student.last_name);
          }}
        >
          Submit Feedback
        </Button>
        <FeedbackModal />
      </div>
    );
  };

  const FeedbackModal = (props) => {
    return (
      <div>
        <Modal show={show} onHide={handleClose} centered>
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Submit Feedback
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form
              onSubmit={onFormSubmit}
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>
                Would you like to submit assignment feedback to{" "}
                <b>{modalText}</b>?
              </Form.Label>
              <Form.Group controlId="formBasicPassword">
                <Form.Label>Enter feedback</Form.Label>
                <Form.Control as="textarea" placeholder="Feedback" />
              </Form.Group>
              <Button variant="success" type="submit">
                Submit
              </Button>
            </Form>
          </Modal.Body>
          <Modal.Footer></Modal.Footer>
        </Modal>
      </div>
    );
  };

  const ContentTable = () => {
    return (
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Module Number</th>
            <th>Submission</th>
            <th>Feedback</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>
              <Link href={data.student.module_1[0].url}>
                <a>View Submission</a>
              </Link>
            </td>
            <td>
              <FeedbackButton
                studentname={
                  data.student.first_name + " " + data.student.last_name
                }
              />
            </td>
          </tr>
          <tr>
            <td>2</td>
            <td>
              <Link href={data.student.module_1[0].url}>
                <a>View Submission</a>
              </Link>
            </td>
            <td>
              <FeedbackButton
                studentname={
                  data.student.first_name + " " + data.student.last_name
                }
              />
            </td>
          </tr>
        </tbody>
      </Table>
    );
  };

  return (
    <>
      <ContentTable />
    </>
  );
}

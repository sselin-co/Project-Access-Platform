import React, { useState } from "react";
import styles from "../styles/Home.module.css";
import Image from "next/image";
import Link from "next/link";
import {
  Tabs,
  Tab,
  Col,
  Row,
  Alert,
  Button,
  Container,
  Modal,
} from "react-bootstrap";
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

export default function AssignmentTable() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [modalText, setModalText] = useState("");
  const style = {
    paddingTop: "1.5rem",
    paddingRight: "2rem",
    marginBottom: "2rem",
  };

  const { data, error } = useSwr("/api/admin/accepted-students", fetcher);
  if (error)
    return <div>Failed to load applicant information. Error: {error}</div>;
  if (!data) return <Loading />;

  // TODO: place formatter functions into admin/utils
  function applicantNameFormatter(cell, row) {
    var studentId = row.id;
    return (
      // Dynamic route to info of clicked applicant
      <Link
        href={"/admin/student-assignments/[id]"}
        as={`/admin/student-assignments/${studentId}`}
      >
        <a>{cell}</a>
      </Link>
    );
  }

  function moduleNumberFormatter(cell, row) {
    return <>{cell}</>;
  }

  function reminderFormatter(cell, row) {
    return <ReminderButton studentname={row.full_name} />;
  }

  const columns = [
    {
      dataField: "full_name",
      text: "Applicant Name",
      formatter: applicantNameFormatter,
      sort: true,
      align: "center",
    },
    {
      dataField: "education_level",
      text: "Applying For",
      align: "center",
    },
    {
      dataField: "last_assignment_submitted",
      text: "Module Number",
      formatter: moduleNumberFormatter,
      sort: true,
      align: "center",
    },
    {
      dataField: "id",
      text: "Reminders",
      formatter: reminderFormatter,
      align: "center",
    },
  ];

  const { SearchBar } = Search;

  const defaultSorted = [
    {
      dataField: "last_assignment_submitted",
      order: "asc",
    },
  ];

  const options = {
    custom: true,
    paginationSize: 4,
    pageStartIndex: 1,
    nextPageTitle: "First page",
    prePageTitle: "Pre page",
    firstPageTitle: "Next page",
    lastPageTitle: "Last page",
    showTotal: true,
    totalSize: data.accepted.length,
    hidePageListOnlyOnePage: true, // Hide the pagination list when only one page
  };

  const contentTable = ({ paginationProps, paginationTableProps }) => (
    <div className={styles.grid}>
      <ToolkitProvider
        keyField="accepted.full_name"
        columns={columns}
        data={data.accepted}
        search
        bootstrap4
      >
        {(toolkitprops) => (
          <div>
            <SearchBar
              {...toolkitprops.searchProps}
              placeholder="Search for students"
            />
            <BootstrapTable
              striped
              hover
              noDataIndication="Table is Empty"
              defaultSorted={defaultSorted}
              {...toolkitprops.baseProps}
              {...paginationTableProps}
            />
            <SizePerPageDropdownStandalone {...paginationProps} />
          </div>
        )}
      </ToolkitProvider>
      <PaginationListStandalone {...paginationProps} />
      <ReminderModal />
    </div>
  );

  const ReminderButton = (props) => {
    return (
      <div>
        <Button
          variant="danger"
          onClick={() => {
            setShow(true);
            setModalText(props.studentname);
            console.log("In Button:" + props.studentname);
          }}
        >
          Send Assignment Reminder
        </Button>
        <ReminderModal />
      </div>
    );
  };

  const ReminderModal = (props) => {
    console.log("In Modal:" + modalText);
    return (
      <div>
        <Modal show={show} onHide={handleClose} centered>
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Assignment Reminder
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Would you like to send an assignment reminder to <b>{modalText}</b>?
          </Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="success" onClick={handleClose}>
              Send Email
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  };

  return (
    <>
      <Container>
        <Row>
          <Col xs="3">
            <Image
              src="/01_red_checklist@3x.png"
              width={100}
              height={100}
              className="d-inline-block align-top"
              alt="Application icon"
            />
          </Col>
          <Col>
            <h1>Student Assignments</h1>
          </Col>
        </Row>
      </Container>
      <PaginationProvider pagination={paginationFactory(options)}>
        {contentTable}
      </PaginationProvider>
    </>
  );
}

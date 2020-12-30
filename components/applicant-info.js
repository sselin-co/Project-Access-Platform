import React from "react";
import styles from "../styles/Home.module.css";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import useSwr from "swr";
import Loading from "../components/loading";
import { Container, Row, Col, Dropdown, DropdownButton } from "react-bootstrap";
import { Stepper, Step } from "react-form-stepper";
import BootstrapTable from "react-bootstrap-table-next";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import AdminApplicationModal from "../components/admin-application-modal";

// fetcher: Defines the structure of data being received from Airtable via SWR
const fetcher = (url) => fetch(url).then((res) => res.json());
// applicationStage: Keeps track of what stage an applicant is in
var applicationStage;
// photoURL: Stores the url for an applicants profile picture. Defaults to a stock image
var photoURL = "/01_green_person_grad@3x.png";

// DisplayApplicantInfo: displays applicant info and allows the admin to move the applicant along in the process.
export default function DisplayApplicantInfo() {
  // keeps track of state of the modal dialog box
  const [modalShow, setModalShow] = React.useState(false);
  const router = useRouter();
  const studentId = router.query.id;
  const { data, error } = useSwr(`/api/applicant-info/${studentId}`, fetcher);
  if (error) return <div>Failed to load applicant information</div>;
  if (!data) return <Loading />;

  //console.log(data.fields.photo[0].url);
  if (data.fields.photo != null) photoURL = data.fields.photo[0].url;
  else photoURL = "/01_green_person_grad@3x.png";

  const StatusStepper = () => {
    let decision = "Final Decision";
    switch (data.fields.applicationStatus.toString()) {
      case "written app submitted":
        applicationStage = 0;
        break;
      case "written app passed":
        applicationStage = 1;
        break;
      case "consultation scheduled":
        applicationStage = 2;
        break;
      case "consultation in review":
        applicationStage = 3;
        break;
      case "accepted":
        applicationStage = 4;
        decision = "Accepted";
        break;
      case "rejected":
        applicationStage = 4;
        decision = "Rejected";
        break;
      case "appealing":
        applicationStage = 4;
        decision = "Appealing";
        break;
      default:
        applicationStage = -1;
    }
    return (
      <Stepper connectorStateColors activeStep={applicationStage}>
        <Step label="Written App Submitted" />
        <Step label="Written App Passed" />
        <Step label="Consultation In Progress" />
        <Step label="Consultation In Review" />
        <Step label={decision} />
      </Stepper>
    );
  };

  const StatusButton = () => {
    let buttonText;
    let menuText;
    let menu;
    switch (data.fields.applicationStatus.toString()) {
      case "written app submitted":
        buttonText = "Written application reviewed?";
        menuText = "Approve Application";
        break;
      case "written app passed":
        buttonText = "Ready to schedule a consultation?";
        menuText = "Invite to consultation";
        break;
      case "consultation scheduled":
        buttonText = "Consultation completed?";
        menuText = "Begin consultation review";
        break;
      case "consultation in review":
        buttonText = "Has an acceptance decision been made?";
        menuText = "Accept applicant";
        break;
      case "accepted":
        buttonText = "Applicant has been accepted.";
        break;
      case "rejected":
        buttonText = "Applicant has been rejected.";
        break;
      case "appealing":
        buttonText = "Applicant is appealing.";
        break;
      default:
    }
    return (
      <>
        <DropdownButton id="dropdown-basic-button" title={buttonText}>
          <Dropdown.Item onClick={() => setModalShow(true)}>
            {menuText}
          </Dropdown.Item>
          <Dropdown.Item onClick={() => setModalShow(true)}>
            Reject Application
          </Dropdown.Item>
        </DropdownButton>
        <AdminApplicationModal
          show={modalShow}
          onHide={() => setModalShow(false)}
          name={data.fields.name}
          status={data.fields.applicationStatus.toString()}
        />
      </>
    );
  };

  return (
    <>
      <Container>
        {" "}
        <Row>
          <Col xs lg="3">
            <Image
              src={photoURL}
              width={100}
              height={100}
              className="nextImage"
              alt="Placeholder for applicant profile picture"
            />
          </Col>
          <Col md="auto">
            <h1>{data.fields.name}</h1>
            <h5 className="text-muted">{data.fields.email}</h5>
            <h6 className="text-muted">{data.fields.applyingFor.toString()}</h6>
          </Col>
        </Row>
        <Row>
          <Col>
            <StatusStepper />
          </Col>
        </Row>
        <Row>
          <Col>
            <p>
              View this applicant's files{" "}
              <a
                href={
                  "https://airtable.com/tblEzSNgUrVlGFG1s/viwkWV3m9d4RH7sq9/" +
                  studentId
                }
                target="_blank"
              >
                <b>in Airtable here.</b>
              </a>
            </p>
          </Col>
          <Col>
            <StatusButton />
          </Col>
        </Row>
      </Container>
    </>
  );
}

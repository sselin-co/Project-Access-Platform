import React from "react";
import styles from "../styles/Home.module.css";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import useSwr from "swr";
import Loading from "../components/loading";
import {
  Container,
  Row,
  Col,
  Dropdown,
  DropdownButton,
  Button,
} from "react-bootstrap";
import { Stepper, Step } from "react-form-stepper";
import BootstrapTable from "react-bootstrap-table-next";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import AdminApplicationModal from "../components/admin-application-modal";
import { BsArrowLeft } from "react-icons/bs";
import Admin from "../pages/api/utils/Admin";

// fetcher: Defines the structure of data being received from Airtable via SWR
const fetcher = (url) => fetch(url).then((res) => res.json());
// applicationStage: Keeps track of what stage an applicant is in
var applicationStage;
// photoURL: Stores the url for an applicants profile picture. Defaults to a stock image
var photoURL = "/01_green_person_grad@3x.png";

// DisplayApplicantInfo: displays applicant info and allows the admin to move the applicant along in the process.
export default function DisplayApplicantInfo(props) {
  // keeps track of state of the modal dialog box
  const [modalShow, setModalShow] = React.useState(false);
  const [rejectClicked, setRejectClicked] = React.useState(false);
  const [disableButton, setDisableButton] = React.useState(false);
  const router = useRouter();
  const studentId = router.query.id ? router.query.id : props.id;
  const { data, error } = useSwr(`/api/applicant-info/${studentId}`, fetcher);
  if (error) return <div>Failed to load applicant information</div>;
  if (!data) return <Loading />;
  console.log(data);

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
        menuText = "Approve Written Application";
        break;
      case "written app passed":
        buttonText = "Ready to schedule a consultation?";
        menuText = "Invite to Consultation";
        break;
      case "consultation scheduled":
        buttonText = "Consultation completed?";
        menuText = "Begin Consultation Review";
        break;
      case "consultation in review":
        buttonText = "Has an acceptance decision been made?";
        menuText = "Accept Applicant";
        break;
      case "accepted":
        buttonText = "Applicant has been accepted.";
        setDisableButton(true);
        break;
      case "rejected":
        buttonText = "Applicant has been rejected.";
        setDisableButton(true);
        break;
      case "appealing":
        buttonText = "Applicant is appealing.";
        menuText = "Accept Applicant";
        setDisableButton(false);
        break;
      default:
    }
    return (
      <>
        <DropdownButton
          id="dropdown-basic-button"
          title={buttonText}
          disabled={disableButton}
        >
          <Dropdown.Item
            onClick={() => {
              setModalShow(true);
            }}
          >
            {menuText}
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => {
              setRejectClicked(true);
              setModalShow(true);
            }}
          >
            Reject Applicant
          </Dropdown.Item>
        </DropdownButton>
        <AdminApplicationModal
          show={modalShow}
          onHide={() => setModalShow(false)}
          id={data.fields.id}
          name={data.fields.name}
          status={data.fields.applicationStatus.toString()}
          rejectclicked={rejectClicked}
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
                  // convert this to a .env variable
                  "https://airtable.com/tblEzSNgUrVlGFG1s/viwkWV3m9d4RH7sq9/" +
                  studentId
                }
                target="_blank"
              >
                <b>in Airtable here.</b>
              </a>
            </p>
            <Button
              variant="warning"
              onClick={() => {
                router.push("/");
                close();
              }}
            >
              <BsArrowLeft />
            </Button>
          </Col>
          <Col>
            <StatusButton />
          </Col>
        </Row>
      </Container>
    </>
  );
}

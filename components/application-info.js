import React from "react";
import styles from "../styles/Home.module.css";
import Image from "next/image";
import { useRouter } from "next/router";
import useSwr from "swr";
import Loading from "../components/loading";
import { Container, Row, Col } from "react-bootstrap";
import { Stepper, Step } from "react-form-stepper";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";

// fetcher: Defines the structure of data being received from Airtable via SWR
const fetcher = (url) => fetch(url).then((res) => res.json());
// applicationStage: Keeps track of what stage an applicant is in
var applicationStage;
// photoURL: Stores the url for an applicants profile picture. Defaults to a stock image
var photoURL = "/01_green_person_grad@3x.png";

// DisplayApplicantInfo: displays applicant info and allows the admin to move the applicant along in the process.
export default function DisplayApplicationInfo(props) {
    // keeps track of state of the modal dialog box
    const [modalShow, setModalShow] = React.useState(false);
    const router = useRouter();
    const studentId = router.query.id ? router.query.id : props.id;
    const { data, error } = useSwr(`/api/applicant-info/${studentId}`, fetcher);
    if (error) return <div>Failed to load applicant information</div>;
    if (!data) return <Loading />;
    //console.log(data);

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
            </Container>
        </>
    );
}

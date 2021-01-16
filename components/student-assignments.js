import React, { useState } from "react";
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
import { BsArrowLeft } from "react-icons/bs";
import StudentAssignmentsTable from "../components/student-assignments-table";

// fetcher: Defines the structure of data being received from Airtable via SWR
const fetcher = (url) => fetch(url).then((res) => res.json());
// applicationStage: Keeps track of what stage an applicant is in
var applicationStage;
// photoURL: Stores the url for an applicants profile picture. Defaults to a stock image
var photoURL = "/01_green_person_grad@3x.png";

export default function StudentAssignments(props) {
  const router = useRouter();
  const studentId = router.query.id ? router.query.id : props.id;
  const { data, error } = useSwr(
    `/api/admin/accepted-students/${studentId}`,
    fetcher
  );
  if (error) return <div>Failed to load applicant information</div>;
  if (!data) return <Loading />;

  console.log(data);

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
            <h1>
              {data.student.first_name} {data.student.last_name}
            </h1>
            <h5 className="text-muted">{data.student.education_level}</h5>
          </Col>
        </Row>
        <Row>
          <Col>
            <hr />
          </Col>
        </Row>
        <Row>
          <Col>
            <StudentAssignmentsTable
              studentid={studentId}
            ></StudentAssignmentsTable>
          </Col>
        </Row>
        <Row>
          <Col>
            <Button
              variant="warning"
              onClick={() => {
                router.back();
                close();
              }}
            >
              <BsArrowLeft />
            </Button>
          </Col>
          <Col></Col>
        </Row>
      </Container>
    </>
  );
}

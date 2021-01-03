import React, { useState } from "react";
import styles from "../styles/Home.module.css";
import { Container, Col, Row, Button } from "react-bootstrap";
import useSwr from "swr";
import Loading from "../components/loading";
import { useRouter } from "next/router";
import Image from "next/image";
import CourseContentEditor from "../components/course-content-editor";

export default function CourseBuilderComponent(props) {
  const [buttonPressed, setButtonPressed] = useState(false);
  const router = useRouter();
  const courseId = router.query.id ? router.query.id : props.id;
  const { data, error } = useSwr(
    `../../api/admin/learning-modules/${courseId}`
  );
  if (error) return <div>Failed to load applicant information</div>;
  if (!data) return <Loading />;

  return (
    <>
      <Container>
        {" "}
        <Row>
          <Col xs lg="3">
            <Image
              src="/01_green_teacher_blackboard@3x.png"
              width={100}
              height={100}
              className="d-inline-block align-top"
              alt="Course builder icon"
            />
          </Col>
          <Col>
            <h1>{data.course.title}</h1>
            <h5 className="text-muted">Course level: {data.course.level}</h5>
            <h5 className="text-muted">
              Submission deadline: {data.course.deadline}
            </h5>
          </Col>
          <Col>
            <Button variant="warning">Edit</Button>
          </Col>
        </Row>
      </Container>
      <hr className="w-100" />
      <CourseContentEditor
        courseContent={data.course.content}
      ></CourseContentEditor>
    </>
  );
}

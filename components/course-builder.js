import React, { useRef, useState } from "react";
import styles from "../styles/Home.module.css";
import { Container, Col, Row, Button } from "react-bootstrap";
import useSwr from "swr";
import Loading from "../components/loading";
import { useRouter } from "next/router";
import Image from "next/image";
import { BsX } from "react-icons/bs";
import ContentEditable from "react-contenteditable";
// import CourseContentEditor from "../components/course-content-editor";

export default function CourseBuilderComponent(props) {
  const style = {
    marginLeft: "1rem",
  };

  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [editorDisabled, setEditorDisabled] = useState(true);
  const [buttonPressed, setButtonPressed] = useState(false);
  const [buttonText, setButtonText] = useState("Edit Course Content");
  const [buttonVariant, setButtonVariant] = useState("warning");
  const router = useRouter();
  const courseId = router.query.id ? router.query.id : props.id;
  const url = `../../api/admin/learning-modules/${courseId}`;
  const { data, error } = useSwr(url);
  try {
    if (!data) return <Loading />;
  } catch (err) {
    if (error) return <div>Failed to load applicant information</div>;
  }

  var text;

  const courseContent = data.course.content;

  const CourseContentEditor = () => {
    text = useRef(courseContent);
    let contentEditable = React.createRef();
    const handleChange = (event) => {
      text.current = event.target.value;
    };

    const handleBlur = () => {
      // console.log(text.current);
      console.log(text);
      console.log("Updated: " + courseContent);
    };
    return (
      <div>
        {" "}
        <ContentEditable
          className={styles.editable}
          innerRef={contentEditable}
          html={text.current} // innerHTML of the editable div
          disabled={false} // use true to disable editing
          onChange={handleChange} // handle innerHTML change
          tagName="article" // Use a custom HTML tag (uses a div by default)
          onBlur={handleBlur}
          disabled={editorDisabled}
        />
      </div>
    );
  };

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
            <Button
              variant={buttonVariant}
              disabled={buttonDisabled}
              onClick={() => {
                setButtonPressed(!buttonPressed);
                if (!buttonPressed) {
                  setButtonText("Click to Confirm Edits");
                  setButtonVariant("success");
                  setEditorDisabled(false);
                } else {
                  setEditorDisabled(true);
                  setButtonDisabled(true);
                  setButtonText("Update pending...");
                  const updatedData = {
                    content: text.current,
                  };
                  console.log(updatedData);
                  console.log("Updated" + updatedData.content);
                  const otherParam = {
                    method: "PUT",
                    headers: {
                      "Content-Type": "application/json; charset=UTF-8",
                    },
                    body: JSON.stringify(updatedData),
                  };
                  fetch(url, otherParam)
                    .then((response) => response.json())
                    .then((data) => console.log(data)) // Manipulate the data retrieved back, if we want to do something with it
                    .catch((err) => console.log(err)); // Do something with the error
                  setTimeout(function () {
                    location.reload();
                  }, 1000);
                }
              }}
            >
              {buttonText}
            </Button>
            {buttonPressed ? (
              <Button
                onClick={() => {
                  setButtonPressed(false);
                  setEditorDisabled(true);
                  setButtonText("Edit Course Content");
                  setButtonVariant("warning");
                }}
                style={style}
                variant="outline-danger"
              >
                <BsX />
              </Button>
            ) : null}
          </Col>
        </Row>
      </Container>
      <hr className="w-100" />
      <CourseContentEditor></CourseContentEditor>
    </>
  );
}

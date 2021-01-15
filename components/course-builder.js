import React, { useRef, useState } from "react";
import styles from "../styles/Home.module.css";
import {
  Container,
  Col,
  Row,
  Button,
  ButtonToolbar,
  ButtonGroup,
} from "react-bootstrap";
import useSwr from "swr";
import Loading from "../components/loading";
import { useRouter } from "next/router";
import Image from "next/image";
import { BsX, BsArrowLeft } from "react-icons/bs";
import ContentEditable from "react-contenteditable";
// import CourseContentEditor from "../components/course-content-editor";
import { useSession } from "next-auth/client";

// TODO: Component uses a fairly basic text editor, switch to Draft.js asap
export default function CourseBuilderComponent(props) {
  const style = {
    marginLeft: "1rem",
  };

  const buttonStyle = {
    margin: "1rem",
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

  const sanitizeConf = {
    allowedTags: ["b", "i", "em", "strong", "a", "p", "h1"],
    allowedAttributes: { a: ["href"] },
  };

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
          onChange={handleChange} // handle innerHTML change
          tagName="article" // Use a custom HTML tag (uses a div by default)
          onBlur={handleBlur}
          disabled={editorDisabled}
          style={editorDisabled ? { opacity: "0.5" } : { opacity: "1.0" }}
        />
        <ButtonToolbar
          aria-label="text formatting button group"
          style={buttonStyle}
          className="fixed-bottom"
        >
          <ButtonGroup className="mr-2">
            <Button
              key={"italic"}
              onMouseDown={(evt) => {
                evt.preventDefault(); // Avoids loosing focus from the editable area
                document.execCommand("italic", false); // Send the command to the browser
              }}
            >
              Italics
            </Button>
            <Button
              key={"bold"}
              onMouseDown={(evt) => {
                evt.preventDefault(); // Avoids loosing focus from the editable area
                document.execCommand("bold", false); // Send the command to the browser. Obsolete, update to a modern solution ASAP
              }}
            >
              Bold
            </Button>
            <Button
              key={"underline"}
              onMouseDown={(evt) => {
                evt.preventDefault(); // Avoids loosing focus from the editable area
                document.execCommand("underline", false); // Send the command to the browser. Obsolete, update to a modern solution ASAP
              }}
            >
              Underline
            </Button>
          </ButtonGroup>
          <ButtonGroup className="mr-2">
            <Button
              key={"formatBlock"}
              onMouseDown={(evt) => {
                evt.preventDefault(); // Avoids loosing focus from the editable area
                document.execCommand("formatBlock", false, "h1"); // Send the command to the browser. Obsolete, update to a modern solution ASAP
              }}
            >
              H1
            </Button>
            <Button
              key={"formatBlock"}
              onMouseDown={(evt) => {
                evt.preventDefault(); // Avoids loosing focus from the editable area
                document.execCommand("formatBlock", false, "h2"); // Send the command to the browser. Obsolete, update to a modern solution ASAP
              }}
            >
              H2
            </Button>
            <Button
              key={"formatBlock"}
              onMouseDown={(evt) => {
                evt.preventDefault(); // Avoids loosing focus from the editable area
                document.execCommand("formatBlock", false, "h3"); // Send the command to the browser. Obsolete, update to a modern solution ASAP
              }}
            >
              H3
            </Button>
            <Button
              key={"formatBlock"}
              onMouseDown={(evt) => {
                evt.preventDefault(); // Avoids loosing focus from the editable area
                document.execCommand("formatBlock", false, "h4"); // Send the command to the browser. Obsolete, update to a modern solution ASAP
              }}
            >
              H4
            </Button>
            <Button
              key={"formatBlock"}
              onMouseDown={(evt) => {
                evt.preventDefault(); // Avoids loosing focus from the editable area
                document.execCommand("formatBlock", false, "h5"); // Send the command to the browser. Obsolete, update to a modern solution ASAP
              }}
            >
              H5
            </Button>
            <Button
              key={"formatBlock"}
              onMouseDown={(evt) => {
                evt.preventDefault(); // Avoids loosing focus from the editable area
                document.execCommand("formatBlock", false, "h6"); // Send the command to the browser. Obsolete, update to a modern solution ASAP
              }}
            >
              H6
            </Button>
          </ButtonGroup>
          <ButtonGroup className="mr-2">
            <Button
              key={"indent"}
              onMouseDown={(evt) => {
                evt.preventDefault(); // Avoids loosing focus from the editable area
                document.execCommand("indent", false); // Send the command to the browser. Obsolete, update to a modern solution ASAP
              }}
            >
              Indent
            </Button>
            <Button
              key={"insertHorizontalRule"}
              onMouseDown={(evt) => {
                evt.preventDefault(); // Avoids loosing focus from the editable area
                document.execCommand("insertHorizontalRule", false); // Send the command to the browser. Obsolete, update to a modern solution ASAP
              }}
            >
              Divider
            </Button>
          </ButtonGroup>
          <ButtonGroup className="mr-2">
            <Button
              key={"justifyLeft"}
              onMouseDown={(evt) => {
                evt.preventDefault(); // Avoids loosing focus from the editable area
                document.execCommand("justifyLeft", false); // Send the command to the browser. Obsolete, update to a modern solution ASAP
              }}
            >
              Left
            </Button>
            <Button
              key={"justifyCenter"}
              onMouseDown={(evt) => {
                evt.preventDefault(); // Avoids loosing focus from the editable area
                document.execCommand("justifyCenter", false); // Send the command to the browser. Obsolete, update to a modern solution ASAP
              }}
            >
              Center
            </Button>
            <Button
              key={"justifyRight"}
              onMouseDown={(evt) => {
                evt.preventDefault(); // Avoids loosing focus from the editable area
                document.execCommand("justifyRight", false); // Send the command to the browser. Obsolete, update to a modern solution ASAP
              }}
            >
              Right
            </Button>
          </ButtonGroup>
          <ButtonGroup>
            <Button
              key={"removeFormat"}
              onMouseDown={(evt) => {
                evt.preventDefault(); // Avoids loosing focus from the editable area
                document.execCommand("removeFormat", false); // Send the command to the browser. Obsolete, update to a modern solution ASAP
              }}
            >
              Clear formatting
            </Button>
          </ButtonGroup>
        </ButtonToolbar>
      </div>
    );
  };

  return (
    <>
      <Container>
        {" "}
        <Row>
          <Col xs lg="3">
            <Button
              variant="warning"
              onClick={() => {
                router.back();
              }}
            >
              <BsArrowLeft />
            </Button>
            {/* <Image
              src="/01_green_teacher_blackboard@3x.png"
              width={100}
              height={100}
              className="d-inline-block align-top"
              alt="Course builder icon"
            /> */}
          </Col>
          <Col>
            <h1>{data.course.title}</h1>

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
          <Col xs={4}>
            <h5 className="text-muted">Course level: {data.course.level}</h5>
            <h5 className="text-muted">
              Submission deadline: {data.course.deadline}
            </h5>
          </Col>
        </Row>
      </Container>
      <hr className="w-100" />
      <CourseContentEditor></CourseContentEditor>
    </>
  );
}

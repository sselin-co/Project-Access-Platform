import React, { useEffect, useRef, useState } from "react";
import styles from "../styles/Home.module.css";
import { Container, Col, Row, Button } from "react-bootstrap";
import useSwr from "swr";
import Loading from "../components/loading";
import { useRouter } from "next/router";
import Image from "next/image";
import SubmitAssignmentModal from "./submit-assigment";
import { BsX } from "react-icons/bs";
import ContentEditable from "react-contenteditable";
import Student from "../pages/api/utils/Student";
//import CourseContentEditor from "./course-content-editor";

var today = new Date();
var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

const fetcher = (url) => fetch(url).then((res) => res.json());


export default function CourseViewComponent(props) {
    const style = {
        marginLeft: "1rem",
    };
    const studentEmail = props.email;
    const [showin, setShowin] = useState(false);
    const [courseContent, setcourseContent] = useState("");
    const [courseTitle, setcourseTitle] = useState("");
    const [courseLevel, setcourseLevel] = useState("");
    const [courseNumber, setcourseNumber] = useState("");
    const [courseDeadline, setcourseDeadline] = useState("");
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [uid, setUid] = useState("");
    // const [editorDisabled, setEditorDisabled] = useState(true);
    // const [buttonPressed, setButtonPressed] = useState(false);
    // const [buttonText, setButtonText] = useState("Edit Course Content");
    //const [buttonVariant, setButtonVariant] = useState("warning");
    const router = useRouter();
    const courseId = router.query.id;
    const { data, error } = useSwr(`/api/student/learning-modules/${courseId}`, fetcher);

    useEffect(() => {

        if (error) return <div>Failed to load applicant information</div>;
        if (!data) return <Loading />;
        
        if(data) {
        setcourseContent(data.course.content);
        setcourseTitle(data.course.title);
        setcourseLevel(data.course.level);
        setcourseDeadline(data.course.deadline);
        setcourseNumber(data.course.module_number);
        Student.appReturn(studentEmail, "id").then((data) => {
            setUid(data);
        });
        //console.log(uid);
        
        if (new Date(date) > new Date(courseDeadline)) setButtonDisabled(true);
    }
    })
    

    var text;
    // if(data) {
    //     console.log(data.course.content);
    // }
    

    const CourseContentEditor = () => {
        text = useRef(courseContent);
        let contentEditable = React.createRef();
        // const handleChange = (event) => {
        //     text.current = event.target.value;
        // };

        // const handleBlur = () => {
        //     // console.log(text.current);
        //     console.log(text);
        //     console.log("Updated: " + courseContent);
        // };
        return (
            <div>
                {" "}
                <ContentEditable
                    className={styles.editable}
                    innerRef={contentEditable}
                    html={text.current} // innerHTML of the editable div
                    disabled={true} // use true to disable editing
                    //onChange={handleChange} // handle innerHTML change
                    tagName="article" // Use a custom HTML tag (uses a div by default)
                    //onBlur={handleBlur}
                    // disabled={editorDisabled}
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
                        <h1>{courseTitle}</h1>
                        <h5 className="text-muted">Course level: {courseLevel}</h5>
                        <h5 className="text-muted">
                            Submission deadline: {courseDeadline}
                        </h5>
                    </Col>
                    <Col>
                        <Button
                            variant="warning"
                            disabled={buttonDisabled}
                            onClick={() => {
                                setShowin(true);
                            }}
                            // onClick={() => {
                            //     setButtonPressed(!buttonPressed);
                            //     if (!buttonPressed) {
                            //         setButtonText("Click to Confirm Edits");
                            //         setButtonVariant("success");
                            //         setEditorDisabled(false);
                            //     } else {
                            //         setEditorDisabled(true);
                            //         setButtonDisabled(true);
                            //         setButtonText("Update pending...");
                            //         const updatedData = {
                            //             content: text.current,
                            //         };
                            //         console.log(updatedData);
                            //         console.log("Updated" + updatedData.content);
                            //         const otherParam = {
                            //             method: "PUT",
                            //             headers: {
                            //                 "Content-Type": "application/json; charset=UTF-8",
                            //             },
                            //             body: JSON.stringify(updatedData),
                            //         };
                            //         fetch(url, otherParam)
                            //             .then((response) => response.json())
                            //             .then((data) => console.log(data)) // Manipulate the data retrieved back, if we want to do something with it
                            //             .catch((err) => console.log(err)); // Do something with the error
                            //         setTimeout(function () {
                            //             location.reload();
                            //         }, 1000);
                            //     }
                            // }}
                        >
                            Submit Assignment
                        </Button>

                        <SubmitAssignmentModal
                            show={showin}
                            level={courseNumber}
                            cid={uid}
                            onHide={() => setShowin(false)}
                            size="sm"
                            aria-labelledby="contained-modal-title-vcenter"
                            centered
                            backdrop="static"
                        />
                        {/* {buttonPressed ? (
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
                        ) : null} */}
                    </Col>
                </Row>
            </Container>
            <hr className="w-100" />
            <CourseContentEditor></CourseContentEditor>
        </>
    );
}

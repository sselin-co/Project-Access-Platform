import React, { useRef, useState } from "react";
import styles from "../styles/Home.module.css";
import { Container, Col, Row, Button } from "react-bootstrap";
import useSwr from "swr";
import Loading from "../components/loading";
import { useRouter } from "next/router";
import Image from "next/image";
import ContentEditable from "react-contenteditable";

export default function CourseContentEditor(props) {
  const text = useRef(props.courseContent);
  let contentEditable = React.createRef();
  let state = { html: props.courseContent };
  const [editorState, setEditorState] = useState(state);
  const handleChange = (event) => {
    text.current = event.target.value;
  };

  const handleBlur = () => {
    console.log(text.current);
  };

  return (
    <div>
      <ContentEditable
        innerRef={contentEditable}
        html={text.current} // innerHTML of the editable div
        disabled={false} // use true to disable editing
        onChange={handleChange} // handle innerHTML change
        tagName="article" // Use a custom HTML tag (uses a div by default)
        onBlur={handleBlur}
      />
    </div>
  );
}

import React, { useState } from "react";
import { signOut } from 'next-auth/client'
import styles from "../styles/Home.module.css";

// I know this is in __app.js as a global stylesheet. However, removing this line will center the PA logo for some reason.
import "bootstrap/dist/css/bootstrap.min.css";
import {
    Nav,
    Navbar,
    NavDropdown,
    Form,
    FormControl,
    Button,
    Dropdown,
} from "react-bootstrap";
import Image from "next/image";
import Student from '../pages/api/utils/Student';


export default function PaNavbarStudent(props) {
    const [username, setUserName] = useState("");
   
    Student.nameReturn(props.email).then((data) => {
        setUserName(data);
    });

    return (
        <Navbar expand="lg" className={styles.navbar} variant="dark" sticky="top">
            <Navbar.Brand href="/">
                <Image
                    src="/austria.png"
                    width={125}
                    height={60}
                    className="d-inline-block align-top"
                    alt="Project Access logo"
                />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto">
                    <Nav.Link href="#home" className={styles.navLink}>
                        Start
                    </Nav.Link>
                    <Nav.Link href="#link" className={styles.navLink}>
                        Bootcamp
                    </Nav.Link>
                    <Nav.Link href="#link" className={styles.navLink}>
                        Resources
                    </Nav.Link>

                    <Button
                        onClick={signOut}
                        variant="outline-light"
                        className={styles.navbarButton}
                    >
                        Log Out
                    </Button>
                    <Button
                        //onClick={nameDisplay}
                        variant="warning"
                        className={styles.navbarButton}
                    >
                        {username}
                    </Button>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}

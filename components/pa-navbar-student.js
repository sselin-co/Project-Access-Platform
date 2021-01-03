import React, { useEffect, useState } from "react";
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
    DropdownButton
} from "react-bootstrap";
import useSwr from "swr";
import Image from "next/image";
import Student from '../pages/api/utils/Student';

const fetcher = (url) => fetch(url).then((res) => res.json());
//signOut({ callbackUrl: signOut ? 'http://localhost:3000' : '' });

export default function PaNavbarStudent(props) {
    const [username, setUserName] = useState("");
    const [uid, setUid] = useState("");
    const [accepted, setAccepted] = useState("");
    const [nonApp, setNonApp] = useState("");
    const ref = `/student/bootcamp/${props.email}`;
    const preref = `/student/prebootcamp/${props.email}`;
    const { data, error } = useSwr(`/api/student/status`, fetcher);
   
    useEffect(() => {
        if (data) {
            setNonApp(data.status == "non-applicant");
        }

        if (nonApp) {
            Student.nameReturn(props.email, "id").then((data) => {
                setUid(data);
            });
        }

        else {
            Student.appReturn(props.email, "id").then((data) => {
                setUid(data);
            });
        }

        Student.nameReturn(props.email, "first_name").then((data) => {
            setUserName(data);
        });

        if(uid){
        Student.oneAccepted(uid).then((data) => {
            setAccepted(data);
            //console.log(accepted);
        })}
        
    })
   

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
                    <Nav.Link href="/" className={styles.navLink}>
                        Home
                    </Nav.Link>
                    {nonApp && <Nav.Link target="_blank" href="https://airtable.com/shrp41zGmcAh0VI2T" className={styles.navLink}>
                        Start Application
                    </Nav.Link>}
                    {accepted && <Nav.Link href={preref} className={styles.navLink}>
                        Pre-Bootcamp Course
                    </Nav.Link>}
                    <Nav.Link href={ref} className={styles.navLink}>
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
                    {!nonApp && <Dropdown>
                        <Dropdown.Toggle variant="warning" id="dropdown-basic">
                            {username}
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            {/* <Dropdown.Item href={"/student/applicant-info/[id]"}
                                as={`/student/applicant-info/${uid}`}>Action</Dropdown.Item> */}
                            <Dropdown.Item href={`/student/applicant-info/${uid}`}>My Application</Dropdown.Item>
                            {/* <Dropdown.Item href="#/action-3">Something else</Dropdown.Item> */}
                        </Dropdown.Menu>
                    </Dropdown>}
                    {nonApp && <Button
                        //onClick={nameDisplay}
                        variant="warning"
                        className={styles.navbarButton}
                    >
                        {username}
                    </Button> }
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}

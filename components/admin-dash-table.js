import React from "react";
import styles from "../styles/Home.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Image from "next/image";
import Link from "next/link";
import {
  Nav,
  Navbar,
  NavDropdown,
  Form,
  FormControl,
  Button,
  Dropdown,
  Col,
  Row,
  Table,
} from "react-bootstrap";

export default function AdminDashTable() {
  const style = {
    paddingTop: "1.5rem",
    paddingRight: "2rem",
    marginBottom: "5rem",
  };
  return (
    <>
      <Row>
        <Col>
          <Image
            src="/01_red_checklist@3x.png"
            width={100}
            height={100}
            className="d-inline-block align-top"
            alt="Application icon"
          />
        </Col>
        <Col>
          <h1 style={style}>Applications</h1>
        </Col>
      </Row>
      <Nav variant="tabs" defaultActiveKey="link-1">
        <Nav.Item>
          <Nav.Link eventKey="link-1">Ongoing</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link-2">Appealed</Nav.Link>
        </Nav.Item>
      </Nav>
      <Table striped bordered>
        <thead>
          <tr>
            <th>Student</th>
            <th>Applying For</th>
            <th>Application Stage</th>
            <th>Candidate Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <Link href="/admin/student-info">
                <a>Rachel Kindangen</a>
              </Link>
            </td>
            <td>Undergraduate</td>
            <td>Written Application</td>
            <td>
              <Button>In Review</Button>
            </td>
          </tr>
          <tr>
            <td>
              <Link href="/admin/student-info">
                <a>Emmanuel Idun</a>
              </Link>
            </td>
            <td>Graduate</td>
            <td>Written Application</td>
            <td>
              <Button variant="warning">Consultation</Button>
            </td>
          </tr>
          <tr>
            <td>
              <Link href="/admin/student-info">
                <a>Shaya Selincourt</a>
              </Link>
            </td>
            <td>Undergraduate</td>
            <td>Consultation</td>
            <td>
              <Button>In Review</Button>
            </td>
          </tr>
          <tr>
            <td>
              <Link href="/admin/student-info">
                <a>Cindy Guo</a>
              </Link>
            </td>
            <td>Graduate</td>
            <td>Consultation</td>
            <td>
              <Button variant="success">Accepted</Button>
            </td>
          </tr>
          <tr>
            <td>
              <Link href="/admin/student-info">
                <a>John Doe</a>
              </Link>
            </td>
            <td>Undergraduate</td>
            <td>Written Application</td>
            <td>
              <Button variant="danger">Rejected</Button>
            </td>
          </tr>
          <tr>
            <td>
              <Link href="/admin/student-info">
                <a>Sallie Mae</a>
              </Link>
            </td>
            <td>Undergraduate</td>
            <td>Consultation</td>
            <td>
              <Button variant="danger">Rejected</Button>
            </td>
          </tr>
        </tbody>
      </Table>
    </>
  );
}

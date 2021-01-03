import React from "react";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import Image from "next/image";
import useSwr from "swr";
import { Tabs, Tab, Row, Col } from "react-bootstrap";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import Loading from "../components/loading";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import { Alert } from "react-bootstrap";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function CourseTable() {
  const { data, error } = useSwr("/api/getCourses", fetcher);
  console.log(data);
  if (error)
    return <div>Failed to load applicant information. Error: {error}</div>;
  if (!data) return <Loading />;

  function courseLinkFormatter(cell, row) {
    var courseId = row.fields.id;
    return (
      // Dynamic route to info of clicked applicant
      <Link
        href={"/admin/course-builder/[id]"}
        as={`/admin/course-builder/${courseId}`}
      >
        <a>Edit</a>
      </Link>
    );
  }

  const columns = [
    {
      dataField: "fields.module_number",
      text: "Module Number",
      align: "center",
      sort: true,
    },
    {
      dataField: "fields.title",
      text: "Module Title",
      align: "center",
    },
    {
      dataField: "fields.id",
      text: "Edit Content",
      formatter: courseLinkFormatter,
      align: "center",
    },
  ];

  function filterUndergrad(record) {
    return record.fields.level == "undergrad";
  }

  function filterPostGrad(record) {
    return record.fields.level == "grad";
  }

  const defaultSorted = [
    {
      dataField: "fields.module_number",
      order: "asc",
    },
  ];

  return (
    <>
      <Row md={2}>
        <Col md="auto">
          <Image
            src="/01_green_university@3x.png"
            width={100}
            height={100}
            className="d-inline-block align-top"
            alt="Course builder icon"
          />
        </Col>
        <Col>
          <h1>Course Builder</h1>
        </Col>
      </Row>
      <hr className="w-100" />
      <Tabs defaultActiveKey="link-1" id="admin-dashboard-tabs">
        <Tab eventKey="link-1" title="Undergraduate">
          <BootstrapTable
            keyField="module_number"
            data={data.filter((record) => filterUndergrad(record))}
            columns={columns}
            striped
            hover
            condensed
            defaultSorted={defaultSorted}
          />
        </Tab>
        <Tab eventKey="link-2" title="Post-graduate">
          <div className={styles.grid}>
            <BootstrapTable
              keyField="module_number"
              data={data.filter((record) => filterPostGrad(record))}
              columns={columns}
              striped
              hover
              condensed
              defaultSorted={defaultSorted}
            />{" "}
          </div>
        </Tab>
      </Tabs>
    </>
  );
}

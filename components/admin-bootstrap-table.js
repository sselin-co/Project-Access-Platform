import React from "react";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import useSwr from "swr";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";
import Loading from "../components/loading";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import { Alert } from "react-bootstrap";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function AdminBootstrapTable({ ...props }) {
  const { data, error } = useSwr("/api/getApplicants", fetcher);
  if (error)
    return <div>Failed to load applicant information. Error: {error}</div>;

  // TODO: place formatter functions into admin/utils
  function applicantNameFormatter(cell, row) {
    var studentId = row.fields.id;
    return (
      // Dynamic route to info of clicked applicant
      <Link
        href={"/admin/applicant-info/[id]"}
        as={`/admin/applicant-info/${studentId}`}
      >
        <a>{cell}</a>
      </Link>
    );
  }

  function emailFormatter(cell, row) {
    return <p>{cell}</p>;
  }

  function applicationStatusFormatter(cell, row) {
    switch (cell) {
      case "non-applicant":
        return (
          <Alert variant="dark" className={styles.alert}>
            <p>{cell}</p>
          </Alert>
        );
      case "written app submitted":
        return (
          <Alert variant="primary" className={styles.alert}>
            <p>{cell}</p>
          </Alert>
        );
      case "written app passed":
        return (
          <Alert variant="primary" className={styles.alert}>
            <p>{cell}</p>
          </Alert>
        );
        break;
      case "consultation scheduled":
        return (
          <Alert variant="info" className={styles.alert}>
            <p>{cell}</p>
          </Alert>
        );
      case "consultation in review":
        return (
          <Alert variant="info" className={styles.alert}>
            <p>{cell}</p>
          </Alert>
        );
      case "accepted":
        return (
          <Alert variant="success" className={styles.alert}>
            <p>{cell}</p>
          </Alert>
        );
      case "rejected":
        return (
          <Alert variant="danger" className={styles.alert}>
            <p>{cell}</p>
          </Alert>
        );
      case "appealing":
        return (
          <Alert variant="warning" className={styles.alert}>
            <p>{cell}</p>
          </Alert>
        );
      default:
    }
  }

  const { SearchBar } = Search;

  // Column definitions for the applicant table
  const columns = [
    {
      dataField: "fields.name",
      text: "Applicant Name",
      formatter: applicantNameFormatter,
      sort: true,
      align: "center",
    },
    {
      dataField: "fields.email",
      text: "Applicant Email",
      formatter: emailFormatter,
      sort: true,
      align: "center",
    },
    {
      dataField: "fields.applyingFor",
      text: "Applicant Year Level",
      sort: true,
      align: "center",
    },
    {
      dataField: "fields.applicationStatus",
      text: "Application Status",
      formatter: applicationStatusFormatter,
      sort: true,
      align: "center",
    },
  ];

  const defaultSorted = [
    {
      dataField: "fields.name",
      order: "asc",
    },
  ];

  function filterOngoing(record) {
    return (
      record.fields.applicationStatus != "rejected" &&
      record.fields.applicationStatus != "non-applicant" &&
      record.fields.applicationStatus != "appealing"
    );
  }

  function filterAppealing(record) {
    return record.fields.applicationStatus == "appealing";
  }

  function filterRejected(record) {
    return record.fields.applicationStatus == "rejected";
  }
  if (!data) return <Loading />;
  return (
    <div className={styles.grid}>
      <BootstrapTable
        bootstrap4
        keyField="id"
        //   data={data.filter((record) => filterOngoing(record))}
        data={props.data}
        columns={columns}
        pagination={paginationFactory()}
        noDataIndication="Table is Empty"
        defaultSorted={defaultSorted}
        striped
        hover
      />
    </div>
  );
}

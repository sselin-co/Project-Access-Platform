import React from "react";
import styles from "../styles/Home.module.css";
import Image from "next/image";
import Link from "next/link";
import { Tabs, Tab, Col, Row, Alert } from "react-bootstrap";
import useSwr from "swr";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
  PaginationListStandalone,
  SizePerPageDropdownStandalone,
} from "react-bootstrap-table2-paginator";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";
import Loading from "../components/loading";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";

const fetcher = (url) => fetch(url).then((res) => res.json());

/*
AdminDashTable: displays all applicants in a table and allows sorting by status and value search. Needs to be refactored pretty badly
*/
export default function AdminDashTable() {
  const style = {
    paddingTop: "1.5rem",
    paddingRight: "2rem",
    marginBottom: "2rem",
  };

  const { data, error } = useSwr("/api/getApplicants", fetcher);

  if (error)
    return <div>Failed to load applicant information. Error: {error}</div>;
  if (!data) return <Loading />;

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

  // Column definitions for the content table
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

  // Defines column bootstrap table 2 defaults sorting to
  const defaultSorted = [
    {
      dataField: "fields.name",
      order: "asc",
    },
  ];

  // Filters out non applicants
  function filterAll(record) {
    return record.fields.applicationStatus != "non-applicant";
  }

  // Filters out anyone who isn't an ongoing applicant
  function filterOngoing(record) {
    return (
      record.fields.applicationStatus != "rejected" &&
      record.fields.applicationStatus != "non-applicant" &&
      record.fields.applicationStatus != "appealing" &&
      record.fields.applicationStatus != "accepted"
    );
  }

  // Filters out anyone who isn't appealing
  function filterAppealed(record) {
    return record.fields.applicationStatus == "appealing";
  }

  // Filters out anyone who isn't rejected
  function filterRejected(record) {
    return record.fields.applicationStatus == "rejected";
  }

  function filterAccepted(record) {
    return record.fields.applicationStatus == "accepted";
  }

  const options = {
    custom: true,
    paginationSize: 4,
    pageStartIndex: 1,
    nextPageTitle: "First page",
    prePageTitle: "Pre page",
    firstPageTitle: "Next page",
    lastPageTitle: "Last page",
    showTotal: true,
    totalSize: data.length,
    hidePageListOnlyOnePage: true, // Hide the pagination list when only one page
    sizePerPageList: [
      {
        text: "5",
        value: 5,
      },
      {
        text: "10",
        value: 10,
      },
      {
        text: "20",
        value: 0,
      },
      {
        text: "All",
        value: data.length,
      },
    ],
  };

  const contentTableAll = ({ paginationProps, paginationTableProps }) => (
    <div className={styles.grid}>
      <ToolkitProvider
        keyField="id"
        columns={columns}
        data={data.filter((record) => filterAll(record))}
        search
        bootstrap4
      >
        {(toolkitprops) => (
          <div>
            <SearchBar
              {...toolkitprops.searchProps}
              placeholder="Search for applicants"
            />
            <BootstrapTable
              striped
              hover
              noDataIndication="Table is Empty"
              defaultSorted={defaultSorted}
              {...toolkitprops.baseProps}
              {...paginationTableProps}
            />
            <SizePerPageDropdownStandalone {...paginationProps} />
          </div>
        )}
      </ToolkitProvider>
      <PaginationListStandalone {...paginationProps} />
    </div>
  );

  const contentTableOngoing = ({ paginationProps, paginationTableProps }) => (
    <div className={styles.grid}>
      <ToolkitProvider
        keyField="id"
        columns={columns}
        data={data.filter((record) => filterOngoing(record))}
        search
        bootstrap4
      >
        {(toolkitprops) => (
          <div>
            <SearchBar {...toolkitprops.searchProps} />
            <BootstrapTable
              striped
              hover
              noDataIndication="Table is Empty"
              defaultSorted={defaultSorted}
              {...toolkitprops.baseProps}
              {...paginationTableProps}
            />
            <SizePerPageDropdownStandalone {...paginationProps} />
          </div>
        )}
      </ToolkitProvider>
      <PaginationListStandalone {...paginationProps} />
    </div>
  );

  const contentTableAccepted = ({ paginationProps, paginationTableProps }) => (
    <div className={styles.grid}>
      <ToolkitProvider
        keyField="id"
        columns={columns}
        data={data.filter((record) => filterAccepted(record))}
        search
        bootstrap4
      >
        {(toolkitprops) => (
          <div>
            <SearchBar {...toolkitprops.searchProps} />
            <BootstrapTable
              striped
              hover
              noDataIndication="Table is Empty"
              defaultSorted={defaultSorted}
              {...toolkitprops.baseProps}
              {...paginationTableProps}
            />
            <SizePerPageDropdownStandalone {...paginationProps} />
          </div>
        )}
      </ToolkitProvider>
      <PaginationListStandalone {...paginationProps} />
    </div>
  );

  const contentTableAppealed = ({ paginationProps, paginationTableProps }) => (
    <div className={styles.grid}>
      <ToolkitProvider
        keyField="id"
        columns={columns}
        data={data.filter((record) => filterAppealed(record))}
        search
        bootstrap4
      >
        {(toolkitprops) => (
          <div>
            <SearchBar {...toolkitprops.searchProps} />
            <BootstrapTable
              striped
              hover
              noDataIndication="Table is Empty"
              defaultSorted={defaultSorted}
              {...toolkitprops.baseProps}
              {...paginationTableProps}
            />
            <SizePerPageDropdownStandalone {...paginationProps} />
          </div>
        )}
      </ToolkitProvider>
      <PaginationListStandalone {...paginationProps} />
    </div>
  );

  const contentTableRejected = ({ paginationProps, paginationTableProps }) => (
    <div className={styles.grid}>
      <ToolkitProvider
        keyField="id"
        columns={columns}
        data={data.filter((record) => filterRejected(record))}
        search
        bootstrap4
      >
        {(toolkitprops) => (
          <div>
            <SearchBar {...toolkitprops.searchProps} />
            <BootstrapTable
              striped
              hover
              noDataIndication="Table is Empty"
              defaultSorted={defaultSorted}
              {...toolkitprops.baseProps}
              {...paginationTableProps}
            />
            <SizePerPageDropdownStandalone {...paginationProps} />
          </div>
        )}
      </ToolkitProvider>
      <PaginationListStandalone {...paginationProps} />
    </div>
  );

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
      <hr className="w-100" />
      <Tabs defaultActiveKey="link-1" id="admin-dashboard-tabs">
        <Tab eventKey="link-1" title="All Applicants">
          <PaginationProvider pagination={paginationFactory(options)}>
            {contentTableAll}
          </PaginationProvider>
        </Tab>
        <Tab eventKey="link-2" title="Ongoing">
          <div className={styles.grid}>
            <PaginationProvider pagination={paginationFactory(options)}>
              {contentTableOngoing}
            </PaginationProvider>
          </div>
        </Tab>
        <Tab eventKey="link-3" title="Accepted">
          <PaginationProvider pagination={paginationFactory(options)}>
            {contentTableAccepted}
          </PaginationProvider>
        </Tab>
        <Tab eventKey="link-4" title="Appealed">
          <PaginationProvider pagination={paginationFactory(options)}>
            {contentTableAppealed}
          </PaginationProvider>
        </Tab>
        <Tab eventKey="link-5" title="Rejected">
          <PaginationProvider pagination={paginationFactory(options)}>
            {contentTableRejected}
          </PaginationProvider>
        </Tab>
      </Tabs>
    </>
  );
}

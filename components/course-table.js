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

export default function CourseTable() {
  const { data, error } = useSwr("/api/getCourses", fetcher);
  console.log(data);
  if (error)
    return <div>Failed to load applicant information. Error: {error}</div>;
  if (!data) return <Loading />;

  const columns = [
    {
      dataField: "fields.module_number",
      text: "Module Number",
      align: "center",
    },
    {
      dataField: "fields.title",
      text: "Module Title",
      align: "center",
    },
    {
      dataField: "fields.id",
      text: "Module Number",
      align: "center",
    },
  ];

  return (
    <>
      <BootstrapTable
        keyField="id"
        data={data}
        columns={columns}
        striped
        hover
        condensed
      />
    </>
  );
}

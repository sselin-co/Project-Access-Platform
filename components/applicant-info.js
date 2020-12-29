import React from "react";
import styles from "../styles/Home.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useRouter } from "next/router";
import useSwr from "swr";
import Loading from "../components/loading";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function DisplayApplicantInfo() {
  const router = useRouter();
  const { data, error } = useSwr(
    `/api/applicant-info/${router.query.id}`,
    fetcher
  );
  if (error) return <div>Failed to load applicant information</div>;
  if (!data) return <Loading />;
  console.log(data);
  return (
    <>
      <ul>{data.fields.name}</ul>
      <ul>{data.fields.email}</ul>
    </>
  );
}

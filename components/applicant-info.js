import React from "react";
import styles from "../styles/Home.module.css";
import Image from "next/image";
import { useRouter } from "next/router";
import useSwr from "swr";
import Loading from "../components/loading";
import { Row, Col } from "react-bootstrap";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function DisplayApplicantInfo() {
  const router = useRouter();
  const { data, error } = useSwr(
    `/api/applicant-info/${router.query.id}`,
    fetcher
  );
  if (error) return <div>Failed to load applicant information</div>;
  if (!data) return <Loading />;
  return (
    <>
      <Row>
        <Col>
          <Image
            src="/01_green_person_grad@3x.png"
            width={100}
            height={100}
            className="d-inline-block align-top"
            alt="Placeholder for applicant profile picture"
          />
        </Col>
        <Col>
          <h1>{data.fields.name}</h1>
          <h5>{data.fields.email}</h5>
        </Col>
      </Row>
    </>
  );
}

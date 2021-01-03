import React, { useEffect, useRef } from "react";
// import Image from 'next/image';
// import useSwr from "swr";
// import styles from "../../../styles/Home.module.css";
import Card from 'react-bootstrap/Card';
import Loading from "../../../components/loading";


//const fetcher = (url) => fetch(url).then((res) => res.json());


export default function Levels(props) {

    return (
       <>
            {props.submitted && <Card style={{ width: '18rem' }}>
                <Card.Body>
                    <Card.Title>{props.title}</Card.Title>
                    <Card.Subtitle className="mb-2">Deadline - {props.deadline}</Card.Subtitle>
                    <Card.Link href={props.review}>Review Feedback</Card.Link>
                </Card.Body>
            </Card>}

            {!props.submitted && <Card style={{ width: '18rem' }}>
                <Card.Body>
                    <Card.Title className="mb-2 text-muted">{props.title}</Card.Title>
                    <Card.Subtitle >Deadline - {props.deadline}</Card.Subtitle>

                </Card.Body>
            </Card>}

        </>

    );
}

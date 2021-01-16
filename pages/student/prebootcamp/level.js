import React, { useEffect, useState } from "react";
import ReviewModal from '../../../components/review-modal';
// import useSwr from "swr";
// import styles from "../../../styles/Home.module.css";
import Card from 'react-bootstrap/Card';
import Loading from "../../../components/loading";


//const fetcher = (url) => fetch(url).then((res) => res.json());


export default function Levels(props) {
    const [modalShow, setModalShow] = useState(false);
    const [feedback, setFeedback] = useState("");
    const [next, setNext] = useState(false);
    const ref = `/student/prebootcamp/course/${props.cid}?sid=${props.stuEmail}`;
   
    useEffect(() => {
        if(props.review)
        setFeedback(props.review);

        if (props.next)
            setNext(props.next);
    });

    return (
       <>
            {(props.submitted || next) && 
            (<Card style={{ width: '18rem' }}>
                <Card.Body>
                    <Card.Title><a href={ref}>{props.title}</a></Card.Title>
                    <Card.Subtitle className="mb-2">Deadline - {props.deadline}</Card.Subtitle>
                    {!next && <Card.Link  onClick={() => {
                        setModalShow(true);
                    }}>Review Feedback</Card.Link>}
                </Card.Body>
            </Card>
            )
            }

            {!props.submitted && !next && <Card style={{ width: '18rem' }}>
                <Card.Body>
                    <Card.Title className="mb-2 text-muted">{props.title}</Card.Title>
                    <Card.Subtitle >Deadline - {props.deadline}</Card.Subtitle>

                </Card.Body>
            </Card>}

            <ReviewModal
                show={modalShow}
                onHide={() => setModalShow(false)}
                review={feedback}
                size="sm"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                backdrop="static"
            />

        </>

    );
}

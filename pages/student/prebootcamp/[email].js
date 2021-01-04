import React, { useEffect, useState } from "react";
import Head from "next/head";
import useSwr from "swr";
import { useRouter } from "next/router";
import Image from 'next/image';
import SubmitAssignmentModal from "../../../components/submit-assigment";
import {
    Media,
    Button
} from "react-bootstrap";
import styles from "../../../styles/Home.module.css";
import PaNavbarStudent from "../../../components/pa-navbar-student.js";
import Footer from "../../general/footer";
// import Content from "../content";
// import Card from 'react-bootstrap/Card';
import Student from "../../api/utils/Student";
import Levels from "./level";
import Loading from "../../../components/loading";
//import { Button } from "bootstrap";


const fetcher = (url) => fetch(url).then((res) => res.json());
const info = (item, d) => {
    var dead = [];
    for (let key in item.courses) {
        let value = item.courses[key];
        dead.push(value[`${d}`]);
    }
    return dead;
}

const infor = (item, d) => {
    var dead;
    //for (let key in item) {
        //let value = item[key];
        dead = item[`${d}`];
   // }
    return dead;
}

export default function PreBootcamp() {
    const router = useRouter();
    const studentEmail = router.query.email;
    const [showin, setShowin] = useState(false);
    const [uid, setUid] = useState("");
    const [ids, setIds] = useState([]);
    const [nextModule, setNextModule] = useState("");
    const [titles, setTitles] = useState([]);
    const [contents, setContents] = useState([]);
    const [deadlines, setDeadlines] = useState([]);
    const [accepted, setAccepted] = useState("");
    const { data, error } = useSwr(`/api/student/learning-modules`, fetcher);
    


    useEffect(() => {
        if (error) return <div>Failed to load applicant information</div>;
        if (!data) return <Loading />;
        //console.log(data);

        Student.appReturn(studentEmail, "id").then((data) => {
            setUid(data);
        })

        if (uid) {
            Student.oneAccepted(uid).then((data) => {
                setAccepted(data);
                //console.log(accepted);
            })
        }

        if(accepted) {
            let v;
            for(v = 1; v <= 6; v++)
            {
                if(!infor(accepted, `module_${v}`)) break;
            }
            //console.log(v);
            setNextModule(v);
        }

        if (data) {
            setDeadlines(info(data, "deadline"));
            setTitles(info(data, "title"));
            setContents(info(data, "content"));
            setIds(info(data, "id"));
        }
    }, [data, uid, accepted])

    return (
        <div className={styles.container}>
            <Head>
                <title>Project Access Platform</title>
                <link rel="icon" href="/logo_key_colour_highres.ico" />
            </Head>

            

            {/* <PaNavbar /> */}
            <PaNavbarStudent email={studentEmail}></PaNavbarStudent>
            <h3 className={styles.title}>Pre-Bootcamp</h3>

            <Media className={styles.med}>
                <img
                    width={64}
                    height={64}
                    className="mr-3"
                    src="/PA_Rocket_2.png"
                    alt="Generic placeholder"
                />
                <Media.Body>
                    <h5>Keep progressing!</h5>
                    <p>
                        Continue working on Level {nextModule}
                    </p>
                </Media.Body>
            </Media>
            

            <SubmitAssignmentModal
                show={showin}
                onHide={() => setShowin(false)}
                size="sm"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                backdrop="static"
            />
            
            <main className={styles.main}>
                {
                   data &&
                     
                        //(<Levels submitted={accepted[`module_${i + 1}`]} title={item.title} review={accepted[`feedback_${i + 1}`]} deadline={item.deadline}></Levels>))
                    titles.map((t, i) => (<Levels key={t} stuEmail={studentEmail} submitted={accepted[`module_${i + 1}`]} title={t} review={accepted[`feedback_${i + 1}`]} content={contents[i]} cid={ids[i]} deadline={deadlines[i]}></Levels>))
                    
                    
                }
                    

            </main>

            <Footer />
        </div>


    );
}

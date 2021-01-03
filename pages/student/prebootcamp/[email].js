import React, { useEffect, useState } from "react";
import Head from "next/head";
import useSwr from "swr";
import { useRouter } from "next/router";
import Image from 'next/image';
import styles from "../../../styles/Home.module.css";
import PaNavbarStudent from "../../../components/pa-navbar-student.js";
import Footer from "../../general/footer";
import Content from "../content";
import Card from 'react-bootstrap/Card';
import Student from "../../api/utils/Student";
import Levels from "./level";
import Loading from "../../../components/loading";


const fetcher = (url) => fetch(url).then((res) => res.json());
const info = (item, d) => {
    var dead = [];
    for (let key in item.courses) {
        let value = item.courses[key];
        dead.push(value[`${d}`]);
    }
    return dead;
}

export default function PreBootcamp() {
    const router = useRouter();
    const studentEmail = router.query.email;
    const [uid, setUid] = useState("");
    const [titles, setTitles] = useState([]);
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

        if (data) {
            setDeadlines(info(data, "deadline"));
            setTitles(info(data, "title"));
        }
    }, [data, uid])

    return (
        <div className={styles.container}>
            <Head>
                <title>Project Access Platform</title>
                <link rel="icon" href="/logo_key_colour_highres.ico" />
            </Head>

            {/* <PaNavbar /> */}
            <PaNavbarStudent email={studentEmail}></PaNavbarStudent>
            <h3 className={styles.title}>Pre-Bootcamp</h3>
            <main className={styles.main}>
                {
                   data &&
                     
                        //(<Levels submitted={accepted[`module_${i + 1}`]} title={item.title} review={accepted[`feedback_${i + 1}`]} deadline={item.deadline}></Levels>))
                    titles.map((t, i) => (<Levels submitted={accepted[`module_${i + 1}`]} title={t} review={accepted[`feedback_${i + 1}`]} deadline={deadlines[i]}></Levels>))
                    
                    
                }
                    

            </main>

            <Footer />
        </div>


    );
}

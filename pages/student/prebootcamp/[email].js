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


export default function PreBootcamp() {
    const router = useRouter();
    const studentEmail = router.query.email;
    const [uid, setUid] = useState("");
    const [accepted, setAccepted] = useState("");
    const { data, error } = useSwr(`/api/student/learning-modules`, fetcher);
    


    useEffect(() => {
        if (error) return <div>Failed to load applicant information</div>;
        if (!data) return <Loading />;
        console.log(data);

        Student.appReturn(studentEmail, "id").then((data) => {
            setUid(data);
        })

        if (uid) {
            Student.oneAccepted(uid).then((data) => {
                setAccepted(data);
                //console.log(accepted);
            })
        }

    })

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
                    Object.keys(data).map((item, i) => 
                        (<Levels submitted={accepted[`module_${i + 1}`]} title={item.title} review={accepted[`feedback_${i + 1}`]} deadline={item.deadline}></Levels>))
                    //data.map(some => (<Levels submitted="" title={some.title} review="" deadline={some.deadline}></Levels>)
                       
                    //)
                }
                    

            </main>

            <Footer />
        </div>


    );
}

import React, { useEffect, useState } from "react";
import Head from "next/head";
import styles from "../../styles/Home.module.css";
import PaNavbarStudent from "../../components/pa-navbar-student.js";
import { useRouter } from "next/router";
import useSwr from "swr";
import Loading from "../../components/loading";
import Student from '../api/utils/Student';
import DisplayApplicantInfo from "../../components/applicant-info";

//const fetcher = (url) => fetch(url).then((res) => res.json());

export default function StudentHome(props) {
    //const { data, error } = useSwr(`/api/applicant-info/${uid}`, fetcher);
    // const [uid, setUid] = useState("");

    // useEffect(() => {
    //     Student.nameReturn(props.email, "id").then((data) => {
    //         setUid(data);
    //     });
    //     //console.log(uid);
    // }) 

    // if (error) return <div>Failed to load applicant information</div>;
    // if (!data) return <Loading />;

    return (
        <div className={styles.container}>
            <Head>
                <title>Project Access Platform</title>
                <link rel="icon" href="/logo_key_colour_highres.ico" />
            </Head>

            {/* <PaNavbar /> */}
            <PaNavbarStudent email={props.email}></PaNavbarStudent>

            <main className={styles.main}>
                <h1 className={styles.title}>Project Access Austria</h1>
                {/* <DisplayApplicantInfo></DisplayApplicantInfo> */}
            </main>

            <footer className={styles.footer}></footer>
        </div>
    );
}
